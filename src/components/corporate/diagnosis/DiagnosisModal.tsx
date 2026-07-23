'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { DiagnosisPreset } from './useDiagnosisEngine';
import DiagnosisConversation from './DiagnosisConversation';

interface DiagnosisModalProps {
  isOpen: boolean;
  preset?: DiagnosisPreset;
  onClose: () => void;
  locale?: Locale;
}

export default function DiagnosisModal({
  isOpen,
  preset,
  onClose,
  locale = 'ko',
}: DiagnosisModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key press & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnosis-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl h-full sm:h-[85vh] sm:max-h-[720px] bg-gray-50 sm:rounded-3xl shadow-2xl border border-gray-200/80 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-150 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <h2 id="diagnosis-modal-title" className="text-sm font-bold text-gray-900">
              30초 문제 진단
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          <DiagnosisConversation locale={locale} preset={preset} compact />
        </div>
      </div>
    </div>
  );
}
