import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ClipboardList,
  FileText,
  GitBranch,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  candidates,
  clients,
  countDocumentAlerts,
  countN3OrAbove,
  getPipelineCounts,
  getTopCandidatesByAiScore,
  monthlyRevenueTrend,
  totalOpenSlots,
} from "@/lib/demo-data";

const pipelineOrder = [
  "interview_coordination",
  "offer_accepted",
  "visa_applying",
  "awaiting_entry",
  "training",
  "document_prep",
  "document_blocked",
] as const;

const pipelineLabels: Record<(typeof pipelineOrder)[number], string> = {
  interview_coordination: "面接調整",
  offer_accepted: "内定",
  visa_applying: "ビザ申請",
  awaiting_entry: "入国待ち",
  training: "講習",
  document_prep: "書類準備",
  document_blocked: "書類不備",
};

export default function DashboardPage() {
  const pipeline = getPipelineCounts();
  const totalPipeline = Object.values(pipeline).reduce((a, b) => a + b, 0);
  const top5 = getTopCandidatesByAiScore(5);
  const trend = monthlyRevenueTrend();
  const lastRev = trend[trend.length - 1]?.amountManYen ?? 0;
  const docAlerts = countDocumentAlerts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary-alt">
          ダッシュボード
        </h1>
        <p className="mt-1 text-sm text-muted">
          管理を便利に、判断をAIで — デモデータで全体像をご覧ください。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        <Link href="/candidates" className="group block">
          <Card className="h-full transition-all group-hover:border-primary/30">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Users className="size-5 text-primary" />
                候補者
              </CardTitle>
              <Badge variant="ai">
                <Sparkles className="mr-1 size-3" />
                AI
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold tabular-nums">
                {candidates.length}
                <span className="ml-2 text-sm font-normal text-muted">名登録</span>
              </div>
              <p className="text-sm text-muted">
                日本語 N3 以上:{" "}
                <span className="font-semibold text-foreground">
                  {countN3OrAbove()} 名
                </span>
              </p>
              <div className="rounded-lg bg-surface p-3 text-xs">
                <p className="mb-2 font-medium text-foreground">今日の推奨トップ5</p>
                <ul className="space-y-2">
                  {top5.map((c) => (
                    <li key={c.id} className="flex items-center gap-2">
                      <Image
                        src={c.photoUrl}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full bg-border"
                        unoptimized
                      />
                      <span className="truncate font-medium">{c.displayName}</span>
                      <span className="ml-auto tabular-nums text-primary">
                        {c.aiScore}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                一覧へ <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/candidates?view=pipeline" className="group block">
          <Card className="h-full transition-all group-hover:border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <GitBranch className="size-5 text-primary" />
                選考・ビザ進捗
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface">
                {pipelineOrder.map((key) => {
                  const n = pipeline[key];
                  if (n === 0) return null;
                  const w = Math.max(8, (n / totalPipeline) * 100);
                  return (
                    <div
                      key={key}
                      className="bg-primary/80 first:rounded-l-full last:rounded-r-full"
                      style={{ width: `${w}%` }}
                      title={`${pipelineLabels[key]}: ${n}`}
                    />
                  );
                })}
              </div>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {pipelineOrder.map((key) => (
                  <li key={key} className="flex justify-between gap-2 text-muted">
                    <span>{pipelineLabels[key]}</span>
                    <span className="font-semibold tabular-nums text-foreground">
                      {pipeline[key]}
                    </span>
                  </li>
                ))}
              </ul>
              {docAlerts > 0 && (
                <p className="text-xs font-medium text-danger">
                  要フォロー（書類）: {docAlerts} 件
                </p>
              )}
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                詳細へ <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/clients" className="group block">
          <Card className="h-full transition-all group-hover:border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Building2 className="size-5 text-primary" />
                クライアント
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold tabular-nums">
                {clients.length}
                <span className="ml-2 text-sm font-normal text-muted">社</span>
              </div>
              <p className="text-sm text-muted">
                欠員枠 合計:{" "}
                <span className="font-semibold text-warning">
                  {totalOpenSlots()} 名分
                </span>
              </p>
              <ul className="text-xs text-muted">
                {clients.slice(0, 3).map((c) => (
                  <li key={c.id} className="truncate">
                    {c.tradeNameJa} — 空き {c.operations.openSlots}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                一覧へ <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/matching" className="group block">
          <Card className="h-full transition-all group-hover:border-primary/30">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <ClipboardList className="size-5 text-primary" />
                マッチング
              </CardTitle>
              <Badge variant="ai">AI</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted">
                丸福惣菜 × Nuwan など、案件別の推奨候補を表示します。
              </p>
              <div className="rounded-lg bg-surface p-3 text-xs leading-relaxed text-foreground">
                「規律重視の現場には軍・警察経験者が適合」— 3行理由つき（デモ）
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                提案一覧へ <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/documents" className="group block">
          <Card className="h-full transition-all group-hover:border-primary/30">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <FileText className="size-5 text-primary" />
                書類
              </CardTitle>
              <Badge variant="ai">OCR</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted">
                生成・翻訳ステータス（デモ） / 右下 FAB で OCR 擬似体験
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="success">完了 12</Badge>
                <Badge variant="warning">要確認 3</Badge>
                <Badge variant="danger">不備 {docAlerts}</Badge>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                書類管理へ <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/revenue" className="group block">
          <Card className="h-full transition-all group-hover:border-primary/30">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <TrendingUp className="size-5 text-primary" />
                収益
              </CardTitle>
              <Badge variant="ai">LTV</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold tabular-nums">
                {lastRev}
                <span className="ml-1 text-base font-normal text-muted">万円/月</span>
              </div>
              <p className="text-xs text-muted">直近月の売上イメージ（ダミー推移）</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                収益画面へ <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/operations" className="group block sm:col-span-2 xl:col-span-1">
          <Card className="h-full border-dashed transition-all group-hover:border-primary/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">勤怠・請求（拡張枠）</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              CSV 取込イメージ。今回はプレースホルダ — 実務・収益ハブへ
              <span className="mt-2 flex items-center gap-1 font-medium text-primary">
                開く <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/knowledge" className="group block sm:col-span-2 xl:col-span-2">
          <Card className="h-full border-dashed transition-all group-hover:border-primary/40">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Sparkles className="size-5 text-primary" />
                社内ナレッジ AI（拡張枠）
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              入管トラブル FAQ をチャットで — デモでは概要のみ表示
              <span className="mt-2 flex items-center gap-1 font-medium text-primary">
                ナレッジへ <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
