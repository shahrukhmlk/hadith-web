-- CreateEnum
CREATE TYPE "status" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMPTZ(6),
    "userIDCreated" TEXT,
    "userIDUpdated" TEXT,
    "status" "status" NOT NULL DEFAULT 'draft',
    "sort" INTEGER,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hadith" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "status" "status" NOT NULL DEFAULT 'draft',
    "dateCreated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMPTZ(6),
    "userIDCreated" TEXT,
    "userIDUpdated" TEXT,

    CONSTRAINT "Hadith_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HadithBook" (
    "hadithID" INTEGER NOT NULL,
    "bookID" INTEGER NOT NULL,
    "hadithRefNumber" INTEGER NOT NULL,

    CONSTRAINT "HadithBook_pkey" PRIMARY KEY ("hadithID","bookID","hadithRefNumber")
);

-- CreateTable
CREATE TABLE "Language" (
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "rtl" BOOLEAN NOT NULL DEFAULT false,
    "sort" INTEGER,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "HadithTranslation" (
    "hadithID" INTEGER NOT NULL,
    "languageCode" VARCHAR NOT NULL,
    "topic" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "fontScale" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "HadithTranslation_pkey" PRIMARY KEY ("hadithID","languageCode")
);

-- CreateTable
CREATE TABLE "BookTranslation" (
    "bookID" INTEGER NOT NULL,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "BookTranslation_pkey" PRIMARY KEY ("bookID","languageCode")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "fki_BookUserCreated" ON "Book"("userIDCreated");

-- CreateIndex
CREATE INDEX "fki_BookUserUpdated" ON "Book"("userIDUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "Hadith_number_key" ON "Hadith"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Hadith_date_key" ON "Hadith"("date");

-- CreateIndex
CREATE INDEX "fki_HadithUserCreated" ON "Hadith"("userIDCreated");

-- CreateIndex
CREATE INDEX "fki_HadithUserUpdated" ON "Hadith"("userIDUpdated");

-- CreateIndex
CREATE INDEX "fki_HadithBook_Hadith_id" ON "HadithBook"("hadithID");

-- CreateIndex
CREATE INDEX "fki_HadithBook_Book_id" ON "HadithBook"("bookID");

-- CreateIndex
CREATE INDEX "fki_HadithTranslation_LanguageCode" ON "HadithTranslation"("languageCode");

-- CreateIndex
CREATE INDEX "fki_HadithTranslation_HadithID" ON "HadithTranslation"("hadithID");

-- CreateIndex
CREATE INDEX "fki_BookTranslation_BookID" ON "BookTranslation"("bookID");

-- CreateIndex
CREATE INDEX "fki_BookTranslation_LanguageCode" ON "BookTranslation"("languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "BookUserCreated" FOREIGN KEY ("userIDCreated") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "BookUserUpdated" FOREIGN KEY ("userIDUpdated") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Hadith" ADD CONSTRAINT "HadithUserCreated" FOREIGN KEY ("userIDCreated") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Hadith" ADD CONSTRAINT "HadithUserUpdated" FOREIGN KEY ("userIDUpdated") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HadithBook" ADD CONSTRAINT "HadithBook_Book_id" FOREIGN KEY ("bookID") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HadithBook" ADD CONSTRAINT "HadithBook_Hadith_id" FOREIGN KEY ("hadithID") REFERENCES "Hadith"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HadithTranslation" ADD CONSTRAINT "HadithTranslation_HadithID" FOREIGN KEY ("hadithID") REFERENCES "Hadith"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HadithTranslation" ADD CONSTRAINT "HadithTranslation_LanguageCode" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookTranslation" ADD CONSTRAINT "BookTranslation_BookID" FOREIGN KEY ("bookID") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookTranslation" ADD CONSTRAINT "BookTranslation_LanguageCode" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

