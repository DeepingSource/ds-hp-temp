'use client';

import { useState, useCallback } from 'react';

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
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full py-5 flex items-center justify-between text-left group transition-colors duration-200 rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${isOpen ? 'pl-3 border-l-2 border-primary' : 'pl-0 border-l-2 border-transparent hover:pl-3 hover:border-primary/30'
          }`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={btnId}
      >
        <span className={`pr-4 transition-colors ${isOpen ? 'font-medium text-primary' : 'font-medium text-gray-900 group-hover:text-primary'
          }`}>
          {question}
        </span>
        <span
          className={`text-xl text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''
            }`}
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
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
          <div className="text-gray-600 leading-relaxed pb-5">{answer}</div>
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
    <div>
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
