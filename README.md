# dot Ai — موقع الشركة

موقع ثابت (Static) بـ **React + TypeScript + Vite + Tailwind CSS**، متجهّز للنشر المجاني على **GitHub Pages**.
البيع كله بيتم عن طريق **واتساب** فقط: مفيش checkout، ولا سلة، ولا دفع، ولا تسجيل دخول، ولا backend، ولا قاعدة بيانات.

- المنتجات المعروضة: **نظام HR** و **نظام Sales** فقط.
- الصفحة واحدة (Single Page) وفيها أقسام: `#home` `#about` `#solutions` `#hr` `#sales` `#process` `#contact`.
  اخترنا صفحة واحدة بدل Router عشان الـ refresh ما يعملش 404 على GitHub Pages، وتشتغل مع أي base path أو دومين لاحقاً.

---

## 1) النشر على GitHub Pages (خطوة بخطوة)

### أ) إنشاء حساب ومستودع (Repository)
1. لو معندكش حساب: ادخل على <https://github.com/signup> واعمل حساب.
2. اضغط **+** (أعلى اليمين) ← **New repository**.
3. اكتب اسم، مثلاً `dot-ai-website`، واختار **Public**، وماتحددش README/.gitignore (المشروع فيه الاتنين)، ثم **Create repository**.

### ب) رفع الملفات
**الطريقة السهلة (من المتصفح):**
1. فك ضغط الـ ZIP على جهازك.
2. في صفحة المستودع الفاضي اضغط **uploading an existing file**.
3. اسحب **محتويات** مجلد المشروع (مش المجلد نفسه) داخل الصفحة. **مهم:** لازم المجلد المخفي `.github` يترفع كمان (فيه ملف النشر). لو الـ drag & drop مش بيرفع الملفات المخفية، فعّل "Show hidden files" على جهازك (Windows: View ← Hidden items | Mac: `Cmd + Shift + .`).
4. **ماترفعش** `node_modules` ولا `dist` (مش موجودين في الـ ZIP أصلاً).
5. اضغط **Commit changes** مع اختيار الفرع **main**.

**الطريقة الاحترافية (Git):**
```bash
git init
git add .
git commit -m "dot Ai website"
git branch -M main
git remote add origin https://github.com/USERNAME/dot-ai-website.git
git push -u origin main
```

### ج) تفعيل GitHub Pages
1. في المستودع: **Settings** ← **Pages**.
2. تحت **Build and deployment** ← **Source** اختار **GitHub Actions**.
3. خلاص — مفيش حاجة تانية تتظبط.

### د) انتظار النشر
1. افتح تبويب **Actions**؛ هتلاقي workflow اسمه **Deploy to GitHub Pages** شغال (بياخد 1–3 دقايق).
2. لو ظهر ✅ أخضر يبقى اتنشر. لو ❌ أحمر افتحه واقرا الـ log (الأسباب الشائعة تحت في "حل المشاكل").

### هـ) إزاي تعرف رابط الموقع
- الرابط هيكون: `https://USERNAME.github.io/REPOSITORY/`
- بيظهر كمان في **Settings ← Pages** وفي نهاية job الـ `deploy` في صفحة الـ Actions.

### و) تحقق
- افتح الرابط وجرّب كل القائمة.
- جرّب على الموبايل.
- **اختبر أزرار واتساب:** "اطلب نظام HR" لازم تفتح محادثة على الرقم **01278574730** برسالة HR الجاهزة، و"اطلب نظام Sales" برسالة Sales، و"تواصل معنا" بالرسالة العامة.

> الـ canonical و Open Graph و sitemap و robots.txt و JSON-LD بتتولّد تلقائياً بالرابط الصحيح من الـ workflow (`VITE_SITE_URL`)، فمش محتاج تعدّل أي ملف.

---

## 2) التشغيل المحلي

```bash
npm install
npm run dev          # تطوير على http://localhost:5173
npm run typecheck    # فحص TypeScript
npm run lint         # ESLint
npm run build        # بناء الإنتاج داخل dist/
npm run preview      # معاينة نسخة الإنتاج محلياً
npm run audit:prod   # فحص ثغرات الـ dependencies
```
لبناء محلي بـ metadata كاملة: انسخ `.env.example` إلى `.env` واكتب `VITE_SITE_URL`.

### الـ Base path
الافتراضي `./` (مسارات نسبية) فيشتغل على `user.github.io/repo/` وعلى الدومين الجذر وعلى دومين مخصص بدون تعديل.
لو احتجت مسار مطلق: اضبط `VITE_BASE_PATH=/اسم-المستودع/` (في `.env` أو في خطوة Build داخل `deploy.yml`).

