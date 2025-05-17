/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "mails" ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
ADD COLUMN     "name" TEXT;

-- AddForeignKey
ALTER TABLE "mails" ADD CONSTRAINT "mails_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "custom_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
