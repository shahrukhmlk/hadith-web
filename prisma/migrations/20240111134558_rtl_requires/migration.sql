/*
  Warnings:

  - Made the column `rtl` on table `Language` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "rtl" SET NOT NULL;
