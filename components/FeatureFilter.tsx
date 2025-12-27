'use client';

import clsx from 'clsx';
import type { FeatureTag } from '@/lib/tools';

interface FeatureFilterProps {
  features: FeatureTag[];
  selected: FeatureTag[];
  onToggle: (feature: FeatureTag) => void;
}

export function FeatureFilter({ features, selected, onToggle }: FeatureFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {features.map((feature) => (
        <button
          key={feature}
          type="button"
          onClick={() => onToggle(feature)}
          className={clsx(
            'rounded-full border px-4 py-2 text-sm font-semibold transition',
            selected.includes(feature)
              ? 'border-primary-500 bg-primary-500 text-white shadow'
              : 'border-slate-200 bg-white/80 text-slate-600 hover:border-primary-200 hover:text-primary-700'
          )}
        >
          {featureLabel(feature)}
        </button>
      ))}
    </div>
  );
}

function featureLabel(tag: FeatureTag) {
  switch (tag) {
    case 'image-to-video':
      return 'ساخت ویدیو از تصویر';
    case 'text-to-video':
      return 'متن به ویدیو';
    case 'animation':
      return 'موشن و انیمیشن';
    case 'storyboarding':
      return 'پیش‌تولید و استوری‌بورد';
    case 'ai-assistant':
      return 'دستیار هوش مصنوعی';
    case 'free-plan':
      return 'پلن رایگان';
  }
}
