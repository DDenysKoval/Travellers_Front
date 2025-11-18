import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { logErrorResponse } from "../../_utils/utils";
import { NextResponse } from "next/server";
import { api } from "../../api";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get('/users/get-me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}