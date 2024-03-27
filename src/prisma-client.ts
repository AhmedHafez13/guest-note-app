import { PrismaClient } from '@prisma/client';

class Prisma {
  private client: PrismaClient | null = null;

  constructor() {}

  public getClient(): PrismaClient {
    if (!this.client) {
      this.client = new PrismaClient();
    }
    return this.client;
  }
}

export default new Prisma().getClient();
