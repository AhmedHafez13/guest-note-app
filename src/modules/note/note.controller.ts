import { Request, Response } from 'express';
import NoteRepository from '@app/repositories/note.repository';
import { UserData } from '@app/types/app.types';
import NoteValidation from './note.validation';

/**
 * This class handles API endpoints related to note management.
 */
class NoteController {
  /**
   * Creates a new note for the authenticated user.
   *
   * @param req - Express request object containing note data in the body
   * @param res - Express response object
   */
  async createNote(req: Request, res: Response) {
    const user = req.user as UserData;
    const userId = user?.id;
    const { title, content, typeId } = req.body;

    const { error, value } = NoteValidation.validateCreateNote({
      title,
      content,
      typeId,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // TODO: CHECK IF `typeId` exists in NoteTypes

    const note = await NoteRepository.createNote(
      userId,
      value.title,
      value.content,
      value.typeId
    );
    res.status(201).json({ message: 'Note created successfully', note });
  }

  /**
   * Retrieves all notes for the authenticated user with optional pagination.
   *
   * @param req - Express request object with potential query string parameters for pagination
   * @param res - Express response object
   */
  async getNotes(req: Request, res: Response) {
    const user = req.user as UserData;
    const userId = user?.id;

    // Get pagination parameters from query string
    const { error, value } = NoteValidation.validatePageParams(
      { page: req.query.page, pageSize: req.query.pageSize },
      { page: 1, pageSize: 30 }
    );

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const notes = await NoteRepository.getNotesPage(
      userId,
      value.page,
      value.pageSize
    );
    res.status(200).json({ notes });
  }

  /**
   * Gets a specific note by its ID.
   *
   * @param req - Express request object with note ID in the URL parameters
   * @param res - Express response object
   */
  async getNoteById(req: Request, res: Response) {
    const noteId = parseInt(req.params.id);

    const { error, value } = NoteValidation.validateNoteId({ id: noteId });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const note = await NoteRepository.getNoteById(value.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ note });
  }
}

export default new NoteController();
