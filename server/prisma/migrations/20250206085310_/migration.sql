/*
  Warnings:

  - You are about to drop the column `ticketId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_eventId_fkey";

-- DropIndex
DROP INDEX "Booking_ticketId_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "ticketId",
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "seats" TEXT[];

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "totalSeats" TEXT[];

-- DropTable
DROP TABLE "Ticket";

-- CreateIndex
CREATE INDEX "Booking_eventId_idx" ON "Booking"("eventId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
