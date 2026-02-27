import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { authStore } from "../lib/authStore";
import { useLoginMutation } from "../lib/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, GlassCard } from "@/components/ui/GlassComponents";
import { useLanguage } from "../context/LanguageContext";

const loginSchema = z.object({
    email: z.string().trim().email("البريد الإلكتروني غير صحيح"),
    password: z.string().min(6, "كلمة المرور لازم تكون 6 أحرف على الأقل"),
});

type LoginValues = z.infer<typeof loginSchema>;

// نفس envelope اللي بترجّعه الـ API بتاعتك
type ApiEnvelope<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    items: T;
};

// افتراض شكل items في login (لو مختلف ابعته وعدّله فورًا)


export default function LoginPlaceholder() {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const [serverError, setServerError] = React.useState<string | null>(null);

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
        mode: "onBlur",
    });

    const loginMutation = useLoginMutation();

    function onSubmit(values: LoginValues) {
        setServerError(null);
        loginMutation.mutate(values, {
            onSuccess: () => {
                navigate("/");
                setServerError(null);
            },
            onError: (error: any) => {
                setServerError(error?.message || "حدث خطأ غير متوقع");
            }
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative font-sans bg-hero-bg overflow-hidden">
            <div className="absolute inset-0 z-0 bg-dots opacity-50"></div>

            <GlassCard className="w-full max-w-md p-8 bg-white border border-border shadow-xl rounded-2xl relative z-10 flex flex-col">
                <div className="text-center mb-8 space-y-3">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">{t("login_page.title")}</h1>
                    <p className="text-sm md:text-base text-gray-600 font-medium">
                        {t("login_page.subtitle")}
                    </p>
                </div>

                <div className="space-y-4">
                    {serverError && (
                        <Alert variant="destructive">
                            <AlertTitle>{t("login_page.error_title")}</AlertTitle>
                            <AlertDescription>{serverError}</AlertDescription>
                        </Alert>
                    )}

                    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-text font-semibold">{t("login_page.email_label")}</Label>
                            <Input
                                id="email"
                                type="email"
                                className="bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary transition-all duration-200"
                                placeholder="name@email.com"
                                {...form.register("email")}
                            />
                            {form.formState.errors.email && (
                                <p className="text-sm text-destructive font-medium">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-text font-semibold">{t("login_page.password_label")}</Label>
                            <Input
                                id="password"
                                type="password"
                                className="bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary transition-all duration-200"
                                placeholder="••••••••"
                                {...form.register("password")}
                            />
                            {form.formState.errors.password && (
                                <p className="text-sm text-destructive font-medium">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" fullWidth disabled={loginMutation.isPending} className="mt-4 shadow-lg shadow-primary">
                            {loginMutation.isPending ? t("login_page.btn_logging_in") : t("login_page.btn_login")}
                        </Button>
                    </form>

                    <div className="flex items-center justify-between text-sm mt-8 pt-6 border-t border-border">
                        <span className="text-gray-600 font-medium">{t("login_page.no_account")}</span>
                        <Link className="text-primary font-bold hover:underline transition-all" to="/register">
                            {t("login_page.create_account")}
                        </Link>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}