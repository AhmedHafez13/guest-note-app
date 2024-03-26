import prismaClient from '@app/prisma-client';
import { UserRegisterData } from '@app/modules/auth/auth.types';
import { User } from '@prisma/client';

/**
 * This class provides methods for interacting with user data using Prisma.
 */
class UserRepository {
  /**
   * Finds a user by their email address.
   *
   * @param email - The email address to search for
   * @returns A Promise that resolves to a User object if found, null otherwise
   */
  static async findByEmail(email: string): Promise<User | null> {
    prismaClient;
    const user = await prismaClient.user.findUnique({
      where: { email },
    });
    return user;
  }

  /**
   * Creates a new user in the database.
   *
   * @param userData - An object containing user registration data
   * @returns A Promise that resolves to the newly created User object
   */
  static async createUser(userData: UserRegisterData): Promise<User> {
    const createdUser = await prismaClient.user.create({
      data: userData,
    });
    return createdUser;
  }

  /**
   * Checks if a user with the given email address already exists in the database.
   *
   * @param email - The email address to check
   * @returns A Promise that resolves to true if the user exists, false otherwise
   */
  static async userExists(email: string): Promise<boolean> {
    const userCount = await prismaClient.user.count({
      where: { email },
    });
    return userCount > 0;
  }
}

export default UserRepository;