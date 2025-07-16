import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const password = bcrypt.hashSync('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@mc.com' },
    update: {},
    create: {
      email: 'admin@mc.com',
      password,
    },
  });
  console.log('✅ Admin user ensured.');
}

main();