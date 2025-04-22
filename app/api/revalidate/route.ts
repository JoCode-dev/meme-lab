import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  // Revalidate the home page data
  revalidatePath("/");
  
  return NextResponse.json({ revalidated: true, now: Date.now() });
} 