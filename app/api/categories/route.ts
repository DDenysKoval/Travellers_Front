import { NextResponse } from "next/server";
import { api } from '../api';

export async function GET() {
  try {
    const response = await api.get("/categories");
    return NextResponse.json({ data: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}