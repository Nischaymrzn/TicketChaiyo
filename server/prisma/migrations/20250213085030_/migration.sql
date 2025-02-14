/*
  Warnings:

  - You are about to drop the column `isAccepted` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isAccepted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "isAccepted";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAccepted";
