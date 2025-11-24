/*
  Warnings:

  - You are about to drop the `starred_note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "starred_note" DROP CONSTRAINT "starred_note_userId_fkey";

-- AlterTable
ALTER TABLE "note" ADD COLUMN     "isStarred" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "starred_note";
