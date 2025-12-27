'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { creatorTools, type CreatorTool, type FeatureTag } from '@/lib/tools';
import { FeatureFilter } from '@/components/FeatureFilter';
import { SearchInput } from '@/components/SearchInput';
import { ToolCard } from '@/components/ToolCard';
import { Lightbulb, Play, Sparkles } from 'lucide-react';

const heroBadges = [
  {
    icon: <Sparkles className="h-4 w-4" />,
    label: 'همه چیز درباره ساخت ویدیو از تصویر'
  },
  {
    icon: <Play className="h-4 w-4" />,
    label: 'آموزش مرحله‌به‌مرحله و لینک مستقیم'
  }
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<FeatureTag[]>(['image-to-video']);

  const featureOptions = useMemo<FeatureTag[]>(() => {
    const set = new Set<FeatureTag>();
    creatorTools.forEach((tool) => tool.featureTags.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, []);

  const filteredTools = useMemo<CreatorTool[]>(() => {
    return creatorTools.filter((tool) => {
      const matchesQuery = query
        ? [tool.name, tool.description, tool.strengths.join(' ')].some((value) =>
            value.toLowerCase().includes(query.toLowerCase())
          )
        : true;

      const matchesFeatures = selected.length
        ? selected.every((feature) => tool.featureTags.includes(feature))
        : true;

      return matchesQuery && matchesFeatures;
    });
  }, [query, selected]);

  const handleToggle = (feature: FeatureTag) => {
    setSelected((prev) =>
      prev.includes(feature)
        ? prev.filter((item) => item !== feature)
        : [...prev, feature]
    );
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-5 py-12 lg:py-16">
      <section className="rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-slate-900 p-[1px] shadow-xl">
        <div className="flex flex-col gap-8 rounded-3xl bg-white/95 p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-primary-700">
            {heroBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full bg-primary-100/80 px-3 py-2"
              >
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              می‌خوای بدونی کجا می‌تونی از روی عکس ویدیو بسازی؟
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              این راهنما بهترین سرویس‌های ساخت ویدیو با هوش مصنوعی را برای کاربران فارسی‌زبان جمع
              کرده است. ابزارها را بر اساس نیازت فیلتر کن، مراحل شروع را ببین و در چند دقیقه اولین
              ویدیوی خودت را بساز.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="جستجو بر اساس نام ابزار، قابلیت یا کاربرد..."
            />
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              ابتدا ابزارها را با گزینه‌های کلیدی فیلتر کن تا بهترین گزینه برای ساخت ویدیو از تصویر را پیدا
              کنی.
            </div>
          </div>
          <FeatureFilter features={featureOptions} selected={selected} onToggle={handleToggle} />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">ابزارهای پیشنهادی</h2>
            <p className="text-sm text-slate-500">
              {selected.includes('image-to-video')
                ? 'هر کدام از این پلتفرم‌ها امکان ساخت ویدیو از تصویر را دارند. جزئیات را چک کن و مستقیم وارد صفحه ساخت شو.'
                : 'بر اساس جستجو و فیلترهای انتخابی، این گزینه‌ها به نیاز تو نزدیک هستند.'}
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            {filteredTools.length} ابزار یافت شد
          </span>
        </div>

        <LayoutGroup>
          <div className="grid gap-6 lg:grid-cols-2">
            <AnimatePresence mode="sync">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm text-slate-500"
          >
            هیچ ابزاری با فیلترهای فعلی پیدا نشد. فیلترها را تغییر بده یا جستجو را پاک کن.
          </motion.div>
        )}
      </section>

      <section className="grid gap-8 rounded-3xl bg-white/80 p-10 shadow-lg shadow-slate-900/5 lg:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">چطور بهترین گزینه را انتخاب کنم؟</h3>
          <p className="text-sm leading-7 text-slate-600">
            قبل از شروع، هدف خروجی، بودجه، و تجربه فنی خودت را مشخص کن. اگر ویدیوی تبلیغاتی یا پرتره
            با کیفیت می‌خواهی، سراغ Runway یا Haiper برو. برای موشن‌های سریع شبکه‌های اجتماعی Pika یا
            Viggle مناسب‌تر است.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">نکات مهم برای نتیجه بهتر</h3>
          <ul className="list-disc space-y-2 pr-5 text-sm leading-6 text-slate-600">
            <li>تصویر مرجع را با رزولوشن بالا و نور مناسب آماده کن.</li>
            <li>در ابزارهایی مثل Runway از پرامپت متنی برای توضیح حرکت استفاده کن.</li>
            <li>اگر نتیجه ناواضح است، از گزینه‌های Seed متفاوت یا Upscale استفاده کن.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">گزینه‌های جایگزین</h3>
          <p className="text-sm leading-7 text-slate-600">
            اگر نیاز به کنترل کامل روی تولید داری، از ترکیب Stable Diffusion (تصویر) و AnimateDiff یا
            Deforum استفاده کن و خروجی را در ابزارهایی مثل After Effects نهایی کن. برای استفاده موبایل،
            Motionleap سریع‌ترین نتیجه را می‌دهد.
          </p>
        </div>
      </section>
    </main>
  );
}
