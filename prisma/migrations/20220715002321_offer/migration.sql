/*
  Warnings:

  - You are about to drop the `Candidate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Candidate";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "positionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "details" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "candidateEmail" TEXT NOT NULL,
    CONSTRAINT "Offer_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Offer_candidateEmail_key" ON "Offer"("candidateEmail");
