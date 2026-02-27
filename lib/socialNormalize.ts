export function normalizeSocial(value?: string, platform?: "instagram" | "tiktok" | "youtube" | "snapchat") {
    const v = value?.trim();
    if (!v) return undefined;

    if (v.startsWith("http://") || v.startsWith("https://")) return v;

    if (v.startsWith("@")) {
        const handle = v.slice(1);
        switch (platform) {
            case "instagram":
                return `https://instagram.com/${handle}`;
            case "tiktok":
                return `https://www.tiktok.com/@${handle}`;
            case "youtube":
                return `https://www.youtube.com/@${handle}`;
            case "snapchat":
                return `https://www.snapchat.com/add/${handle}`;
            default:
                return v;
        }
    }

    // if user typed a domain-ish string without protocol
    return `https://${v}`;
}