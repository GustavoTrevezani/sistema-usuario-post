import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching users...");
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    console.log("Users fetched:", users.length);
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Creating user...");
    const body = await request.json();
    const { name, email } = body;

    console.log("User data:", { name, email });

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Test connection first
    await prisma.$connect();
    console.log("Database connected");

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
      include: {
        posts: true,
      },
    });

    console.log("User created:", user);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create user",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
