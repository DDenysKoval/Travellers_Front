import { NextRequest, NextResponse } from "next/server";

import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await api.get("/users/favourites", {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
