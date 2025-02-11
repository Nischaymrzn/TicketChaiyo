/*
  Warnings:

  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.
  - The `date` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `released` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "time",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3),
DROP COLUMN "released",
ADD COLUMN     "released" TIMESTAMP(3);
