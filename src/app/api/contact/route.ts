import { NextRequest } from 'next/server';
import { z } from 'zod';
import {
  getClientIp, isRateLimited, rateLimitResponse,
  sendSlackNotification, slackEscape, koreaTime,
  errorResponse, successResponse,
} from '@/lib/api-utils';

const contactSchema = z.object({
  name: z.string().min(1).max(50),
  contact: z.string().min(5).max(100),
  storeCount: z.string().min(1).max(10),
  affiliationType: z.string().min(1).max(20).optional(),
  brandName: z.string().max(50).optional(),
  product: z.enum(['StoreCare', 'StoreInsight', 'StoreAgent']).nullish(),
  plan: z.enum(['standard', 'premium', 'enterprise']).nullish(),
  inquiryType: z.string().max(30).optional(),
  message: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip, 'contact')) return rateLimitResponse();

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse('요청 형식을 확인해 주세요', 400);
  }

  try {
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? '입력값을 확인해주세요';
      return errorResponse(firstError, 400);
    }

    const { name, contact, storeCount, affiliationType, brandName, product, plan, inquiryType, message } = result.data;

    await sendSlackNotification(
      `🎯 새 상담 신청!\n\n*이름:* ${slackEscape(name)}\n*연락처:* ${slackEscape(contact)}\n*매장 수:* ${slackEscape(storeCount)}\n*소속:* ${affiliationType ? slackEscape(affiliationType) : '미선택'}\n*브랜드:* ${brandName ? slackEscape(brandName) : '미입력'}\n*제품:* ${product ? slackEscape(product) : '미선택'}\n*플랜:* ${plan ? slackEscape(plan) : '미선택'}\n*문의 유형:* ${inquiryType ? slackEscape(inquiryType) : '미선택'}\n*메시지:* ${message ? slackEscape(message) : '없음'}\n*시간:* ${koreaTime()}`,
    );

    return successResponse('상담 신청이 완료되었습니다');
  } catch (err) {
    console.error('[API] contact error:', err);
    return errorResponse('일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요', 500);
  }
}
