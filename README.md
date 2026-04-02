# 派遣コックピット（営業デモ）

Next.js 静的デモ — Supabase / 実 API なしでブラウザだけで動作します。

## 起動

```bash
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

- 型定義: [`data/types.ts`](data/types.ts)
- シード（8 社・20 名）: `lib/demo-data.ts`
- メッセージ（翻訳デモ）: `lib/demo-messages.ts`  
  - 50 パターンに増やす場合は `demoMessages` 配列へオブジェクトを追記してください（`返答demo.md` を手で転記するのが確実です）。

## 営業デモの推しシナリオ

1. **ダッシュボード俯瞰** — トップの 3×2＋拡張枠で数値と「AI」バッジを確認 → 各カードから詳細へ。
2. **マッチング** — 「マッチング」→ 丸福惣菜など任意クライアントの「AI おすすめ候補」とパーセント理由を見せる。Nuwan Kumara は丸福と高スコア想定。
3. **書類・OCR** — 「書類」または右下 FAB（スマホ表示）で OCR 擬似フロー。Dhammika（書類不備）を候補者詳細で赤表示。
4. **メッセージ翻訳** — `/messages` でシンハラ語と「AI 翻訳を表示」トグル。要注意バッジをアピール。

## Vercel デプロイ

Next.js は **このフォルダがアプリのルート** です（`package.json` と `app/` が同じ階層）。

### プロジェクト設定（ダッシュボード）

| 項目 | 推奨値 |
|------|--------|
| **Framework Preset** | Next.js |
| **Root Directory** | リポジトリのルートに `package.json` があるなら **空** または `.`。親フォルダがリポジトリで、このプロジェクトがサブフォルダなら **そのフォルダ名**（例: `haken_dash`） |
| **Build Command** | 空欄（デフォルト）または `npm run build` |
| **Output Directory** | **空欄のまま**（`out` や `dist` を入れない。Next.js は Vercel が出力先を管理します） |
| **Install Command** | 空欄または `npm install` |
| **Node.js Version** | 20.x 以上（`package.json` の `engines` 参照） |

環境変数はこのデモでは不要です。ルートに `vercel.json` があり `framework: nextjs` を指定しています。

### `404: NOT_FOUND`（Vercel の白いエラー画面）のとき

1. **Root Directory** が古い `web` などになっていないか確認し、正しいフォルダに直す。
2. **Output Directory** に手動で値が入っていたら削除する。
3. 表示している URL が **古いプレビュー** の場合、ダッシュボードの **Deployments** から **最新の Ready** デプロイを開くか、本番ドメインを使う。
4. デプロイの **Build Logs** で `npm run build` が成功しているか確認する（失敗するとページが出ません）。

リポジトリを直したあとは **Redeploy**（「Redeploy」→ キャッシュの有無はどちらでも可）を実行してください。
