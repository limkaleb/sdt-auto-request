-- CreateTable
CREATE TABLE "cronjobs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "crontab" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL,

    CONSTRAINT "cronjobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cronjobs_user_id_idx" ON "cronjobs"("user_id");

-- AddForeignKey
ALTER TABLE "cronjobs" ADD CONSTRAINT "cronjobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
