'use client';

import { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
  idPrefix,
}: AccordionItemProps & { index: number; idPrefix: string }) {
  const btnId = `${idPrefix}-btn-${index}`;
  const panelId = `${idPrefix}-panel-${index}`;
  return (
    <div className={`transition-colors duration-200 ${isOpen ? 'bg-primary-lighter/30' : ''}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-5 px-5 sm:px-6 flex items-start justify-between gap-4 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={btnId}
      >
        <span
          className={`text-[15px] leading-relaxed break-keep transition-colors ${
            isOpen ? 'font-semibold text-primary' : 'font-medium text-gray-900 group-hover:text-primary'
          }`}
        >
          {question}
        </span>
        <span
          className={`shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 ${
            isOpen
              ? 'bg-primary text-white rotate-180'
              : 'bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'
          }`}
          aria-hidden="true"
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 text-[15px] text-gray-600 leading-relaxed break-keep">{answer}</div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: React.ReactNode }[];
  idPrefix?: string;
}

export default function Accordion({ items, idPrefix = 'accordion' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card divide-y divide-gray-100">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          index={index}
          idPrefix={idPrefix}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
