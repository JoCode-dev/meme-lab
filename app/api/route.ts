import { getMemes } from "@/queries";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const memes = await getMemes();
  revalidatePath("/");
  return NextResponse.json({ memes });
}
