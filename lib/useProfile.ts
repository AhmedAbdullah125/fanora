import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./api";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CategorySize = {
    id: number;
    name: string;
    range: string;
};

export type Influencer = {
    id: number;
    name: string;
    bio: string;
    phone: string;
    email: string;
    sex: "male" | "female" | string;
    date_of_birth: string;
    national_number: string;
    country: string;
    is_his_account_verified: number;
    instagram: string | null;
    tiktok: string | null;
    youtube: string | null;
    snapchat: string | null;
    avatar: string | null;
    category_size: CategorySize | null;
    content_type: any | null;
    total_followers: number;
    created_at: string;
    updated_at: string;
};

export type ProfileUser = {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_active: number;
    is_verify: number;
    lang: string;
    created_at: string;
    influencer: Influencer | null;
};

type ApiEnvelope<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    items: T;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLang(): string {
    const saved = localStorage.getItem("Kani_lang");
    return saved === "ar" || saved === "en" ? saved : "en";
}

function langHeader(): HeadersInit {
    return { lang: getLang() };
}

// ─── Fetch profile ─────────────────────────────────────────────────────────────

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await apiFetch("/profile", {
                method: "GET",
                headers: langHeader(),
            });

            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(txt || "فشل تحميل الملف الشخصي");
            }

            const data = (await res.json()) as ApiEnvelope<ProfileUser>;
            if (!data.status) throw new Error(data.message || "فشل تحميل الملف الشخصي");

            return data.items;
        },
        staleTime: 1000 * 60 * 5, // 5 min
    });
}

// ─── Update profile ───────────────────────────────────────────────────────────

export type UpdateProfilePayload = {
    name?: string;
    phone?: string;
    avatar?: File | null;
    name_ar?: string;
    name_en?: string;
    bio_ar?: string;
    bio_en?: string;
    sex?: string;
    date_of_birth?: string;
    country?: string;
    national_number?: string;
    is_his_account_verified?: string;
    content_type_id?: string;
    category_size_id?: string;
    instagram?: string;
    snapchat?: string;
    youtube?: string;
    tiktok?: string;
};

export function useUpdateProfile() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: UpdateProfilePayload) => {
            const fd = new FormData();

            (Object.keys(payload) as (keyof UpdateProfilePayload)[]).forEach((key) => {
                const val = payload[key];
                if (val === undefined || val === null) return;
                if (key === "avatar" && val instanceof File) {
                    fd.append("avatar", val);
                } else if (key !== "avatar") {
                    fd.append(key as string, val as string);
                }
            });

            const res = await apiFetch("/update-profile", {
                method: "POST",   // Laravel resource update via POST + _method spoof
                body: fd,
                headers: { ...langHeader(), "X-HTTP-Method-Override": "PUT" },
            });

            const json = await res.json().catch(() => null);

            if (!res.ok || json?.status === false) {
                throw new Error(json?.message || "فشل تحديث الملف الشخصي");
            }

            return json as ApiEnvelope<ProfileUser>;
        },

        onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ["profile"] });
            toast.success(data.message || "تم تحديث الملف الشخصي بنجاح");
        },

        onError: (err: Error) => {
            toast.error(err.message || "حدث خطأ أثناء التحديث");
        },
    });
}
