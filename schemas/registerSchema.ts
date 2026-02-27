import { z } from "zod";

const urlOrEmpty = z
    .string()
    .trim()
    .optional()
    .refine(
        (v) => {
            if (!v) return true;
            try { new URL(v); return true; } catch { return false; }
        },
        { message: "أدخل رابط صحيح" }
    );

export const registerSchema = z.object({
    // Account credentials
    name: z.string().trim().min(3, "الاسم لازم 3 أحرف على الأقل"),
    phone: z.string().trim().regex(/^\+\d{7,15}$/, "رقم الهاتف غير صحيح"),
    email: z.string().trim().email("البريد الإلكتروني غير صحيح"),
    password: z.string().min(8, "كلمة المرور لازم 8 أحرف على الأقل"),

    // Avatar
    avatar: z.any(),

    // Translations
    name_ar: z.string().trim().min(2, "الاسم بالعربي مطلوب"),
    bio_ar: z.string().trim().min(10, "النبذة بالعربي مطلوبة (10 أحرف على الأقل)"),
    name_en: z.string().trim().min(2, "الاسم بالإنجليزي مطلوب"),
    bio_en: z.string().trim().min(10, "النبذة بالإنجليزي مطلوبة (10 أحرف على الأقل)"),

    // Personal info
    sex: z.enum(["male", "female"], { error: "اختر الجنس" }),
    date_of_birth: z.string().min(1, "تاريخ الميلاد مطلوب"),
    country: z.string().length(2, "اختر الدولة"),  // ISO 2-letter code e.g. KW, EG
    national_number: z.string().trim().min(6, "الرقم المدني لازم 6 أحرف على الأقل"),
    is_his_account_verified: z.enum(["0", "1"], { error: "اختر حالة التوثيق" }),

    // Content classification
    content_type_id: z.string().min(1, "اختر نوع المحتوى"),
    category_size_id: z.string().min(1, "اختر حجم الجمهور"),

    // Social links (optional URLs)
    instagram: urlOrEmpty,
    snapchat: urlOrEmpty,
    youtube: urlOrEmpty,
    tiktok: urlOrEmpty,
});

export type RegisterFormValues = z.infer<typeof registerSchema>;