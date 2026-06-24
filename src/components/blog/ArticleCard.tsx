import { memo } from 'react';
import Link from 'next/link';
import {
  Newspaper, Snowflake, CloudRain, BarChart3,
  TrendingDown, LayoutGrid, Flower2, Lightbulb,
  Clock, ArrowRight,
  Gift, GraduationCap, Trophy, Heart, Sun, Sparkles,
  Thermometer, Zap, CreditCard, Coffee, Moon, Trash2,
  ShoppingCart, PiggyBank, Users, UserCheck, Eye, Bike,
  ChefHat, Building2, Handshake, Share2, Umbrella,
  ShieldCheck, Rocket,
  Leaf, BookOpen, Calendar, CalendarDays, MapPin,
  PartyPopper, Sparkle, Tag, Package, MessageCircle,
} from 'lucide-react';
import type { ArticleMeta } from '@/data/articles/types';
import { categoryMeta } from '@/data/articles/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Newspaper, Snowflake, CloudRain, BarChart3,
  TrendingDown, LayoutGrid, Flower2, Lightbulb, Clock,
  Gift, GraduationCap, Trophy, Heart, Sun, Sparkles,
  Thermometer, Zap, CreditCard, Coffee, Moon, Trash2,
  ShoppingCart, PiggyBank, Users, UserCheck, Eye, Bike,
  ChefHat, Building2, Handshake, Share2, Umbrella,
  ShieldCheck, Rocket,
  Leaf, BookOpen, Calendar, CalendarDays, MapPin,
  PartyPopper, Sparkle, Tag, Package, MessageCircle,
};

function ArticleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Newspaper;
  return <Icon className={className} />;
}

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  return `${month}/${day}`;
}

const categoryAccent: Record<string, { dot: string; iconBg: string; hoverBorder: string }> = {
  guide: { dot: 'bg-emerald-500', iconBg: 'bg-emerald-50', hoverBorder: 'group-hover:border-emerald-200' },
  'case-study': { dot: 'bg-primary', iconBg: 'bg-primary-lighter', hoverBorder: 'group-hover:border-primary-light' },
  insight: { dot: 'bg-violet-500', iconBg: 'bg-violet-50', hoverBorder: 'group-hover:border-violet-200' },
  weekly: { dot: 'bg-gray-400', iconBg: 'bg-gray-50', hoverBorder: 'group-hover:border-gray-200' },
};

export const ArticleCard = memo(function ArticleCard({ article }: { article: ArticleMeta }) {
  const meta = categoryMeta[article.category] ?? categoryMeta['insight'];
  const accent = categoryAccent[article.category] ?? categoryAccent['insight'];

  return (
    <Link
      href={`/storeagent/blog/${article.slug}`}
      className={`group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-[box-shadow,border-color] duration-300 cursor-pointer ${accent.hoverBorder}`}
    >
      <div className="p-5 sm:p-6">
        {/* Category + Date row */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
          <span className={`text-xs font-medium ${meta.color}`}>
            {meta.label}
          </span>
          <span className="text-gray-300" aria-hidden="true">&middot;</span>
          <span className="text-xs text-gray-500">{formatDate(article.date)}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug break-keep">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 break-keep">
          {article.excerpt}
        </p>

        {/* Footer: Tags + Read time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md truncate">
                #{tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs text-gray-500 shrink-0 ml-2">
            <Clock className="w-3 h-3" />
            {article.readTime}분
          </span>
        </div>
      </div>
    </Link>
  );
});

export const FeaturedArticleCard = memo(function FeaturedArticleCard({ article }: { article: ArticleMeta }) {
  const meta = categoryMeta[article.category] ?? categoryMeta['insight'];
  const accent = categoryAccent[article.category] ?? categoryAccent['insight'];

  return (
    <Link
      href={`/storeagent/blog/${article.slug}`}
      className={`group relative block bg-gray-50 rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-[box-shadow,border-color] duration-300 cursor-pointer ${accent.hoverBorder}`}
    >
      {/* Top accent strip */}
      <div className="h-1 bg-primary" />
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div className={`w-14 h-14 rounded-2xl ${accent.iconBg} flex items-center justify-center shrink-0`}>
              <ArticleIcon name={article.icon} className={`w-7 h-7 ${meta.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              {/* Meta line */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${meta.bgColor} ${meta.color}`}>
                  {meta.label}
                </span>
                <span className="text-xs text-gray-500">{formatDate(article.date)}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}분
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug break-keep">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                {article.excerpt}
              </p>

              {/* Tags + CTA */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2.5 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-primary px-4 py-2 rounded-lg group-hover:bg-primary-dark transition-colors shrink-0 ml-4 whitespace-nowrap">
                  읽기 <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});
