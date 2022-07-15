-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL
);
INSERT INTO "new_Position" ("createdAt", "details", "id", "name", "updatedAt", "userId") SELECT "createdAt", "details", "id", "name", "updatedAt", "userId" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
