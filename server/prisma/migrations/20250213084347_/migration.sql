-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;
