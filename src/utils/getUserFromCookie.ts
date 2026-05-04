"use server";

import { cookies } from "next/headers";

export const getUserFromCookie = async () => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;

    if (!userCookie) return null;

    try {
        return JSON.parse(decodeURIComponent(userCookie));
    } catch {
        return null;
    }
};