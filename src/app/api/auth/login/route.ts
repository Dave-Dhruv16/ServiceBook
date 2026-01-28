import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const { passwordHash, ...userProfile } = user;

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    const response = NextResponse.json({
        message: "Login successful",
        user: userProfile,
        token
    });

    // In a real app, we'd set a session cookie here (e.g. JWT)
    // response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
