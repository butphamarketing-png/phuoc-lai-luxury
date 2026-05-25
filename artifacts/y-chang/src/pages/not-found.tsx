import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white pt-24">
      <Card className="w-full max-w-md mx-4 rounded-[2rem] border-black/[0.06]">
        <CardContent className="pt-8 pb-8 text-center">
          <AlertCircle className="h-10 w-10 text-black/30 mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-[#1A1A1A] mb-3">
            Không tìm thấy trang
          </h1>
          <p className="text-sm text-black/50 font-light mb-8">
            Đường dẫn không tồn tại hoặc đã được thay đổi.
          </p>
          <Button asChild className="rounded-full bg-[#1A1A1A] px-8">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
