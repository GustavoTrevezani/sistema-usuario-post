import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");

    // Test Prisma connection
    await prisma.$connect();
    console.log("Prisma connected successfully");

    // Test query
    const userCount = await prisma.user.count();
    console.log("User count:", userCount);

    return NextResponse.json({
      success: true,
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
      userCount,
    });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error,
      },
      { status: 500 }
    );
  }
}
