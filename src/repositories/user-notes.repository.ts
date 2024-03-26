import PrismaClient from '@app/prisma-client';
import { UserNotes } from '@prisma/client';

/**
 * This class provides methods for interacting with user-note associations using Prisma.
 */
class UserNotesRepository {
  /**
   * Creates associations between multiple user IDs and note IDs in bulk.
   *
   * @param data - An array of objects containing `userId` and `noteId` properties.
   *                - `userId`: The ID of the user for the association.
   *                - `noteId`: The ID of the note to associate with the user.
   * @returns A Promise that resolves when the associations are created.
   */
  static async createMany(
    data: { userId: number; noteId: number }[]
  ): Promise<void> {
    await PrismaClient.userNotes.createMany({
      data,
      skipDuplicates: true, // Optional: Avoid duplicate entries
    });
  }

  /**
   * Retrieves all note IDs associated with a specific user.
   *
   * This method selects only the `noteId` property for efficiency, assuming that's the primary information needed.
   *
   * @param userId - The ID of the user to get associated note IDs for
   * @returns A Promise that resolves to an array of objects containing only the `noteId` property.
   */
  static async getUserNotes(userId: number): Promise<{ noteId: number }[]> {
    const userNotes = await PrismaClient.userNotes.findMany({
      where: { userId },
      select: { noteId: true },
    });
    return userNotes;
  }

  /**
   * Marks associations between a user and notes as deleted (soft delete).
   *
   * @param userId - The ID of the user for whom to delete note associations
   * @param noteIds - An array of note IDs to disassociate from the user
   */
  static async deleteUserNotes(
    userId: number,
    noteIds: number[]
  ): Promise<void> {
    await PrismaClient.userNotes.updateMany({
      where: { userId: userId, noteId: { in: noteIds } },
      data: { deletedAt: new Date() },
    });
  }

  /**
   * Identifies existing user-note associations (shares) for a given note and a list of recipient user IDs.
   *
   * @param noteId - The ID of the note to check for existing shares
   * @param recipientUserIds - An array of user IDs to check for existing shares with the note
   * @returns A Promise that resolves to an array of existing UserNotes objects representing the existing shares
   */
  static async existingSharedNotes(
    noteId: number,
    recipientUserIds: number[]
  ): Promise<{ userId: number; userName: string }[]> {
    const existingShares = await PrismaClient.userNotes.findMany({
      where: {
        noteId,
        userId: { in: recipientUserIds },
      },
      select: {
        userId: true,
        user: {
          // Join with user table to get username
          select: { username: true },
        },
      },
    });

    return existingShares.map((share) => ({
      userId: share.userId,
      userName: share.user.username,
    }));
  }

  /**
   * Retrieves user-note associations (shares) for a specific user and a list of note IDs.
   *
   * This method fetches UserNotes records that represent notes received (shared with) by a user.
   *
   * @param userId - The ID of the user to get received notes for
   * @param noteIds - An array of note IDs to check for received associations
   * @returns A Promise that resolves to an array of UserNotes objects representing the received notes (shares)
   */
  static async getReceivedNotes(
    userId: number,
    noteIds: number[]
  ): Promise<UserNotes[]> {
    const notes = await PrismaClient.userNotes.findMany({
      where: {
        userId,
        noteId: { in: noteIds },
      },
    });
    return notes;
  }
}

export default UserNotesRepository;
