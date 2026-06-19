import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Home, Zap, Eye, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 | DeepingSource',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* 404 number */}
        <p
          className="text-[8rem] sm:text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 mb-2 select-none"
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-slate-300 text-base mb-10 leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>

        {/* Primary CTA */}
        <Link
          href="/"
          className="btn-primary-dark gap-2 rounded-xl mb-8"
        >
          <Home className="w-4 h-4" />
          메인으로 돌아가기
        </Link>

        {/* Quick links */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          {[
            { href: '/storecare', label: 'STORECARE', icon: Eye, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
            { href: '/storeinsight', label: 'STOREINSIGHT', icon: TrendingUp, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
            { href: '/storeagent', label: 'STOREAGENT', icon: Zap, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border ${item.color} hover:scale-105 transition-transform duration-200`}
              >
                <Icon className={`w-5 h-5 ${item.color.split(' ')[0]}`} />
                <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
