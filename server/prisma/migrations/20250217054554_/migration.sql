-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "videoUrl" TEXT;
