import { authStore } from "./authStore";

const API_BASE_URL = import.meta.env.NEXT_PUBLIC_API_BASE_URL as string;

// fixed login credentials
const OAUTH_CLIENT_ID = "a12cc71e-cb4c-45e5-89e3-7ea6f5d8c6de";
const OAUTH_CLIENT_SECRET = "Tj7VRG4YBERwPIQEQbshgqUSihDU6tXCLTPkSyuX";

type ApiEnvelope<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    items: T;
};

type RefreshResponseItems = {
    token_type: string;      // "Bearer"
    expires_in: number;      // 31536000
    access_token: string;
    refresh_token: string;
};

let refreshing: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
    const tokens = authStore.get();
    if (!tokens?.refreshToken) throw new Error("No refresh token");

    const body = new FormData();
    body.append("grant_type", "refresh_token");
    body.append("refresh_token", tokens.refreshToken);
    body.append("client_id", OAUTH_CLIENT_ID);
    body.append("client_secret", OAUTH_CLIENT_SECRET);

    const res = await fetch(`${API_BASE_URL}/refresh-token`, {
        method: "POST",
        body: body,
    });

    if (!res.ok) throw new Error("Refresh failed");

    const data = (await res.json()) as ApiEnvelope<RefreshResponseItems>;
    if (!data.status) throw new Error(data.message || "Refresh failed");

    authStore.set({
        tokenType: data.items.token_type,
        accessToken: data.items.access_token,
        refreshToken: data.items.refresh_token,
        expiresIn: data.items.expires_in,
    });
}

/**
 * fetch wrapper:
 * - adds Authorization
 * - if 401 -> refresh once -> retry
 */
export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
    const tokens = authStore.get();

    const headers = new Headers(init?.headers || {});
    if (!(init?.body instanceof FormData)) {
        headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");
    }
    if (tokens?.accessToken) {
        headers.set("Authorization", `${tokens.tokenType || "Bearer"} ${tokens.accessToken}`);
    }

    const first = await fetch(`${API_BASE_URL}${input}`, { ...init, headers });

    if (first.status !== 401) return first;

    // avoid multiple refresh calls
    if (!refreshing) {
        refreshing = refreshAccessToken().finally(() => {
            refreshing = null;
        });
    }

    try {
        await refreshing;
    } catch {
        authStore.clear();
        return first; // return original 401, caller can redirect to login
    }

    const updated = authStore.get();
    const retryHeaders = new Headers(init?.headers || {});
    if (!(init?.body instanceof FormData)) {
        retryHeaders.set("Content-Type", retryHeaders.get("Content-Type") ?? "application/json");
    }
    if (updated?.accessToken) {
        retryHeaders.set("Authorization", `${updated.tokenType || "Bearer"} ${updated.accessToken}`);
    }

    return fetch(`${API_BASE_URL}${input}`, { ...init, headers: retryHeaders });
}