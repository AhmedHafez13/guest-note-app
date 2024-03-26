-- AlterTable
ALTER TABLE `UserNotes` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `unsent` BOOLEAN NOT NULL DEFAULT false;
