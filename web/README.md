# 派遣コックピット（営業デモ）

Next.js 静的デモ — Supabase / 実 API なしでブラウザだけで動作します。

## 起動

```bash
cd web
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## ビルド

```bash
npm run build
npm start
```

## データ

- 型定義: リポジトリ直下の [`../data/types.ts`](../data/types.ts)
- シード（8 社・20 名）: `lib/demo-data.ts`
- メッセージ（翻訳デモ）: `lib/demo-messages.ts`  
  - 50 パターンに増やす場合は `demoMessages` 配列へオブジェクトを追記してください（`返答demo.md` を手で転記するのが確実です）。

## 営業デモの推しシナリオ

1. **ダッシュボード俯瞰** — トップの 3×2＋拡張枠で数値と「AI」バッジを確認 → 各カードから詳細へ。
2. **マッチング** — 「マッチング」→ 丸福惣菜など任意クライアントの「AI おすすめ候補」とパーセント理由を見せる。Nuwan Kumara は丸福と高スコア想定。
3. **書類・OCR** — 「書類」または右下 FAB（スマホ表示）で OCR 擬似フロー。Dhammika（書類不備）を候補者詳細で赤表示。
4. **メッセージ翻訳** — `/messages` でシンハラ語と「AI 翻訳を表示」トグル。要注意バッジをアピール。

## Vercel デプロイ（任意）

`web` フォルダをプロジェクトルートとしてインポートするか、モノレポの場合は Root Directory に `web` を指定してください。環境変数はデモでは不要です。
