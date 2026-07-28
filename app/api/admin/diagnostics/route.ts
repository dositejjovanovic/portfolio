import { NextResponse } from "next/server";
import { getAdminAuthDiagnostics, verifyAdminPassword } from "@/lib/admin/auth";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") return new NextResponse(null, { status: 404 });
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  return NextResponse.json({ ...getAdminAuthDiagnostics(), passwordReceived: password.length > 0, passwordLength: password.length, compareResult: password.length > 0 ? await verifyAdminPassword(password) : false });
}
