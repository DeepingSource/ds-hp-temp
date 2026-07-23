import Link from 'next/link';
import { Eye, MessageSquare, Bell, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import type { Locale } from '@/lib/i18n';
import siteContent from '@/data/generated/site-content.json';

/**
 * AgentEvolutionSection — the Viewer → Interactive → Proactive story on the
 * saai agent product page (PLAN_SA_AGENTIC_ROLES_v2 §4.1).
 *
 * This is deliberately framed as the evolution of what the CUSTOMER gets, not
 * as a technical explanation — the "why we build it this way" half lives at
 * /technology/agentic-ai. The third rung links to #proactive (the action-card
 * mockup further down the page) so the direction is shown, not just claimed.
 */

type Stage = { tag: string; title: string; desc: string };
type Copy = {
  evolutionEyebrow: string;
  evolutionHeading: string;
  evolutionSub: string;
  evolutionProactiveCta: string;
  evolution: Stage[];
};

const SA = siteContent.storeAgent as Record<Locale, Copy>;

/** Order matches content/site/store-agent.yaml `evolution`. */
const STAGE_ICONS = [Eye, MessageSquare, Bell] as const;

export default function AgentEvolutionSection({ locale }: { locale: Locale }) {
  const t = SA[locale];

  return (
    <Section variant="alt" pad="default">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-3">{t.evolutionEyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl">
            {t.evolutionHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed break-keep text-gray-600">
            {t.evolutionSub}
          </p>
        </div>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.evolution.map((stage, i) => {
            const Icon = STAGE_ICONS[i] ?? Eye;
            const isCurrent = i === 1;
            const isNext = i === 2;
            return (
              <li
                key={stage.title}
                className={`flex flex-col rounded-2xl border p-7 ${
                  isCurrent ? 'border-primary bg-white shadow-md' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-xl p-2.5 ${
                      isCurrent ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isCurrent
                        ? 'bg-primary/10 text-primary'
                        : 'border border-gray-200 text-gray-500'
                    }`}
                  >
                    {stage.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold break-keep text-gray-900">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed break-keep text-gray-600">
                  {stage.desc}
                </p>
                {isNext && (
                  <Link
                    href="#proactive"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {t.evolutionProactiveCta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
