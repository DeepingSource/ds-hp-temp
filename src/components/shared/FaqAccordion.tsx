import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/lib/faq-data';

export default function FaqAccordion({ faqs }: { faqs: FAQItem[] }) {
  return (
    <div className="divide-y divide-gray-100">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex items-center justify-between cursor-pointer list-none">
            <h3 className="text-base font-semibold text-gray-900 pr-4">
              {faq.question}
            </h3>
            <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-3 text-sm text-gray-500 leading-relaxed">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
