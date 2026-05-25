import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await db.user.findMany()

  return NextResponse.json({
    success: true
  })
}