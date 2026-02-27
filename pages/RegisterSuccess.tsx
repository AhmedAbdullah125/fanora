import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/GlassComponents";

export default function RegisterSuccessPage() {
    const navigate = useNavigate();

    return (
        <div dir="rtl" className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle className="text-xl">تم إرسال الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-base">
                        تم استلام طلبك وسيتم مراجعته من الإدارة قبل تفعيله
                    </p>

                    <Alert>
                        <AlertTitle>معلومة</AlertTitle>
                        <AlertDescription>
                            حفظ الطلب داخل النظام — كل البيانات التي أدخلها المشهور تظل محفوظة داخل فانورة حتى تراجعها الإدارة
                        </AlertDescription>
                    </Alert>

                    <div className="flex flex-col md:flex-row gap-3 justify-end">
                        <Button variant="secondary" onClick={() => navigate("/register")}>
                            تعديل الطلب
                        </Button>
                        <Button onClick={() => navigate("/login")}>العودة لتسجيل الدخول</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}