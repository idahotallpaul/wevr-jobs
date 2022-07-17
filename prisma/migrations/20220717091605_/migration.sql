/*
  Warnings:

  - You are about to drop the column `benefits` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `compensation` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Position` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL
);
INSERT INTO "new_Position" ("createdAt", "details", "id", "name", "updatedAt") SELECT "createdAt", "details", "id", "name", "updatedAt" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
