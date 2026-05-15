/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const books = [
    {
      title: "The Starless Sea",
      author: "Erin Morgenstern",
      description: "A magical journey through a hidden library far beneath the surface of the earth.",
      rating: 5,
      status: "COMPLETED",
      coverImage: "https://m.media-amazon.com/images/I/918S3mPAtWL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      title: "Circe",
      author: "Madeline Miller",
      description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born.",
      rating: 5,
      status: "READING",
      coverImage: "https://m.media-amazon.com/images/I/81p166V2vBL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      title: "The Night Circus",
      author: "Erin Morgenstern",
      description: "The circus arrives without warning. No announcements precede it. It is simply there, when yesterday it was not.",
      rating: 4,
      status: "WANT_TO_READ",
      coverImage: "https://m.media-amazon.com/images/I/81S6UqZ7HFL._AC_UF1000,1000_QL80_.jpg"
    }
  ];

  console.log("Seeding magical books...");

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
  }

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
