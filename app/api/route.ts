import { getMemes } from "@/queries";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getMemes();
  revalidatePath("/");
  return NextResponse.json({ data });
}