### دومين مخصص لاحقاً
1. Settings ← Pages ← **Custom domain** واكتب الدومين وفعّل **Enforce HTTPS**.
2. اضبط الـ DNS حسب تعليمات GitHub.
3. اعمل **Re-run** للـ workflow — `VITE_SITE_URL` هيتحدّث تلقائياً. لا يوجد أي رابط ثابت في الكود.

---

## 3) أين أعدّل المحتوى؟ (كله مركزي)

| المطلوب | الملف |
|---|---|
| رقم واتساب + رسائل الطلب الجاهزة | `src/config/whatsapp.ts` (الرقم في **مكان واحد فقط**) |
| بناء رابط واتساب والـ encoding | `src/utils/whatsapp.ts` |
| عناوين/وصف SEO، الشعار، الـ OG image | `src/config/seo.ts` |
| روابط القائمة، نصوص الأقسام، بيانات المنتجين، الخطوات | `src/config/site.ts` |
| ألوان الهوية (CSS variables) | `src/styles/index.css` (`@theme`) |
| صور الشعار | `src/assets/` و `public/` (مستخرجة من اللوجو الرسمي) |

لتغيير رقم واتساب: عدّل `WHATSAPP_NUMBER` في `src/config/whatsapp.ts` ثم ارفع التعديل — كل الأزرار + الـ JSON-LD + الـ footer بتتحدث تلقائياً.

**روابط السوشيال ميديا:** غير مضافة عمداً (ما اتحطش روابط حقيقية). أضفها في `src/sections/Footer.tsx` لما تجهز.

---

## 4) الأمان (Security)

> لا يوجد موقع مضمون 100% خالي من الثغرات. دي حدود وتقييم صادق.

### مطبّق فعلاً في الكود
- **صفر backend / database / auth / forms / endpoints** ← أقل attack surface ممكن.
- **Content-Security-Policy عبر `<meta>`** (production فقط): `default-src 'self'` + `script-src 'self'` + `style-src 'self'` + `img-src 'self' data:` + `font-src 'self' data:` + `object-src 'none'` + `base-uri 'self'` + `form-action 'none'` + `upgrade-insecure-requests`. الخطوط self-hosted (مفيش Google Fonts ولا أي طلب خارجي).
- `<meta name="referrer" content="strict-origin-when-cross-origin">`.
- كل روابط واتساب `target="_blank" rel="noopener noreferrer"`.
- لا `dangerouslySetInnerHTML` ولا `eval` (ESLint بيمنعهم كـ error).
- الـ JSON-LD بيتعمل له escape لحرف `<`.
- لا secrets ولا API keys ولا source maps في الـ build. الـ `.env` متجاهَل في `.gitignore`.
- Frame-buster بسيط في `main.tsx` (دفاع إضافي ضد clickjacking في production).
- Dependencies قليلة (react, react-dom, خط Cairo فقط للـ runtime).

### غير ممكن على GitHub Pages العادي (يحتاج CDN/Proxy مثل Cloudflare)
- **Response headers حقيقية:** `X-Content-Type-Options`, `Permissions-Policy`, `X-Frame-Options`, `Strict-Transport-Security` مخصص.
- **`frame-ancestors`** في CSP: بيتجاهله المتصفح لو جاي من `<meta>` — الحماية الحقيقية من clickjacking تحتاج header.
- **WAF / Rate limiting / DDoS مخصص:** GitHub Pages بيوفر حماية بنية تحتية عامة فقط. لو احتجت أكتر استخدم Cloudflare قدام الموقع.
- GitHub Pages بيقدّم HTTPS؛ فعّل **Enforce HTTPS** من Settings ← Pages.

### قائمة تحقق بعد النشر
- [ ] Settings ← Pages ← **Enforce HTTPS** مفعّل.
- [ ] افحص الموقع على <https://securityheaders.com> و <https://observatory.mozilla.org> (متوقع إنك هتشوف تحذيرات الـ headers اللي فوق — دي حدود الاستضافة).
- [ ] فعّل **Dependabot alerts** (Settings ← Code security).
- [ ] شغّل `npm run audit:prod` كل فترة.
- [ ] ماتحطش أي secret في المستودع (حتى لو Private، لأن Pages عام).

---

## 5) حل المشاكل

