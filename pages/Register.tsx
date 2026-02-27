import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "../schemas/registerSchema";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../lib/useRegister";
import { useGetLookups } from "../lib/useGetLookups";
import countries from "i18n-iso-countries";
import arLocale from "i18n-iso-countries/langs/ar.json";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

countries.registerLocale(arLocale);

import { Input } from "@/components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/GlassComponents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "../context/LanguageContext";

// ─── Constants ─────────────────────────────────────────────────────────────

const INPUT_CLS = "h-12 bg-white/60 hover:bg-white/80 focus-visible:bg-white border-border/50 backdrop-blur-sm transition-all shadow-sm";


// ─── Component ─────────────────────────────────────────────────────────────

export default function RegisterPage() {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

    // country code options (Arabic names, sorted)
    const countryOptions = React.useMemo(() => {
        const obj = countries.getNames("ar", { select: "official" });
        return Object.entries(obj)
            .map(([code, name]) => ({ code, name }))
            .sort((a, b) => a.name.localeCompare(b.name, "ar"));
    }, []);

    const register_mutation = useRegisterMutation();
    const { data: lookups } = useGetLookups();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "", phone: "", email: "", password: "",
            avatar: undefined,
            name_ar: "", bio_ar: "",
            name_en: "", bio_en: "",
            sex: undefined as any,
            date_of_birth: "",
            country: "",
            national_number: "",
            is_his_account_verified: undefined as any,
            content_type_id: "",
            category_size_id: "",
            instagram: "", snapchat: "", youtube: "", tiktok: "",
        },
        mode: "onBlur",
    });

    const { register, setValue, watch, formState: { errors, isValid } } = form;
    const dob = watch("date_of_birth");

    function onPickAvatar(file: File | null) {
        setValue("avatar", file as any, { shouldValidate: true, shouldDirty: true });
        if (!file) { setAvatarPreview(null); return; }
        setAvatarPreview(URL.createObjectURL(file));
    }

    async function onSubmit(values: RegisterFormValues) {
        register_mutation.mutate(values, {
            onSuccess: () => navigate("/register/success"),
        });
    }

    const submitting = register_mutation.isPending;

    return (
        <div className="min-h-screen bg-hero-bg bg-dots flex items-center justify-center p-4 lg:pt-32 pt-28 lg:p-8 relative overflow-hidden">
            {/* Background glow accents */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <Card className="w-full max-w-3xl shadow-hover border-border/50 relative z-10 bg-white/80 backdrop-blur-xl">
                <CardHeader className="space-y-3 pb-6 border-b border-border/40">
                    <CardTitle className="text-2xl font-bold text-primary">{t("register_page.title")}</CardTitle>
                    <p className="text-sm text-gray-600">
                        {t("register_page.subtitle")}
                    </p>
                </CardHeader>

                <CardContent className="pt-6">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                        {/* ── Avatar top picker ── */}
                        <div className="md:col-span-2 flex flex-col items-center gap-3 pb-4 border-b border-border/40">
                            <div className="relative group">
                                {/* Circle preview / placeholder */}
                                <label
                                    htmlFor="avatar"
                                    className="cursor-pointer block h-28 w-28 rounded-full overflow-hidden border-4 border-primary/30 bg-hero-bg shadow-soft group-hover:border-primary/60 transition-all"
                                >
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt={t("register_page.avatar_alt")} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-[10px]">{t("register_page.avatar_click")}</span>
                                        </div>
                                    )}
                                    {/* Camera overlay on hover */}
                                    <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </label>
                                {/* Hidden file input */}
                                <input
                                    id="avatar" type="file" accept="image/*"
                                    className="sr-only"
                                    onChange={(e) => onPickAvatar(e.target.files?.[0] ?? null)}
                                />
                                {/* Remove button badge */}
                                {avatarPreview && (
                                    <button
                                        type="button"
                                        onClick={() => onPickAvatar(null)}
                                        className="absolute -bottom-1 -left-1 h-7 w-7 rounded-full bg-destructive text-white text-xs flex items-center justify-center shadow-md hover:bg-destructive/80 transition-colors"
                                        title="إزالة الصورة"
                                    >
                                        ✕
                                    </button>
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
                            <Label htmlFor="name">{t("register_page.name_label")}</Label>
                            <Input id="name" className={INPUT_CLS} placeholder="مثال: أحمد محمد" {...register("name")} />
                            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>

                        {/* phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">{t("register_page.phone_label")}</Label>
                            <div dir="ltr" className={`${INPUT_CLS} flex items-center rounded-md px-0 overflow-hidden [&_.PhoneInputCountry]:pr-2 [&_.PhoneInputCountry]:pl-3 [&_.PhoneInputCountry]:border-l-0 [&_.PhoneInputInput]:h-full [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:border-0`}>
                                <PhoneInput
                                    international
                                    defaultCountry="KW"
                                    value={watch("phone") || ""}
                                    onChange={(value) => setValue("phone", value ?? "", { shouldValidate: true, shouldDirty: true })}
                                    placeholder={lang === "ar" ? "ادخل رقم الهاتف" : "Enter phone number"}
                                    dir="ltr"
                                />
                            </div>
                            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                        </div>

                        {/* email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("register_page.email_label")}</Label>
                            <Input id="email" type="email" className={INPUT_CLS} placeholder="name@email.com" {...register("email")} />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>

                        {/* password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">{t("register_page.password_label")}</Label>
                            <Input id="password" type="password" className={INPUT_CLS} placeholder="••••••••" {...register("password")} />
                            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                        </div>

                        {/* ── Section: Profile Info ── */}
                        <div className="md:col-span-2 mt-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_profile")}</p>
                        </div>

                        {/* name_ar / name_en */}
                        <div className="space-y-2">
                            <Label htmlFor="name_ar">{t("register_page.name_ar_label")}</Label>
                            <Input id="name_ar" className={INPUT_CLS} placeholder={lang === "ar" ? "اسمك كما يُعرض للجمهور" : "Your display name"} {...register("name_ar")} />
                            {errors.name_ar && <p className="text-sm text-destructive">{errors.name_ar.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name_en">{t("register_page.name_en_label")}</Label>
                            <Input id="name_en" className={INPUT_CLS} placeholder="Display name in English" dir="ltr" {...register("name_en")} />
                            {errors.name_en && <p className="text-sm text-destructive">{errors.name_en.message}</p>}
                        </div>

                        {/* bio_ar / bio_en */}
                        <div className="space-y-2">
                            <Label htmlFor="bio_ar">{t("register_page.bio_ar_label")}</Label>
                            <Textarea id="bio_ar" className="bg-white/60 hover:bg-white/80 focus-visible:bg-white border-border/50 backdrop-blur-sm transition-all shadow-sm min-h-[80px]" placeholder={lang === "ar" ? "نبذة مختصرة عنك..." : "Short bio about you..."} {...register("bio_ar")} />
                            {errors.bio_ar && <p className="text-sm text-destructive">{errors.bio_ar.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio_en">{t("register_page.bio_en_label")}</Label>
                            <Textarea id="bio_en" className="bg-white/60 hover:bg-white/80 focus-visible:bg-white border-border/50 backdrop-blur-sm transition-all shadow-sm min-h-[80px]" placeholder="Short bio in English..." dir="ltr" {...register("bio_en")} />
                            {errors.bio_en && <p className="text-sm text-destructive">{errors.bio_en.message}</p>}
                        </div>


                        {/* ── Section: Personal Info ── */}
                        <div className="md:col-span-2 mt-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_personal")}</p>
                        </div>

                        {/* sex */}
                        <div className="space-y-2">
                            <Label>{t("register_page.sex_label")}</Label>
                            <RadioGroup
                                value={watch("sex") || ""}
                                onValueChange={(v) => setValue("sex", v as any, { shouldValidate: true })}
                                className="flex gap-6 pt-1"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem id="male" value="male" />
                                    <Label htmlFor="male">{t("register_page.male")}</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem id="female" value="female" />
                                    <Label htmlFor="female">{t("register_page.female")}</Label>
                                </div>
                            </RadioGroup>
                            {errors.sex && <p className="text-sm text-destructive">{errors.sex.message as any}</p>}
                        </div>

                        {/* date_of_birth */}
                        <div className="space-y-2">
                            <Label>{t("register_page.dob_label")}</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
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
                                                setValue("date_of_birth", "", { shouldValidate: true });
                                            }
                                        }}
                                        disabled={(date) => date > new Date() || date < new Date("1920-01-01")}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <input type="hidden" {...register("date_of_birth")} />
                            {errors.date_of_birth && <p className="text-sm text-destructive">{errors.date_of_birth.message}</p>}
                        </div>

                        {/* country */}
                        <div className="space-y-2">
                            <Label>{t("register_page.country_label")}</Label>
                            <Select value={watch("country") || ""} onValueChange={(v) => setValue("country", v, { shouldValidate: true })}>
                                <SelectTrigger className={INPUT_CLS}>
                                    <SelectValue placeholder={t("register_page.country_placeholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {countryOptions.map((c) => (
                                        <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
                        </div>

                        {/* national_number */}
                        <div className="space-y-2">
                            <Label htmlFor="national_number">{t("register_page.national_id_label")}</Label>
                            <Input id="national_number" className={INPUT_CLS} placeholder={lang === "ar" ? "اكتب الرقم" : "Type ID number"} {...register("national_number")} />
                            <p className="text-xs text-muted-foreground">{t("register_page.national_id_hint")}</p>
                            {errors.national_number && <p className="text-sm text-destructive">{errors.national_number.message}</p>}
                        </div>

                        {/* is_his_account_verified */}
                        <div className="space-y-2">
                            <Label>{t("register_page.is_verified_label")}</Label>
                            <div className="flex items-center gap-3 h-12 px-3  bg-white/60 ">
                                <Switch
                                    dir="ltr"
                                    id="is_verified_switch"
                                    checked={watch("is_his_account_verified") === "1"}
                                    onCheckedChange={(checked) =>
                                        setValue("is_his_account_verified", checked ? "1" : "0", { shouldValidate: true })
                                    }
                                />
                                <Label htmlFor="is_verified_switch" className="cursor-pointer select-none text-sm">
                                    {watch("is_his_account_verified") === "1" ? t("register_page.verified_yes") : t("register_page.verified_no")}
                                </Label>
                            </div>
                            {errors.is_his_account_verified && <p className="text-sm text-destructive">{errors.is_his_account_verified.message as any}</p>}
                        </div>

                        {/* ── Section: Content ── */}
                        <div className="md:col-span-2 mt-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_content")}</p>
                        </div>

                        {/* content_type_id */}
                        <div className="space-y-2">
                            <Label>{t("register_page.content_type_label")}</Label>
                            <Select value={watch("content_type_id") || ""} onValueChange={(v) => setValue("content_type_id", v, { shouldValidate: true })}>
                                <SelectTrigger className={INPUT_CLS}>
                                    <SelectValue placeholder={t("register_page.select_placeholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {(lookups?.content_types ?? []).map((t) => (
                                        <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.content_type_id && <p className="text-sm text-destructive">{errors.content_type_id.message}</p>}
                        </div>

                        {/* category_size_id */}
                        <div className="space-y-2">
                            <Label>{t("register_page.category_size_label")}</Label>
                            <Select value={watch("category_size_id") || ""} onValueChange={(v) => setValue("category_size_id", v, { shouldValidate: true })}>
                                <SelectTrigger className={INPUT_CLS}>
                                    <SelectValue placeholder={t("register_page.select_placeholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {(lookups?.sategory_sizes ?? []).map((s) => (
                                        <SelectItem key={s.id} value={String(s.id)}>{s.name} ({s.range})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_size_id && <p className="text-sm text-destructive">{errors.category_size_id.message}</p>}
                        </div>

                        {/* ── Section: Social Links ── */}
                        <div className="md:col-span-2 mt-2">
                            <p className="text-base font-semibold text-primary border-b border-border/40 pb-2 mb-1">{t("register_page.section_social")}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instagram">{t("register_page.instagram")}</Label>
                            <Input id="instagram" className={INPUT_CLS} placeholder="https://instagram.com/..." dir="ltr" {...register("instagram")} />
                            {errors.instagram && <p className="text-sm text-destructive">{errors.instagram.message as any}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tiktok">{t("register_page.tiktok")}</Label>
                            <Input id="tiktok" className={INPUT_CLS} placeholder="https://tiktok.com/@..." dir="ltr" {...register("tiktok")} />
                            {errors.tiktok && <p className="text-sm text-destructive">{errors.tiktok.message as any}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="youtube">{t("register_page.youtube")}</Label>
                            <Input id="youtube" className={INPUT_CLS} placeholder="https://youtube.com/..." dir="ltr" {...register("youtube")} />
                            {errors.youtube && <p className="text-sm text-destructive">{errors.youtube.message as any}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="snapchat">{t("register_page.snapchat")}</Label>
                            <Input id="snapchat" className={INPUT_CLS} placeholder="https://snapchat.com/add/..." dir="ltr" {...register("snapchat")} />
                            {errors.snapchat && <p className="text-sm text-destructive">{errors.snapchat.message as any}</p>}
                        </div>

                        {/* ── Submit ── */}
                        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-border/40 mt-2">
                            <Button type="button" variant="secondary" onClick={() => navigate("/login")} className="w-full sm:w-auto">
                                {t("register_page.btn_have_account")}
                            </Button>
                            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                                {submitting ? t("register_page.btn_submitting") : t("register_page.btn_submit")}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}