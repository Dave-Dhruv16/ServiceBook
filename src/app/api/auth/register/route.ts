import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, password, role } = body;

    // Basic Validation
    if (!email || !firstName || !lastName || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        email,
        firstName,
        lastName,
        passwordHash: hashedPassword,
        role,
      })
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        createdAt: users.createdAt,
      });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return NextResponse.json({ user, token });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "User registration failed" },
      { status: 500 }
    );
  }
}
