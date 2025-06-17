import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create users
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice Johnson",
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob Smith",
    },
  })

  const carol = await prisma.user.upsert({
    where: { email: "carol@example.com" },
    update: {},
    create: {
      email: "carol@example.com",
      name: "Carol Davis",
    },
  })

  // Create posts
  await prisma.post.createMany({
    data: [
      {
        title: "Getting Started with React",
        content:
          "React is a powerful library for building user interfaces. In this post, we will explore the basics of React and how to get started with your first component.",
        published: true,
        authorId: alice.id,
      },
      {
        title: "Advanced TypeScript Tips",
        content:
          "Here are some advanced TypeScript techniques that will help you write better, more maintainable code.",
        published: true,
        authorId: alice.id,
      },
      {
        title: "Database Design Principles",
        content:
          "Good database design is crucial for application performance and maintainability. Let's explore some key principles.",
        published: false,
        authorId: bob.id,
      },
      {
        title: "Modern CSS Techniques",
        content:
          "CSS has evolved significantly in recent years. Here are some modern techniques you should know about.",
        published: true,
        authorId: carol.id,
      },
    ],
    skipDuplicates: true,
  })

  console.log("Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
