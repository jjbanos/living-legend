import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Living Legend data...')

  // Seed some master classes if they don't exist
  const existing = await prisma.masterClass.count()
  if (existing === 0) {
    await prisma.masterClass.createMany({
      data: [
        { title: "Name It to Tame It", subtitle: "Anxiety & ego", durationMinutes: 7, category: "Anxiety", content: "Name the emotion...", order: 1 },
        { title: "Sexual Energy Mastery Without Losing Power", subtitle: "Channel drive", durationMinutes: 12, category: "Power", content: "Transmute energy...", order: 2 },
        // Add more as needed
      ]
    })
  }

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
