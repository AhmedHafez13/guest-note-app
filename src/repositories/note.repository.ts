import PrismaClient from '@app/prisma-client';
import { Note, NoteType } from '@prisma/client';

/**
 * This class provides methods for interacting with notes data using Prisma.
 */
class NoteRepository {
  /**
   * Creates a new note in the database.
   *
   * @param userId - The ID of the user creating the note
   * @param title - The title of the note
   * @param message - The content of the note
   * @param typeId - The ID of the note type (e.g., category)
   * @returns A Promise that resolves to the newly created Note object
   */
  static async createNote(
    userId: number,
    title: string,
    message: string,
    typeId: number
  ): Promise<Note> {
    const createdNote = await PrismaClient.note.create({
      data: {
        typeId,
        senderId: userId,
        title,
        message,
      },
    });
    return createdNote;
  }

  /**
   * Retrieves all notes for a given user. The notes that the user created
   *
   * @param userId - The ID of the user to get notes for
   * @returns A Promise that resolves to an array of Note objects for the user
   */
  static async getNotesBySenderId(userId: number): Promise<Note[]> {
    const notes = await PrismaClient.note.findMany({
      where: { senderId: userId },
    });
    return notes;
  }

  /**
   * Retrieves a user's timeline notes within a specific time range and with optional filtering by note types.
   *
   * This method fetches notes associated with a user, considering the following criteria:
   * - Belong to the user based on user-note associations (UserNotes).
   * - Have non-disabled note types.
   * - Created within the past 30 days.
   * - Optionally filtered by a list of note type IDs (`types` parameter).
   *
   * @param userId - The ID of the user to get timeline notes for
   * @param page - The page number for pagination (defaults to 1)
   * @param pageSize - The number of notes per page (defaults to 10)
   * @param types - An optional array of note type IDs to filter by
   * @returns A Promise that resolves to an array of Note objects representing the user's timeline notes
   */
  static async getTimelineNotes(
    userId: number,
    page: number = 1,
    pageSize: number = 10,
    types?: number[]
  ): Promise<Note[]> {
    const skip = (page - 1) * pageSize;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const notes = await PrismaClient.note.findMany({
      where: {
        UserNotes: {
          some: { userId },
        },
        NOT: {
          type: { disabled: true },
        },
        type: {
          id: { in: types },
        },
        createdAt: {
          gte: startDate.toISOString(),
        },
      },
      skip: skip,
      take: pageSize,
    });

    return notes;
  }

  /**
   * Retrieves a chunk of notes for a given user. The notes that the user created.
   *
   * @param userId - The ID of the user to get notes for
   * @param page - The page number
   * @param pageSize - Count of notes to be retrieved
   * @returns A Promise that resolves to an array of Note objects for the user
   */
  static async getNotesPage(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<Note[]> {
    const skip = (page - 1) * pageSize;
    const notes = await PrismaClient.note.findMany({
      where: { senderId: userId },
      skip,
      take: pageSize,
    });
    return notes;
  }

  /**
   * Gets a specific note by its ID.
   *
   * @param id - The ID of the note to retrieve
   * @returns A Promise that resolves to a Note object if found, null otherwise
   */
  static async getNoteById(id: number): Promise<Note | null> {
    const note = await PrismaClient.note.findUnique({
      where: { id },
    });
    return note;
  }

  /**
   * Retrieves a note type by its ID.
   *
   * @param typeId - The ID of the note type to find
   * @returns A Promise that resolves to a NoteType object if found, or null if not found
   */
  static async findTypeById(typeId: number): Promise<NoteType | null> {
    const type = await PrismaClient.noteType.findUnique({
      where: { id: typeId },
    });
    return type;
  }
}

export default NoteRepository;
