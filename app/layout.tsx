import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn'
});

export const metadata: Metadata = {
  title: 'ساخت ویدیو از تصویر | راهنمای ابزارها',
  description:
    'راهنمای جامع ابزارهای ساخت ویدیو بر اساس تصویر، معرفی سرویس‌ها، ویژگی‌ها و نحوه شروع سریع برای کاربران فارسی‌زبان.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
