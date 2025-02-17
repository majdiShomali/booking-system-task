import { PrismaClient } from "@prisma/client";
enum ERole {
  USER = "USER",
  PIONEER = "PIONEER",
}
const prisma = new PrismaClient();

async function main() {
  for (const role in ERole) {
    const roleName = ERole[role as keyof typeof ERole];
    await prisma.userRole.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
