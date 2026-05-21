#!/usr/bin/env bash
# تشغيل أكاديمية لوفي محلياً على لينكس (أوفلاين بعد التثبيت الأول)
set -e

cd "$(dirname "$0")"

echo "▶ أكاديمية لوفي — التشغيل المحلي"
echo

# اختر مدير الحزم المتوفر
if command -v bun >/dev/null 2>&1; then
  PM="bun"
elif command -v pnpm >/dev/null 2>&1; then
  PM="pnpm"
elif command -v npm >/dev/null 2>&1; then
  PM="npm"
else
  echo "✗ يجب تثبيت Node.js أو Bun أولاً."
  echo "  Bun:  curl -fsSL https://bun.sh/install | bash"
  echo "  Node: sudo apt install nodejs npm"
  exit 1
fi

echo "→ استخدام: $PM"

# تثبيت الاعتمادات (يحتاج إنترنت لأول مرة فقط)
if [ ! -d "node_modules" ]; then
  echo "→ تثبيت الاعتمادات (مرة واحدة فقط، يحتاج اتصال إنترنت)..."
  $PM install
fi

# فتح المتصفح بعد ٤ ثواني
( sleep 4 && (xdg-open http://localhost:8080 2>/dev/null || true) ) &

echo
echo "✓ يعمل الآن على: http://localhost:8080"
echo "  للإيقاف: اضغط Ctrl+C"
echo

$PM run dev
