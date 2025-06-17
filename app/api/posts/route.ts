import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        id: "desc",
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, published, authorId } = body

    if (!title || !authorId) {
      return NextResponse.json({ error: "Title and authorId are required" }, { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        authorId: Number.parseInt(authorId),
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    if (error.code === "P2003") {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
