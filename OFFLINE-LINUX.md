# أكاديمية لوفي — التشغيل المحلي على لينكس (أوفلاين)

موقع تفاعلي لتعلّم اللغة الصينية بأسلوب الأنمي.

## التشغيل السريع

```bash
chmod +x run-linux.sh
./run-linux.sh
```

سيُفتح الموقع تلقائياً على: <http://localhost:8080>

## المتطلبات

واحد فقط من التالي:
- **Bun** (أسرع وأخف): `curl -fsSL https://bun.sh/install | bash`
- **Node.js + npm**: `sudo apt install nodejs npm` (Debian/Ubuntu) أو `sudo pacman -S nodejs npm` (Arch)

## أوفلاين كامل

- التثبيت الأول (`run-linux.sh`) يحتاج اتصال إنترنت **مرة واحدة** لتنزيل الاعتمادات.
- بعد ذلك يعمل الموقع بالكامل بدون إنترنت: الدروس، النطق (Web Speech API المدمج في المتصفح)، الصور، والتقدم محفوظ في `localStorage`.

## التشغيل كتطبيق سطح مكتب

انسخ ملف الاختصار إلى قائمة التطبيقات:

```bash
cp luffy-academy.desktop ~/.local/share/applications/
sed -i "s|%k|$(pwd)/luffy-academy.desktop|" ~/.local/share/applications/luffy-academy.desktop
```

## الميزات المضافة

- ⚡ **نظام XP** ونقاط تُحفظ محلياً
- 🔥 **سلسلة إجابات (Streak)** مع تتبّع الأفضل
- 🃏 **بطاقات تعليمية (Flashcards)** قابلة للقلب
- 🎵 **مدرّب النغمات الأربع** (mā má mǎ mà)
- 🌙 **وضع ليلي**
- 🔇 **تبديل الصوت**
- 🗺 **خريطة طريق** تُفتح فصولها بحسب تقدّمك

## تشغيل غير مدير الحزم
```bash
bun install && bun run dev      # أو
npm install && npm run dev
```

ثم افتح <http://localhost:8080>.
