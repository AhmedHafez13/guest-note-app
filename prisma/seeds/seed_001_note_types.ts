import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.noteType.createMany({
    data: [
      { name: 'Book' },
      { name: 'Brainstorming' },
      { name: 'Congrats' },
      { name: 'Daily Reflection' },
      { name: 'Errands' },
      { name: 'Finance' },
      { name: 'Fitness Goals' },
      { name: 'Gift Ideas' },
      { name: 'Gift Received' },
      { name: 'Gratitude Journal' },
      { name: 'Gratitude' },
      { name: 'Health Tracker' },
      { name: 'Idea' },
      { name: 'Invitation' },
      { name: 'Learning Resource' },
      { name: 'Meal Planning' },
      { name: 'Meeting' },
      { name: 'Movie Review' },
      { name: 'Personal' },
      { name: 'Project' },
      { name: 'Quote' },
      { name: 'Reminder' },
      { name: 'Research' },
      { name: 'Shopping List' },
      { name: 'Travel Plan' },
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
