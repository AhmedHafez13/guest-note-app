import { Request, Response } from 'express';
import NoteRepository from '@app/repositories/note.repository';
import { UserData } from '@app/types/app.types';
import { Note } from '@prisma/client';
import NoteValidation from './note.validation';
import NoteService from './note.service';

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
    const userId = user.id;
    const { title, content, typeId } = req.body;

    const { error, value } = NoteValidation.validateCreateNote({
      title,
      content,
      typeId,
    });

    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    // Check if type exists
    const existingType = await NoteRepository.findTypeById(value.typeId);

    if (!existingType) {
      return res.status(400).json({
        message: 'Invalid note type. Please provide a valid type ID.',
      });
    }

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
    const userId = user.id;

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
    const user = req.user as UserData;
    const userId = user.id;
    const noteId = req.params.id;

    const { error, value } = NoteValidation.validateNoteId({ ids: [noteId] });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the note exists and belongs to the current user
    const note: Note | null = await NoteRepository.getNoteById(value.ids[0]);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    } else if (note.senderId !== userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json({ note });
  }

  /**
   * Handles sharing a note with other users.
   *
   * @param req - Express request object containing note ID and recipient user IDs
   * @param res - Express response object
   */
  async shareNote(req: Request, res: Response) {
    const user = req.user as UserData;
    const userId = user.id;
    const noteId = req.params.id;
    const { recipientIds } = req.body;

    // Validate note ID and recipient user IDs
    const { error, value } = NoteValidation.validateShareData({
      noteId,
      recipientIds,
    });
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    // Check if the note exists and belongs to the current user
    const note: Note | null = await NoteRepository.getNoteById(value.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    } else if (note.senderId !== userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await NoteService.validateRecipientIds(
      userId,
      value.noteId,
      value.recipientIds
    );
    if (result.error) {
      return res.status(422).json({ message: result.message });
    }

    // Share the note with recipient users
    await NoteService.shareNoteWithUsers(user, note, value.recipientIds);

    res.status(200).json({ message: 'Note shared successfully' });
  }
}

export default new NoteController();
