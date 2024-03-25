import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.noteType.createMany({
    data: [
      { name: 'Book Notes' },
      { name: 'Brainstorming' },
      { name: 'Daily Reflections' },
      { name: 'Errands' },
      { name: 'Finances' },
      { name: 'Fitness Goals' },
      { name: 'Gift Ideas' },
      { name: 'Gift Received' },
      { name: 'Gratitude Journal' },
      { name: 'Gratitude' },
      { name: 'Health Tracker' },
      { name: 'Ideas' },
      { name: 'Learning Resources' },
      { name: 'Meal Planning' },
      { name: 'Meeting Action Items' },
      { name: 'Meeting Notes' },
      { name: 'Movie Reviews' },
      { name: 'Personal' },
      { name: 'Project Notes' },
      { name: 'Quotes' },
      { name: 'Reminder' },
      { name: 'Research' },
      { name: 'Shopping List' },
      { name: 'Travel Plans' },
      { name: 'Work' },
      { name: 'Other' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
