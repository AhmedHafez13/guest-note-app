import UserNotesRepository from '@app/repositories/user-notes.repository';
import { UserData } from '@app/types/app.types';
import { Note } from '@prisma/client';
import NotificationService from '@app/services/notification.service';
import UserRepository from '@app/repositories/user.repository';

class NoteService {
  /**
   * Validates a list of recipient user IDs for sharing a note.
   *
   * @param userId - The ID of the user sharing the note (used to prevent self-sharing)
   * @param noteId - The ID of the note being shared
   * @param recipientIds - An array of user IDs to share the note with
   * @returns A Promise that resolves to an object with validation status and optional error message
   */
  static async validateRecipientIds(
    userId: number,
    noteId: number,
    recipientIds: number[]
  ): Promise<{
    error: boolean;
    message?: string;
  }> {
    // Prevent sharing with oneself
    if (recipientIds.includes(userId)) {
      return {
        error: true,
        message: 'Cannot share a note with its creator',
      };
    }

    // Check if recipient IDs refer to actual users
    const validRecipientIds = await UserRepository.validateUserIds(
      recipientIds
    );
    if (validRecipientIds.length !== recipientIds.length) {
      return { error: true, message: 'Invalid recipient IDs' };
    }

    // Check if recipients haven't already received the note
    const existingSharedNotes = await UserNotesRepository.existingSharedNotes(
      noteId,
      validRecipientIds
    );
    if (existingSharedNotes.length > 0) {
      const alreadySharedUsers = existingSharedNotes.map(
        (note) => note.userName
      );
      return {
        error: true,
        message: `Recipients ${alreadySharedUsers.join(
          ', '
        )} already have access to the note`,
      };
    }

    return { error: false };
  }

  /**
   * Shares a note with a list of recipient users.
   *
   * @param userData - Data of the user sharing the note
   * @param note - The Note object to be shared
   * @param recipientIds - An array of user IDs to share the note with
   */
  static async shareNoteWithUsers(
    userData: UserData,
    note: Note,
    recipientIds: number[]
  ) {
    // Create associations between note and recipients
    const userNotesData = recipientIds.map((userId) => ({
      userId: userId,
      noteId: note.id,
    }));

    await UserNotesRepository.createMany(userNotesData);

    // Broadcast notification to users in the background
    setTimeout(async () => {
      await NotificationService.broadcastNotification(
        `${userData.username} sent you a new note`,
        note.message.substring(0, Math.max(20, note.message.length)),
        {
          socketsOptions: { recipientIds: recipientIds },
        }
      );
    });
  }
}

export default NoteService;
