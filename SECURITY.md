<div dir="rtl">

# سیاست امنیتی (Security Policy)

## گزارش آسیب‌پذیری

اگر مشکل امنیتی دیدید، لطفاً آن را **به‌صورت خصوصی** گزارش کنید و در Issue یا شبکه‌های اجتماعی عمومی منتشر نکنید:

1. از بخش **Security → Report a vulnerability** همین مخزن (در صورت فعال بودن)، یا
2. پیام خصوصی در [لینکدین سازنده](https://www.linkedin.com/in/ali-reza-hooman-a8047425/).

در گزارش بنویسید: چه چیزی، کجا، چطور بازتولید می‌شود، و چه اثری دارد. تلاش می‌کنیم ظرف چند روز پاسخ دهیم و پس از رفع مشکل، از شما (در صورت تمایل) قدردانی کنیم.

## محدوده

شامل: صفحه‌های برنامه، موتور آزمون (`shared/engine.js`)، داشبورد معلم (`teacher/`)، ورود دانش‌آموز و معلم، ثبت نتیجه‌ها، و (پس از راه‌اندازی) اشتراک و پرداخت.

خارج از محدوده: مشکلات خودِ پلتفرم‌های شخص ثالث (GitHub، Supabase، درگاه پرداخت)، مهندسی اجتماعی، حملات منع سرویس (DoS)، و گزارش‌های خودکار بدون اثر واقعی. کلید `publishable` در کد سمت کاربر طبق طراحی Supabase عمومی است و به‌خودیِ‌خود آسیب‌پذیری نیست؛ مشکل واقعی یعنی دسترسی غیرمجاز به داده از طریق آن.

## قواعد تست امن

- فقط روی حساب‌ها و داده‌ی خودتان تست کنید. به داده‌ی شخصی دانش‌آموزان یا معلم‌های واقعی دسترسی پیدا نکنید، آن را ذخیره یا منتشر نکنید.
- سرویس را مختل نکنید، درخواست انبوه نفرستید و بعد از اثبات مشکل ادامه ندهید.
- مشکل را قبل از رفع، به دیگران فاش نکنید.

تحقیق امنیتی با حسن نیت و مطابق این قواعد تخلف حساب نمی‌شود (بند ۶ فایل LICENSE).

## وضعیت فعلی (شفافیت)

برنامه هنوز در **مرحله‌ی آزمایشی** است. جزئیات اقدامات فعلی و برنامه‌ی تقویت امنیت در بخش «امنیت» فایل README آمده است.

---

# Security Policy (English)

**Report privately** via the repository's *Security → Report a vulnerability* (if enabled) or by private message on the owner's LinkedIn profile. Please do not open public issues for vulnerabilities.

**In scope:** the web app, quiz engine, teacher dashboard, student/teacher login, result submission, and (once launched) subscription and payment flows. **Out of scope:** third-party platforms (GitHub, Supabase, payment gateways), social engineering, denial-of-service, and automated scanner output without demonstrated impact. The `publishable` key in client code is public by design; unauthorized data access through it is the real issue.

**Testing rules:** use only your own accounts and data; do not access, keep or disclose other users' personal data; do not degrade the service; stop once the issue is proven; do not disclose before a fix. Good-faith research under these rules is welcome (see LICENSE §6).

</div>
