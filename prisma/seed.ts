import { PrismaClient } from '@prisma/client';
import { users } from './users';
import { getDay, getMonth } from '../src/utils/date-utils';

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    const date = new Date(user.birthDate).toISOString();
    const newUser = await prisma.user.create({
      data: {
        ...user,
        birthDate: date,
      },
    });
    await prisma.cronjob.create({
      data: {
        name: `${newUser.firstName}_birthday_message`,
        isEnabled: true,
        crontab: `0 9 ${getDay(date)} ${getMonth(date)} *`,
        userId: newUser.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
