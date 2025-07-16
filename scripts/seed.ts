import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: password,
    },
  });
}

main()
  .then(() => console.log('✅ Seeding complete'))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());