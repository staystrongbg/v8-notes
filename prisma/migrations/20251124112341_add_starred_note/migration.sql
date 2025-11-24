-- CreateTable
CREATE TABLE "starred_note" (
    "id" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "starred_note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "starred_note" ADD CONSTRAINT "starred_note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
