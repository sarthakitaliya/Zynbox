/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `connected_accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `connected_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `connected_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "connected_accounts" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "connected_accounts_email_key" ON "connected_accounts"("email");
