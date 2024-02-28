-- DropForeignKey
ALTER TABLE "cronjobs" DROP CONSTRAINT "cronjobs_user_id_fkey";

-- AlterTable
ALTER TABLE "cronjobs" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cronjobs" ADD CONSTRAINT "cronjobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
