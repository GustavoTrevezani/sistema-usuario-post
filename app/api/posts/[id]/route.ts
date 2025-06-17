import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, content, published, authorId } = body
    const postId = Number.parseInt(params.id)

    if (!title || !authorId) {
      return NextResponse.json({ error: "Title and authorId are required" }, { status: 400 })
    }

    const post = await prisma.post.update({
      where: { id: postId },
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

    return NextResponse.json(post)
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    if (error.code === "P2003") {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postId = Number.parseInt(params.id)

    await prisma.post.delete({
      where: { id: postId },
    })

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
