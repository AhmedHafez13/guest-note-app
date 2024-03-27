import { Request, Response } from 'express';
import NoteRepository from '@app/repositories/note.repository';
import { UserData } from '@app/types/app.types';
import TimelineNoteValidation from './timeline-note.validation';
import UserNotesRepository from '@app/repositories/user-notes.repository';

/**
 * This class handles API endpoints related to notes timeline management.
 */
class TimelineNoteController {
  /**
   * Retrieves a user's received notes (shared with the user) from their timeline.
   *
   * @param req - The request object containing query parameters for filtering and pagination.
   * @param res - The response object to send the retrieved notes or error messages.
   */
  async getReceivedNotes(req: Request, res: Response) {
    const user = req.user as UserData;
    const userId = user.id;
    const { types, page, pageSize } = req.query;

    const { error, value } = TimelineNoteValidation.validatePageParams(
      { types, page, pageSize },
      { page: 1, pageSize: 10 }
    );
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const notes = await NoteRepository.getTimelineNotes(
      userId,
      value.page,
      value.pageSize,
      value.types
    );
    res.status(200).json(notes);
  }

  /**
   * Deletes specific received notes (associations) from a user's timeline.
   *
   * @param req - The request object containing an array of note IDs to delete in the request body.
   * @param res - The response object to send a success message or error information.
   */
  async deleteReceivedNote(req: Request, res: Response) {
    const user = req.user as UserData;
    const userId = user.id;
    const { notesIds } = req.body;

    const { error, value } = TimelineNoteValidation.validateNoteId({
      ids: notesIds,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if all notes exist and belong to the user
    const existingNotes = await UserNotesRepository.getReceivedNotes(
      userId,
      value.ids
    );

    if (existingNotes.length !== value.ids.length) {
      return res.status(422).json({ message: 'Some notes not found' });
    }

    await UserNotesRepository.deleteUserNotes(userId, value.ids);
    res.status(200).json({ message: 'Received notes deleted successfully' });
  }
}

export default new TimelineNoteController();
