/*
  Warnings:

  - A unique constraint covering the columns `[first_name,last_name,birth_date,location]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_first_name_last_name_birth_date_location_key" ON "users"("first_name", "last_name", "birth_date", "location");
