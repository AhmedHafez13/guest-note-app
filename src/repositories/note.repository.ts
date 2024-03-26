import PrismaClient from '@app/prisma-client';
import { Note } from '@prisma/client';

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
  static async getNotes(userId: number): Promise<Note[]> {
    const notes = await PrismaClient.note.findMany({
      where: { senderId: userId },
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
}

export default NoteRepository;
