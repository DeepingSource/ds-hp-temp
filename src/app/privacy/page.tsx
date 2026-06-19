import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | SAAI',
  description: 'SAAI 개인정보 처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-8">개인정보 처리방침</h1>

          <div className="space-y-12 text-gray-600 leading-relaxed text-sm sm:text-base break-keep">
            <section className="space-y-4">
              <p>
                &apos;주식회사 딥핑소스&apos;(이하 &apos;회사&apos;)가 운영하는 &apos;SAAI(Store AI)&apos;은(는) 개인정보보호법 제30조 의거 이용자의 개인정보보호와 권익을 보호하고 관련된 고충 및 애로사항을 신속하게 처리하기 위해 아래의 개인정보처리방침을 제정·운영하고 있습니다.
              </p>
              <p>
                회사는 관계법령에서 규정하고 있는 책임과 의무를 준수하고 실천하기 위해 최선의 노력을 하고 있습니다.
              </p>
              <p className="font-semibold text-gray-900 mt-6">시행일: 2026-03-10</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제1조 개인정보의 수집 및 이용에 관한 안내</h2>
              <p>회사는 아래와 같이 제공하는 서비스에 따라 개인정보의 수집목적, 항목, 보유 및 이용기간을 달리하여 서비스제공을 위하여 필요한 최소한의 개인정보를 수집하고 있습니다.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제2조 개인정보자동수집 장치의 설치와 운영거부에 관한 사항</h2>
              <p>회사는 서비스 이용과정에서 이용자로부터 다음과 같은 정보들이 자동으로 생성/수집되고 다음의 목적으로 이용될 수 있습니다.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600">
                <li><strong>관련법규의 준수:</strong> 회사는 관련법규의 준수를 위해 이용자의 접속기록(로그인)기록을 보관할 의무가 있습니다.</li>
                <li><strong>쿠키의 설치운영 및 거부 방법:</strong> 아래 방법을 통해 쿠키 저장을 거부할 수 있습니다.</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-2xl text-sm mt-4 space-y-2 text-gray-500">
                <p><strong>Internet Explorer:</strong> 웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정</p>
                <p><strong>Microsoft Edge:</strong> 웹브라우저 상단 메뉴 &gt; 설정 &gt; 고급 설정 보기 &gt; 쿠키 메뉴의 옵션 설정</p>
                <p><strong>Chrome:</strong> 웹브라우저 상단 메뉴 &gt; 설정 &gt; 고급 &gt; 콘텐츠 설정 &gt; 쿠키 메뉴의 옵션 설정</p>
                <p><strong>Chrome 모바일:</strong> 크롬 App &gt; 오른쪽상단 더보기 &gt; 방문 기록 인터넷 사용 기록 삭제 &gt; 기간선택 &gt; &apos;쿠키 및 사이트 데이터&apos;와 &apos;캐시된 이미지 또는 파일&apos; 옆의 체크박스를 선택 &gt; 인터넷 사용기록 삭제</p>
                <p><strong>Safari 모바일:</strong> Safari App &gt; 방문기록 및 웹사이트 데이터 지우기 &gt; 확인</p>
                <p><strong>Naver 모바일:</strong> Naver App &gt; 설정 &gt; 캐시삭제 + 인터넷 사용 기록 &gt; 쿠키삭제</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제3조 개인정보의 보유·이용기간 및 파기</h2>
              <p>회사는 수집한 개인정보는 이용자로부터 개인정보 수집 시에 동의 받은 개인정보 보유·이용기간 내 또는 관련법령에 따른 개인정보 보유·이용기간 내 처리하고 해당 목적이 달성 및 보유이용기간이 경과할 시에는 지체없이 해당 개인정보를 복구 또는 재생할 수 없는 방법으로 파기합니다.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제4조 개인정보 처리 위탁</h2>
              <p>회사는 원활한 개인정보 업무처리를 위하여 일부 개인정보처리업무를 위탁하고 있으며 위탁 계약 체결 시 관련법령에 따라 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다. 위탁업무의 내용이나 수탁자가 추가, 변경될 경우에는 지체 없이 관련 법령에 따른 사전 동의 안내 또는 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제5조 개인정보의 제3자 제공</h2>
              <p>회사는 정보주체의 개인정보를 &apos;제1조 개인정보의 수집 및 이용에 관한 안내&apos;에서 명시한 범위 내에서만 처리하며, 이용자의 별도 사전동의, 관련법령의 특별한 요구가 발생하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
              <p className="font-semibold text-gray-700 mt-2">관련법령에 근거한 사전동의 없는 제3자 제공안내:</p>
              <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                <li>통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우</li>
                <li>관계법령에 의하여 국가기관으로부터 요구받은 경우</li>
                <li>범죄에 대한 수사상의 목적이 있거나, 정보통신 윤리위원회의 요청이 있는 경우</li>
                <li>기타 관계법령에서 정한 절차에 따른 요청이 있는 경우</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제6조 개인정보의 국외이전</h2>
              <p>회사는 개인정보를 국외의 다른 사업자에게 제공하지 않습니다. 다만, 정보통신서비스의 제공에 관한 계약 이행 및 이용자 편의 증진 등을 위하여 다음과 같이 개인정보 처리 업무를 국외에 전송하고 있습니다.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제7조 개인정보의 안전성 확보조치</h2>
              <p>회사는 이용자의 개인정보를 안전하게 관리하여 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 최선을 다하고 있으며 필요한 기술적, 관리적 및 물리적 조치를 하고 있습니다.</p>
              <ul className="list-disc pl-5 space-y-3 text-gray-600 mt-4">
                <li><strong>개인정보 취급 직원의 최소화 및 교육:</strong> 개인정보를 취급하는 직원을 최소화하고, 주기적인 개인정보 보호 교육을 실시하여 개인정보를 관리하는 대책을 시행하고 있습니다.</li>
                <li><strong>내부관리계획의 수립 및 시행:</strong> 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</li>
                <li><strong>접속기록의 보관 및 위변조 방지:</strong> 개인정보 침해사고 발생 시 대응이 용이하도록 개인정보처리시스템에 접속한 기록(웹 로그, 요약정보 등)을 최소 1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.</li>
                <li><strong>개인정보의 암호화:</strong> 이용자의 개인정보는 암호화 되어 저장 및 관리되고 있습니다.</li>
                <li><strong>해킹 등에 대비한 기술적 대책:</strong> 회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 합니다. 또한 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</li>
                <li><strong>개인정보에 대한 접근통제 제한:</strong> 개인정보를 처리하는 개인정보처리시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위한 조치를 하고 있습니다.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제8조 이용자 및 법정대리인의 권리와 그 행사 방법</h2>
              <p>회사는 이용자(또는 법정대리인)의 개인정보 권리를 보호하기 위해 아래와 같이 행사 방법을 마련하고 있습니다.</p>

              <p className="font-semibold text-gray-700 mt-4">이용자의 권리 및 행사방법:</p>
              <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                <li>서면, 전자우편 등을 통하여 개인정보의 처리 정지 및 삭제를 요구할 수 있습니다.</li>
                <li>회사는 개인정보의 오류 등에 대한 정정 또는 삭제를 요청한 경우에는 정정 또는 삭제를 완료하기 전까지 당해 개인정보를 이용하거나 제공하지 않습니다.</li>
                <li>개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 당해 개인정보의 삭제를 요구할 수 없습니다.</li>
                <li>회사는 이용자 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인인지를 확인합니다.</li>
              </ol>

              <p className="font-semibold text-gray-700 mt-4">법정대리인의 권리 및 행사방법:</p>
              <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                <li>이용자의 법정대리인이나 위임을 받은 자 등 대리인이 이용자의 권리(열람, 정정, 처리정지, 삭제)를 행사하는 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출해야 합니다.</li>
                <li>회사는 이용자 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 정당한 대리인인지를 확인합니다.</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제9조 개인정보보호 책임자 및 이용자 권익침해에 대한 구제방법</h2>
              <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.</p>

              <div className="bg-gray-50 p-4 rounded-2xl mt-2 text-gray-700">
                <p className="font-semibold mb-2">개인정보보호 책임자</p>
                <p>성명: 김태훈</p>
                <p>직책: 대표이사</p>
                <p>연락처: <a href="mailto:contact@deepingsource.io">contact@deepingsource.io</a></p>
              </div>

              <p className="mt-4">이용자는 서비스를 이용하면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보보호책임자에게 문의하실 수 있습니다. 회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p>

              <p className="font-semibold text-gray-700 mt-6">권익침해 관련 도움받을 수 있는 기관:</p>
              <div className="space-y-4 mt-3">
                <div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-700">1. 개인정보 침해신고센터 (한국인터넷진흥원 운영)</p>
                  <p>소관업무: 개인정보 침해사실 신고, 상담 신청</p>
                  <p>홈페이지: privacy.kisa.or.kr</p>
                  <p>전화: (국번없이) 118</p>
                  <p>주소: (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-700">2. 개인정보 분쟁조정위원회</p>
                  <p>소관업무: 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)</p>
                  <p>홈페이지: www.kopico.go.kr</p>
                  <p>전화: (국번없이) 1833-6972</p>
                  <p>주소: (03171) 서울특별시 종로구 세종대로 209 정부서울청사 4층</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-700">3. 대검찰청 사이버범죄수사단</p>
                  <p>전화: 02-3480-3573</p>
                  <p>홈페이지: www.spo.go.kr</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-700">4. 경찰청 사이버안전국</p>
                  <p>전화: 182</p>
                  <p>홈페이지: cyberbureau.police.go.kr</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">제10조 개인정보처리방침 변경에 관한 사항</h2>
              <p>개인정보처리방침은 시행일로부터 적용되며, 관련법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 지체없이 홈페이지를 통하여 고지할 것입니다.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
