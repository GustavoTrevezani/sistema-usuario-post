import { NextResponse } from "next/server";

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return NextResponse.json(
        {
          error: "DATABASE_URL not found",
          env: Object.keys(process.env).filter((key) =>
            key.includes("DATABASE")
          ),
        },
        { status: 500 }
      );
    }

    // Test with native PostgreSQL connection
    const { Client } = require("pg");
    const client = new Client({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await client.connect();
    const result = await client.query("SELECT NOW()");
    await client.end();

    return NextResponse.json({
      success: true,
      timestamp: result.rows[0].now,
      databaseUrl: databaseUrl.substring(0, 30) + "...",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        databaseUrl: process.env.DATABASE_URL ? "Set but invalid" : "Not set",
      },
      { status: 500 }
    );
  }
}
