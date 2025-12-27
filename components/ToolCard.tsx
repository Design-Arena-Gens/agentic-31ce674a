'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CreatorTool } from '@/lib/tools';
import { useState } from 'react';

interface ToolCardProps {
  tool: CreatorTool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="flex flex-col gap-4 rounded-3xl bg-white/70 p-6 shadow-lg shadow-slate-900/5 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-slate-100">
            <Image
              fill
              sizes="48px"
              className="object-contain p-2"
              src={tool.icon}
              alt={`لوگو ${tool.name}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{tool.name}</h3>
            <p className="text-sm text-slate-500">{tool.pricing}</p>
          </div>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          ورود
        </a>
      </div>

      <p className="text-slate-600">{tool.description}</p>

      <div className="flex flex-wrap gap-2">
        {tool.featureTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700"
          >
            {featureLabel(tag)}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-900">نقاط قوت</h4>
        <ul className="list-disc space-y-1 pr-4 text-sm text-slate-600">
          {tool.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <motion.button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:border-primary-200"
        whileTap={{ scale: 0.98 }}
      >
        {expanded ? 'مخفی کردن مراحل' : 'مشاهده مراحل پیشنهادی'}
      </motion.button>

      {expanded && (
        <motion.ol
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="list-decimal space-y-2 pr-5 text-sm text-slate-600"
        >
          {tool.workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </motion.ol>
      )}
    </motion.article>
  );
}

function featureLabel(tag: string) {
  switch (tag) {
    case 'image-to-video':
      return 'ساخت ویدیو از تصویر';
    case 'text-to-video':
      return 'تبدیل متن به ویدیو';
    case 'animation':
      return 'انیمیت و موشن';
    case 'storyboarding':
      return 'استوری‌بورد و پیش‌تولید';
    case 'ai-assistant':
      return 'دستیار هوش مصنوعی';
    case 'free-plan':
      return 'پلن رایگان';
    default:
      return tag;
  }
}
