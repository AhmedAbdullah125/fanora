import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./api";
import { RegisterFormValues } from "../schemas/registerSchema";
import { authStore } from "./authStore";
import { toast } from "sonner";

const OAUTH_CLIENT_ID = "a12cc71e-cb4c-45e5-89e3-7ea6f5d8c6de";
const OAUTH_CLIENT_SECRET = "Tj7VRG4YBERwPIQEQbshgqUSihDU6tXCLTPkSyuX";

type ApiEnvelope<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    items: T;
};

type FieldError = {
    fieldname: string;
    message: string;
};

export type RegisterResponseItems = {
    user: any;
    token?: {
        token_type: string;
        expires_in: number;
        access_token: string;
        refresh_token: string;
    };
};

/** Custom error that also carries per-field validation errors from the API */
export class RegisterApiError extends Error {
    fieldErrors: FieldError[];
    constructor(message: string, fieldErrors: FieldError[] = []) {
        super(message);
        this.fieldErrors = fieldErrors;
    }
}

export function useRegisterMutation() {
    return useMutation({
        mutationFn: async (values: RegisterFormValues) => {
            const fd = new FormData();

            // Fixed OAuth fields
            fd.append("grant_type", "password");
            fd.append("client_id", OAUTH_CLIENT_ID);
            fd.append("client_secret", OAUTH_CLIENT_SECRET);

            // Account credentials
            fd.append("name", values.name);
            fd.append("phone", values.phone);
            fd.append("email", values.email);
            fd.append("password", values.password);

            // Avatar
            if (values.avatar instanceof File) {
                fd.append("avatar", values.avatar);
            }

            // Translations
            fd.append("name_te[ar]", values.name_ar);
            fd.append("bio_te[ar]", values.bio_ar);
            fd.append("name_te[en]", values.name_en);
            fd.append("bio_te[en]", values.bio_en);

            // Personal info
            fd.append("sex", values.sex);
            fd.append("date_of_birth", values.date_of_birth);
            fd.append("accommodation", values.country);
            fd.append("nationality", values.nationality);
            fd.append("national_number", values.national_number);
            fd.append("is_his_account_verified", values.is_his_account_verified);

            // Content classification
            fd.append("content_type_id", values.content_type_id);
            fd.append("category_size_id", values.category_size_id);

            // Social links (optional)
            if (values.instagram) fd.append("instagram", values.instagram);
            if (values.snapchat) fd.append("snapchat", values.snapchat);
            if (values.youtube) fd.append("youtube", values.youtube);
            if (values.tiktok) fd.append("tiktok", values.tiktok);

            const res = await apiFetch("/register", {
                method: "POST",
                body: fd,
                headers: {},  // Let browser set Content-Type for FormData
            });

            const json = await res.json().catch(() => null);

            if (!res.ok || json?.status === false) {
                const msg = json?.message || "فشل إرسال الطلب";
                // API returns array of field errors on 422
                const fieldErrors: FieldError[] = Array.isArray(json?.items)
                    ? (json.items as FieldError[])
                    : [];
                throw new RegisterApiError(msg, fieldErrors);
            }

            return json as ApiEnvelope<RegisterResponseItems>;
        },

        onSuccess: (data) => {
            // Save token if returned (auto-login after register)
            if (data.items?.token) {
                authStore.set({
                    tokenType: data.items.token.token_type,
                    accessToken: data.items.token.access_token,
                    refreshToken: data.items.token.refresh_token,
                    expiresIn: data.items.token.expires_in,
                });
            }
            toast.success(data.message || "تمت العملية بنجاح", {
                description: `مرحباً ${data.items?.user?.name ?? ""} 🎉`,
                duration: 4000,
            });
        },

        onError: (error: Error) => {
            if (error instanceof RegisterApiError && error.fieldErrors.length > 0) {
                // Show each field error as a separate toast
                error.fieldErrors.forEach((fe) => {
                    toast.error(fe.message, { duration: 5000 });
                });
            } else {
                toast.error(error.message || "حدث خطأ غير متوقع", { duration: 5000 });
            }
        },
    });
}
