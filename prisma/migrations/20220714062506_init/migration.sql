-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "positionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    CONSTRAINT "Candidate_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
