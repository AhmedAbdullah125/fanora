export type Tokens = {
    accessToken: string;
    refreshToken: string;
    tokenType: string; // "Bearer"
    expiresIn?: number; // seconds
};

const KEY = "fanora_tokens_v1";

export const authStore = {
    get(): Tokens | null {
        try {
            const raw = localStorage.getItem(KEY);
            return raw ? (JSON.parse(raw) as Tokens) : null;
        } catch {
            return null;
        }
    },
    set(tokens: Tokens) {
        localStorage.setItem(KEY, JSON.stringify(tokens));
    },
    clear() {
        localStorage.removeItem(KEY);
    },
};