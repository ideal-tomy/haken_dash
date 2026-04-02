import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyRevenueTrend } from "@/lib/demo-data";

export default function RevenuePage() {
  const trend = monthlyRevenueTrend();
  const max = Math.max(...trend.map((t) => t.amountManYen));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-primary-alt">収益・LTV</h1>
        <p className="mt-1 text-sm text-muted">
          月次売上のダミー推移と回収イメージ（静的デモ）
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="size-5 text-primary" />
            月次売上（万円）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end gap-2 border-b border-border pb-2">
            {trend.map((t) => (
              <div
                key={t.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full max-w-10 rounded-t-md bg-primary/80 transition-all"
                  style={{
                    height: `${(t.amountManYen / max) * 100}%`,
                    minHeight: "12%",
                  }}
                  title={`${t.month}: ${t.amountManYen} 万円`}
                />
                <span className="text-[10px] text-muted rotate-0 sm:text-xs">
                  {t.month.slice(5)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">紹介料回収（デモ）</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 text-sm">
            <Badge variant="success">完了 14 件</Badge>
            <Badge variant="warning">一部 5 件</Badge>
            <Badge variant="secondary">未回収 3 件</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">リスクアラート（デモ）</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted">
            <p className="text-danger font-medium">
              返金保証終了まで 14 日: 2 件（ダミー）
            </p>
            <p className="mt-2">
              詳細は{" "}
              <Link href="/candidates" className="text-primary underline">
                候補者
              </Link>{" "}
              の書類タブと連携想定。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
