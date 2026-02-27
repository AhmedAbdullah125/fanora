import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./api";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LookupCategorySize = {
    id: number;
    name: string;
    range: string;
};

export type LookupContentType = {
    id: number;
    name: string;
};

export type LookupSocialLink = {
    id: number;
    name: string;
    link: string;
    icon: string;
};

export type LookupSex = {
    id: string;   // "male" | "female"
    name?: string;
    male?: string; // API typo — fallback label for female
};

export type LookupsData = {
    sategory_sizes: LookupCategorySize[];   // note API typo: "sategory"
    content_types: LookupContentType[];
    social_links: LookupSocialLink[];
    sexs: LookupSex[];
    phone?: string;
    email?: string;
    location?: string;
    map_location?: string;
};

type ApiEnvelope<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    items: T;
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function getLang(): string {
    const saved = localStorage.getItem("Kani_lang");
    return saved === "ar" || saved === "en" ? saved : "en";
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGetLookups() {
    return useQuery({
        queryKey: ["lookups", getLang()],
        queryFn: async () => {
            const lang = getLang();
            const res = await apiFetch("/lookups", {
                method: "GET",
                headers: {
                    lang,
                    "Accept-Language": lang,
                },
            });

            if (!res.ok) {
                throw new Error("فشل تحميل البيانات المرجعية");
            }

            const data = (await res.json()) as ApiEnvelope<LookupsData>;
            if (!data.status) {
                throw new Error(data.message || "فشل تحميل البيانات");
            }

            return data.items;
        },
        staleTime: 1000 * 60 * 15,  // 15 min — lookups rarely change
        gcTime: 1000 * 60 * 60,  // keep in cache for 1 hour
    });
}
