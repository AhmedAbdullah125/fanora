import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./api";
import { authStore } from "./authStore";

const OAUTH_CLIENT_ID = "a12cc71e-cb4c-45e5-89e3-7ea6f5d8c6de";
const OAUTH_CLIENT_SECRET = "Tj7VRG4YBERwPIQEQbshgqUSihDU6tXCLTPkSyuX";
const API_BASE_URL = import.meta.env.NEXT_PUBLIC_API_BASE_URL as string;

export type LoginItems = {
    token: {
        token_type: string;
        expires_in: number;
        access_token: string;
        refresh_token: string;
    };
    user: any;
};

type ApiEnvelope<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    items: T;
};

type RefreshResponseItems = {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
};

export function useLoginMutation() {
    return useMutation({
        mutationFn: async (values: { email: string; password: string }) => {
            const fd = new FormData();
            fd.append("email", values.email);
            fd.append("password", values.password);
            fd.append("client_id", OAUTH_CLIENT_ID);
            fd.append("client_secret", OAUTH_CLIENT_SECRET);
            fd.append("grant_type", "password");

            const res = await apiFetch("/login", {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(txt || "فشل تسجيل الدخول");
            }

            const data = (await res.json()) as ApiEnvelope<LoginItems>;

            if (!data.status) {
                throw new Error(data.message || "فشل تسجيل الدخول");
            }

            return data;
        },
        onSuccess: (data) => {
            authStore.set({
                tokenType: data.items.token.token_type,
                accessToken: data.items.token.access_token,
                refreshToken: data.items.token.refresh_token,
                expiresIn: data.items.token.expires_in,
            });
        }
    });
}

export function useRefreshTokenMutation() {
    return useMutation({
        mutationFn: async () => {
            const tokens = authStore.get();
            if (!tokens?.refreshToken) throw new Error("No refresh token available");

            const body = new FormData();
            body.append("grant_type", "refresh_token");
            body.append("refresh_token", tokens.refreshToken);
            body.append("client_id", OAUTH_CLIENT_ID);
            body.append("client_secret", OAUTH_CLIENT_SECRET);

            // Fetch bypassing the interceptor to avoid infinite loops if it 401s
            const res = await fetch(`${API_BASE_URL}/refresh-token`, {
                method: "POST",
                body: body,
            });

            if (!res.ok) throw new Error("Refresh failed");

            const data = (await res.json()) as ApiEnvelope<RefreshResponseItems>;
            if (!data.status) throw new Error(data.message || "Refresh failed");

            return data;
        },
        onSuccess: (data) => {
            authStore.set({
                tokenType: data.items.token_type,
                accessToken: data.items.access_token,
                refreshToken: data.items.refresh_token,
                expiresIn: data.items.expires_in,
            });
        }
    });
}