| المشكلة | الحل |
|---|---|
| Actions فشل في `npm ci` | تأكد إن `package-lock.json` اترفع. |
| Actions فشل في `lint` | افتح الـ log، وصلّح الخطأ المذكور. |
| صفحة بيضاء/404 | تأكد إن **Source = GitHub Actions** في Settings ← Pages، وإن الـ workflow نجح. |
| Workflow مش ظاهر | تأكد إن مجلد `.github/workflows/deploy.yml` اترفع (مجلد مخفي). |
| أول ما ترفع ما بيحصلش deploy | الفرع لازم يكون اسمه `main`. |
| تعديل مش ظاهر | اعمل Hard refresh (`Ctrl + F5`). |

---

## 6) تقرير الاختبار (اللي اتعمل فعلاً واللي لسه)

### تم اختباره فعلاً (Chromium headless عبر Playwright، والموقع متقدّم من مسار فرعي `/repo/` لمحاكاة GitHub Pages)
- ✅ `tsc` (TypeScript) بدون أخطاء، و`eslint` بدون أخطاء، و`vite build` ناجح.
- ✅ `npm audit --omit=dev` = **0 ثغرات** في الـ runtime dependencies.
- ✅ لا أخطاء console ولا مخالفات CSP ولا طلبات فاشلة ولا صور مكسورة عند العروض: 320 / 375 / 430 / 768 / 1024 / 1440 / 1920.
- ✅ لا يوجد horizontal scroll عند أي عرض منهم (الصفحة بعرض الشاشة بالظبط).
- ✅ المسارات النسبية للـ CSS/JS/الخطوط/الصور شغالة تحت مسار فرعي.
- ✅ **روابط واتساب (11 رابط):** نفس الرقم `201278574730`، ورسائل HR / Sales / العامة اتفك ترميزها وطابقت النص المطلوب حرفياً، وكلها `target="_blank"` و`rel="noopener noreferrer"`.
- ✅ كل روابط `#` الداخلية بتشير لأقسام موجودة، والـ scroll يوقف تحت الـ header صح.
- ✅ القائمة المحمولة: فتح/غلق، Escape، إغلاق بعد الضغط على رابط، خلفية صلبة.
- ✅ زر "تخطّي إلى المحتوى" أول عنصر في الـ Tab، و`prefers-reduced-motion` محترم.
- ✅ شريط واتساب السفلي يظهر على الموبايل بعد الـ Hero، والزر العائم على الشاشات الأكبر.
- ✅ مراجعة بصرية بلقطات شاشة على 375px و1440px (RTL، ترتيب الأقسام، الكروت، الـ footer).

### لم يتم اختباره (محتاج منك أو بعد النشر)
- ⏳ **تشغيل GitHub Actions والنشر الفعلي** — مقدرش أعمله من هنا. راجع تبويب Actions بعد أول push.
- ⏳ **فتح واتساب فعلياً** على موبايل/ويب (اتحقق من الرابط والترميز فقط، مش من التطبيق نفسه).
- ⏳ **Lighthouse** (Performance/Accessibility/SEO): ما اتشغّلش. الأهداف 90/95/95/95 هي أهداف مش نتائج مؤكدة. شغّله بعد النشر من Chrome DevTools ← Lighthouse.
- ⏳ اختبار على Safari/iOS و Firefox وأجهزة حقيقية، وقارئ شاشة، وفحص accessibility آلي (axe).
- ⏳ فحص الـ headers بعد النشر (securityheaders.com).
- ⚠️ `npm audit` الكامل بيعرض تحذير **moderate** في أدوات التطوير (`minimatch` داخل ESLint). ده **مش بيدخل في الموقع المنشور** (devDependency فقط). الحل المقترح من npm (`--force`) بيعمل downgrade لـ ESLint، فما طبّقتوش.
- ⚠️ إصدارات الـ GitHub Actions في `deploy.yml` (`checkout@v4`, `setup-node@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`) — لو GitHub اشتكى من إصدار قديم، حدّث رقمه.

## 7) قيود معروفة
- الموقع صفحة واحدة بتتعرض بـ JavaScript (فيه fallback بسيط لو JS مقفول). لو عايز SEO أقوى مستقبلاً: pre-rendering.
- رسومات واجهات HR وSales **توضيحية تجريدية** (من غير أرقام ولا بيانات)، ومكتوب تحتها "تصوّر توضيحي". لما يكون عندك screenshots حقيقية للنظامين، استبدلها.
- الأسعار غير معروضة (الرسائل بتطلب التفاصيل والأسعار على واتساب).
- لا توجد روابط سوشيال ولا analytics (ما اتوفروش، وما اتضافوش).
- الشعار مقصوص من الصورة الرسمية اللي رفعتها (دقة 1254px). لو عندك نسخة SVG/PNG بخلفية شفافة، حطها في `src/assets/` للحصول على أقصى جودة.
