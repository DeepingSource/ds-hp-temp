/**
 * 가격/견적 폼 리드 제출 — 공유 `/api/contact` POST.
 *
 * 3개 가격 시뮬레이터 폼이 동일한 5-필드 페이로드로 POST 하므로 한 곳에 모은다.
 * 네트워크 오류는 삼키고(다음 시도 가능) 성공 여부만 boolean 으로 반환한다.
 * (Contact 페이지의 폼은 AbortController/타임아웃/에러 표시가 달라 이 헬퍼를 쓰지 않는다.)
 */

export interface QuoteRequestPayload {
  name: string;
  contact: string;
  storeCount: string;
  inquiryType: string;
  message: string;
}

export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    // 네트워크 오류 — 다음 시도 가능
    return false;
  }
}
