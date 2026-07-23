'use client';

import { createContext, useContext, useState, useCallback, useEffect, Suspense, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { DiagnosisPreset } from './useDiagnosisEngine';
import DiagnosisModal from './DiagnosisModal';

interface DiagnosisContextType {
  isOpen: boolean;
  preset?: DiagnosisPreset;
  openDiagnosis: (preset?: DiagnosisPreset) => void;
  closeDiagnosis: () => void;
}

const DiagnosisContext = createContext<DiagnosisContextType | null>(null);

/**
 * URL(?diagnosis=1) 동기화 전용 자식.
 *
 * ⚠️ useSearchParams()는 정적 렌더링에서 "가장 가까운 Suspense 경계 전체"를
 * 프리렌더에서 제외시킨다. 이 훅을 Provider 본체에서 호출하면 Provider를 감싼
 * 경계 = 헤더·main·푸터 전부가 서버 HTML에서 사라진다(실측: 헤더 링크 37→0,
 * footer 소실). 그래서 파라미터 읽기만 이 말단 컴포넌트로 격리하고, 여기만
 * 자체 Suspense로 감싼다 — 나머지 페이지는 정상적으로 프리렌더된다.
 */
function DiagnosisUrlSync({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const hasParam = searchParams.get('diagnosis') === '1';
    if (hasParam !== isOpen) setIsOpen(hasParam);
  }, [searchParams, isOpen, setIsOpen]);
  return null;
}

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<DiagnosisPreset | undefined>(undefined);

  const openDiagnosis = useCallback(
    (newPreset?: DiagnosisPreset) => {
      setPreset(newPreset);
      setIsOpen(true);

      const params = new URLSearchParams(window.location.search);
      if (params.get('diagnosis') !== '1') {
        params.set('diagnosis', '1');
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState(null, '', newUrl);
      }
    },
    [],
  );

  const closeDiagnosis = useCallback(() => {
    setIsOpen(false);

    const params = new URLSearchParams(window.location.search);
    if (params.has('diagnosis')) {
      params.delete('diagnosis');
      const queryString = params.toString();
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;
      window.history.pushState(null, '', newUrl);
    }
  }, []);

  return (
    <DiagnosisContext.Provider value={{ isOpen, preset, openDiagnosis, closeDiagnosis }}>
      <Suspense fallback={null}>
        <DiagnosisUrlSync isOpen={isOpen} setIsOpen={setIsOpen} />
      </Suspense>
      {children}
      <DiagnosisModal isOpen={isOpen} preset={preset} onClose={closeDiagnosis} />
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return context;
}
