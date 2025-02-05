/*
  Warnings:

  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Event` table. All the data in the column will be lost.
  - Added the required column `ticketPriceNormal` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketPriceVip` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "name",
DROP COLUMN "rate",
ADD COLUMN     "artist" TEXT,
ADD COLUMN     "cast" TEXT,
ADD COLUMN     "date" TEXT,
ADD COLUMN     "director" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "poster" TEXT,
ADD COLUMN     "released" TEXT,
ADD COLUMN     "ticketPriceNormal" TEXT NOT NULL,
ADD COLUMN     "ticketPriceVip" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "venue" TEXT,
ALTER COLUMN "time" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
