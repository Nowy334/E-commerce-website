import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();
  url.pathname = "/";
  if (!req.cookies["order"]) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
