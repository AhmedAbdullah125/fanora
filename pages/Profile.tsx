import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useProfile, useUpdateProfile } from "../lib/useProfile";
import { useGetLookups } from "../lib/useGetLookups";
import countries from "i18n-iso-countries";
import arLocale from "i18n-iso-countries/langs/ar.json";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

countries.registerLocale(arLocale);

import { Input } from "@/components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/GlassComponents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon, Loader2, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { authStore } from "../lib/authStore";
import { useLanguage } from "../context/LanguageContext";

// ─── Constants ────────────────────────────────────────────────────────────────

const INPUT_CLS = "h-12 bg-white/60 hover:bg-white/80 focus-visible:bg-white border-border/50 backdrop-blur-sm transition-all shadow-sm";

// ─── Schema ───────────────────────────────────────────────────────────────────

const profileSchema = z.object({
    name: z.string().trim().min(3, "الاسم لازم 3 أحرف على الأقل"),
    phone: z.string().trim().min(7, "رقم الهاتف غير صحيح"),
    name_ar: z.string().trim().min(2, "الاسم بالعربي مطلوب"),
    name_en: z.string().trim().min(2, "الاسم بالإنجليزي مطلوب"),
    bio_ar: z.string().trim().optional(),
    bio_en: z.string().trim().optional(),
    sex: z.enum(["male", "female"]).optional(),
    date_of_birth: z.string().optional(),
    country: z.string().optional(),
    national_number: z.string().optional(),
    is_his_account_verified: z.enum(["0", "1"]).optional(),
    content_type_id: z.string().optional(),
    category_size_id: z.string().optional(),
    instagram: z.string().optional(),
    snapchat: z.string().optional(),
    youtube: z.string().optional(),
    tiktok: z.string().optional(),
    avatar: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const { data: profile, isLoading, isError, error } = useProfile();
    const { data: lookups } = useGetLookups();
    const updateMutation = useUpdateProfile();

    const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

    const handleLogout = () => {
        authStore.clear();
        navigate("/login");
    };

    const countryOptions = React.useMemo(() => {
        const obj = countries.getNames("ar", { select: "official" });
        return Object.entries(obj)
            .map(([code, name]) => ({ code, name }))
            .sort((a, b) => a.name.localeCompare(b.name, "ar"));
    }, []);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "", phone: "", name_ar: "", name_en: "",
            bio_ar: "", bio_en: "", sex: undefined, date_of_birth: "",
            country: "", national_number: "",
            is_his_account_verified: undefined,
            content_type_id: "", category_size_id: "",
            instagram: "", snapchat: "", youtube: "", tiktok: "",
        },
        mode: "onBlur",
    });

    const { register, setValue, watch, reset, formState: { errors, isDirty } } = form;
    const dob = watch("date_of_birth");

    // Populate form when data loads
    React.useEffect(() => {
        if (!profile) return;
        const inf = profile.influencer;

        // Parse API date format DD-MM-YYYY → YYYY-MM-DD (calendar needs ISO)
        const parseDobToISO = (raw: string | undefined): string => {
            if (!raw) return "";
            // Try DD-MM-YYYY
            const ddmmyyyy = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
            if (ddmmyyyy) return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`;
            return raw; // already ISO or unknown — pass through
        };

        const dob = parseDobToISO(inf?.date_of_birth);
        const verified: "0" | "1" = inf?.is_his_account_verified === 1 ? "1" : "0";
        const categorySizeId = String(inf?.category_size?.id ?? "");
        const contentTypeId = String(inf?.content_type?.id ?? "");

        // reset() handles text/textarea fields reliably
        reset({
            name: profile.name ?? "",
            phone: profile.phone ?? "",
            name_ar: inf?.name ?? "",
            name_en: inf?.name ?? "",
            bio_ar: inf?.bio ?? "",
            bio_en: inf?.bio ?? "",
            sex: (inf?.sex as "male" | "female") ?? undefined,
            date_of_birth: dob,
            country: inf?.country ?? "",
            national_number: inf?.national_number ?? "",
            is_his_account_verified: verified,
            content_type_id: contentTypeId,
            category_size_id: categorySizeId,
            instagram: inf?.instagram ?? "",
            snapchat: inf?.snapchat ?? "",
            youtube: inf?.youtube ?? "",
            tiktok: inf?.tiktok ?? "",
        });

        // Explicit setValue for Radix controlled components (Select / Switch)
        // These need a separate call because Radix reads value through a controlled
        // pattern that doesn't always pick up reset() in one cycle.
        setTimeout(() => {
            if (inf?.sex) setValue("sex", inf.sex as "male" | "female", { shouldDirty: false });
            if (inf?.country) setValue("country", inf.country, { shouldDirty: false });
            setValue("is_his_account_verified", verified, { shouldDirty: false });
            if (contentTypeId) setValue("content_type_id", contentTypeId, { shouldDirty: false });
            if (categorySizeId) setValue("category_size_id", categorySizeId, { shouldDirty: false });
        }, 0);

        if (inf?.avatar) setAvatarPreview(inf.avatar);
    }, [profile, reset, setValue]);

    function onPickAvatar(file: File | null) {
        setValue("avatar", file as any, { shouldDirty: true });
        if (!file) { setAvatarPreview(profile?.influencer?.avatar ?? null); return; }
        setAvatarPreview(URL.createObjectURL(file));
    }

    function onSubmit(values: ProfileFormValues) {
        const { avatar, ...rest } = values;
        updateMutation.mutate({
            ...rest,
            avatar: avatar instanceof File ? avatar : undefined,
        });
    }

    // Guard: redirect to login if not authenticated
    React.useEffect(() => {
        if (!authStore.get()) navigate("/login");
    }, [navigate]);

    // ── Loading / Error states ────────────────────────────────────────────────

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-hero-bg bg-dots">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-hero-bg bg-dots text-center">
                <p className="text-destructive text-lg font-medium">{(error as Error)?.message}</p>
                <Button onClick={() => navigate("/login")}>{t("login_page.btn_login")}</Button>
            </div>
        );
    }

    const inf = profile?.influencer;

    return (
        <div className="min-h-screen bg-hero-bg bg-dots flex items-center justify-center p-4 lg:pt-32 pt-28 lg:p-8 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <Card className="w-full max-w-3xl shadow-hover border-border/50 relative z-10 bg-white/80 backdrop-blur-xl">
                <CardHeader className="space-y-3 pb-6 border-b border-border/40 relative">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-primary">{t("profile_page.title")}</CardTitle>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center gap-2"
                            onClick={() => setShowLogoutConfirm(true)}
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">{t("profile_page.btn_logout")}</span>
                        </Button>
                    </div>
                    <p className="text-sm text-gray-600">
                        {t("profile_page.subtitle")}
                    </p>
                </CardHeader>

                <CardContent className="pt-6">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                        {/* ── Avatar ── */}
                        <div className="md:col-span-2 flex flex-col items-center gap-3 pb-4 border-b border-border/40">
                            <div className="relative group">
                                <label
                                    htmlFor="prof_avatar"
                                    className="cursor-pointer block h-28 w-28 rounded-full overflow-hidden border-4 border-primary/30 bg-hero-bg shadow-soft group-hover:border-primary/60 transition-all"
                                >
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt={t("profile_page.avatar_alt")} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground">
                                            <User className="h-10 w-10 opacity-40" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <User className="h-7 w-7 text-white" />
                                    </div>
                                </label>
                                <input id="prof_avatar" type="file" accept="image/*" className="sr-only"
                                    onChange={(e) => onPickAvatar(e.target.files?.[0] ?? null)} />
                                {avatarPreview && (
                                    <button type="button" onClick={() => onPickAvatar(null)}
                                        className="absolute -bottom-1 -left-1 h-7 w-7 rounded-full bg-destructive text-white text-xs flex items-center justify-center shadow-md hover:bg-destructive/80 transition-colors"
                                        title={t("profile_page.remove_image")}>✕</button>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">{t("register_page.avatar_hint")}</p>
                        </div>

                        {/* ── Section: Account ── */}
                        <div className="md:col-span-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_account")}</p>
                        </div>

                        {/* name */}
                        <div className="space-y-2">
                            <Label htmlFor="p_name">{t("register_page.name_label")}</Label>
                            <Input id="p_name" className={INPUT_CLS} {...register("name")} />
                            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>

                        {/* phone */}
                        <div className="space-y-2">
                            <Label htmlFor="p_phone">{t("register_page.phone_label")}</Label>
                            <div dir="ltr" className={`${INPUT_CLS} flex items-center rounded-md px-0 overflow-hidden [&_.PhoneInputCountry]:pr-2 [&_.PhoneInputCountry]:pl-3 [&_.PhoneInputInput]:h-full [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:border-0`}>
                                <PhoneInput
                                    international
                                    defaultCountry="KW"
                                    value={watch("phone") || ""}
                                    onChange={(v) => setValue("phone", v ?? "", { shouldValidate: true, shouldDirty: true })}
                                    dir="ltr"
                                />
                            </div>
                            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                        </div>

                        {/* ── Section: Profile Info ── */}
                        <div className="md:col-span-2 mt-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_profile")}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="p_name_ar">{t("register_page.name_ar_label")}</Label>
                            <Input id="p_name_ar" className={INPUT_CLS} {...register("name_ar")} />
                            {errors.name_ar && <p className="text-sm text-destructive">{errors.name_ar.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="p_name_en">{t("register_page.name_en_label")}</Label>
                            <Input id="p_name_en" className={INPUT_CLS} dir="ltr" {...register("name_en")} />
                            {errors.name_en && <p className="text-sm text-destructive">{errors.name_en.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="p_bio_ar">{t("register_page.bio_ar_label")}</Label>
                            <Textarea id="p_bio_ar" className="bg-white/60 hover:bg-white/80 focus-visible:bg-white border-border/50 backdrop-blur-sm transition-all shadow-sm min-h-[80px]" {...register("bio_ar")} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="p_bio_en">{t("register_page.bio_en_label")}</Label>
                            <Textarea id="p_bio_en" className="bg-white/60 hover:bg-white/80 focus-visible:bg-white border-border/50 backdrop-blur-sm transition-all shadow-sm min-h-[80px]" dir="ltr" {...register("bio_en")} />
                        </div>

                        {/* ── Section: Personal ── */}
                        <div className="md:col-span-2 mt-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_personal")}</p>
                        </div>

                        {/* sex */}
                        <div className="space-y-2">
                            <Label>{t("register_page.sex_label")}</Label>
                            <Select value={watch("sex") || ""} onValueChange={(v) => setValue("sex", v as any, { shouldValidate: true, shouldDirty: true })}>
                                <SelectTrigger className={INPUT_CLS}>
                                    <SelectValue placeholder={t("profile_page.select_placeholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">{t("register_page.male")}</SelectItem>
                                    <SelectItem value="female">{t("register_page.female")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* date_of_birth */}
                        <div className="space-y-2">
                            <Label>{t("register_page.dob_label")}</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline"
                                        className={cn(`w-full justify-start ${lang === 'ar' ? 'text-right' : 'text-left'} font-normal`, INPUT_CLS, !dob && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className={`${lang === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                                        {dob ? format(new Date(dob), "PPP", { locale: lang === 'ar' ? ar : undefined }) : <span>{t("register_page.dob_placeholder")}</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-auto p-0 z-50">
                                    <Calendar
                                        mode="single"
                                        captionLayout="dropdown"
                                        fromYear={1920}
                                        toYear={new Date().getFullYear()}
                                        selected={dob ? new Date(dob) : undefined}
                                        onSelect={(date) => {
                                            if (date) {
                                                const y = date.getFullYear();
                                                const m = String(date.getMonth() + 1).padStart(2, "0");
                                                const d = String(date.getDate()).padStart(2, "0");
                                                setValue("date_of_birth", `${y}-${m}-${d}`, { shouldValidate: true, shouldDirty: true });
                                            } else {
                                                setValue("date_of_birth", "", { shouldDirty: true });
                                            }
                                        }}
                                        disabled={(date) => date > new Date() || date < new Date("1920-01-01")}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <input type="hidden" {...register("date_of_birth")} />
                        </div>

                        {/* country */}
                        <div className="space-y-2">
                            <Label>{t("register_page.country_label")}</Label>
                            <Select value={watch("country") || ""} onValueChange={(v) => setValue("country", v, { shouldValidate: true, shouldDirty: true })}>
                                <SelectTrigger className={INPUT_CLS}>
                                    <SelectValue placeholder={t("register_page.country_placeholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {countryOptions.map((c) => (
                                        <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* national_number */}
                        <div className="space-y-2">
                            <Label htmlFor="p_national">{t("register_page.national_id_label")}</Label>
                            <Input id="p_national" className={INPUT_CLS} {...register("national_number")} />
                            <p className="text-xs text-muted-foreground">{t("profile_page.national_id_desc")}</p>
                        </div>

                        {/* is_his_account_verified */}
                        <div className="space-y-2">
                            <Label>{t("register_page.is_verified_label")}</Label>
                            <div className="flex items-center gap-3 h-12 px-3 bg-white/60">
                                <Switch
                                    dir="ltr"
                                    id="p_verified_switch"
                                    checked={watch("is_his_account_verified") === "1"}
                                    onCheckedChange={(checked) =>
                                        setValue("is_his_account_verified", checked ? "1" : "0", { shouldValidate: true, shouldDirty: true })
                                    }
                                />
                                <Label htmlFor="p_verified_switch" className="cursor-pointer select-none text-sm">
                                    {watch("is_his_account_verified") === "1" ? t("register_page.verified_yes") : t("register_page.verified_no")}
                                </Label>
                            </div>
                        </div>

                        {/* ── Section: Content ── */}
                        <div className="md:col-span-2 mt-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_content")}</p>
                        </div>

                        <div className="space-y-2">
                            <Label>{t("register_page.content_type_label")}</Label>
                            <Select value={watch("content_type_id") || ""} onValueChange={(v) => setValue("content_type_id", v, { shouldDirty: true })}>
                                <SelectTrigger className={INPUT_CLS}>
                                    <SelectValue placeholder={t("profile_page.select_placeholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {(lookups?.content_types ?? []).map((t) => (
                                        <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>{t("register_page.category_size_label")}</Label>
                            <Select value={watch("category_size_id") || ""} onValueChange={(v) => setValue("category_size_id", v, { shouldDirty: true })}>
                                <SelectTrigger className={INPUT_CLS}>
                                    <SelectValue placeholder={t("profile_page.select_placeholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {(lookups?.sategory_sizes ?? []).map((s) => (
                                        <SelectItem key={s.id} value={String(s.id)}>{s.name} ({s.range})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* ── Section: Social ── */}
                        <div className="md:col-span-2 mt-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_social")}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="p_instagram">{t("profile_page.instagram")}</Label>
                            <Input id="p_instagram" className={INPUT_CLS} dir="ltr" {...register("instagram")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="p_tiktok">{t("profile_page.tiktok")}</Label>
                            <Input id="p_tiktok" className={INPUT_CLS} dir="ltr" {...register("tiktok")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="p_youtube">{t("profile_page.youtube")}</Label>
                            <Input id="p_youtube" className={INPUT_CLS} dir="ltr" {...register("youtube")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="p_snapchat">{t("profile_page.snapchat")}</Label>
                            <Input id="p_snapchat" className={INPUT_CLS} dir="ltr" {...register("snapchat")} />
                        </div>

                        {/* ── Submit ── */}
                        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-border/40 mt-2">
                            <Button type="button" variant="secondary" onClick={() => navigate(-1)} className="w-full sm:w-auto">
                                {t("profile_page.btn_back")}
                            </Button>
                            <Button type="submit" disabled={updateMutation.isPending || !isDirty} className="w-full sm:w-auto">
                                {updateMutation.isPending ? t("profile_page.btn_saving") : t("profile_page.btn_save")}
                            </Button>
                        </div>

                    </form>

                    {/* Read-only stats */}
                    {inf && (
                        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-border/30 text-sm text-gray-600 space-y-1">
                            <p>🗓️ {t("profile_page.stats_join_date")}: {new Date(profile!.created_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</p>
                            <p>👥 {t("profile_page.stats_followers")}: {inf.total_followers.toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}</p>
                            {inf.category_size && <p>📊 {t("profile_page.stats_audience")}: {inf.category_size.name} ({inf.category_size.range})</p>}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-xl shadow-2xl border-border animate-in zoom-in-95 duration-200">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary flex items-center gap-2">
                                <LogOut className="h-5 w-5 text-destructive" />
                                {t("profile_page.logout_confirm_title")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-gray-600 text-sm">
                                {t("profile_page.logout_confirm_desc")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowLogoutConfirm(false)}
                                >
                                    {t("profile_page.logout_confirm_cancel")}
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={handleLogout}
                                >
                                    {t("profile_page.logout_confirm_ok")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
