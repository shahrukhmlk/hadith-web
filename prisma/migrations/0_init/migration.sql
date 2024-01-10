-- CreateEnum
CREATE TYPE "status" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMPTZ(6),
    "userCreated" INTEGER,
    "userUpdated" INTEGER,
    "status" "status" DEFAULT 'draft',
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
    "dateCreated" TIMESTAMPTZ(6),
    "dateUpdated" TIMESTAMPTZ(6),
    "userCreated" INTEGER,
    "userUpdated" INTEGER,

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
    "rtl" BOOLEAN DEFAULT false,
    "sort" INTEGER,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "HadithTranslation" (
    "hadithID" INTEGER NOT NULL,
    "languageCode" VARCHAR NOT NULL,
    "topic" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "fontScale" INTEGER,

    CONSTRAINT "HadithTranslation_pkey" PRIMARY KEY ("hadithID","languageCode")
);

-- CreateTable
CREATE TABLE "BookTranslation" (
    "bookID" INTEGER NOT NULL,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "BookTranslation_pkey" PRIMARY KEY ("bookID","languageCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hadith_number_key" ON "Hadith"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Hadith_date_key" ON "Hadith"("date");

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

