import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: '약관 및 정책 | DeepingSource',
  description: 'SAAI 이용약관 및 개인정보 처리방침 안내',
};

const documents = [
  {
    href: '/legal/privacy',
    title: '개인정보 처리방침',
    description: '이용자의 개인정보 수집·이용·보관 및 권리 행사 방법에 대한 안내입니다.',
    icon: Shield,
  },
  {
    href: '/legal/terms',
    title: '이용약관',
    description: '서비스 이용에 관한 회사와 이용자의 권리·의무 및 책임 사항을 규정합니다.',
    icon: FileText,
  },
];

export default function LegalIndexPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              약관 및 정책
            </h1>
            <p className="text-gray-600 leading-relaxed mb-12 break-keep">
              SAAI 서비스 이용과 관련된 약관 및 정책을 확인하실 수 있습니다.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <AnimatedSection key={doc.href}>
                  <Link
                    href={doc.href}
                    className="card group flex h-full flex-col p-6 transition-shadow hover:shadow-lg"
                  >
                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 break-keep">
                      {doc.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep flex-1">
                      {doc.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      자세히 보기
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
