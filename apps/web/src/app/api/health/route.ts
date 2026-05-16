import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "reserveflow",
    time: new Date().toISOString(),
  });
}
