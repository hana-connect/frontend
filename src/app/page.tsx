export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-white">
      <section className="space-y-6">
        <h1 className="text-heading-32-b">디자인 토큰 테스트</h1>

        <div className="rounded-2xl bg-brand-purple-1 px-5 py-4">
          <p className="text-title-20-sb">브랜드 버튼/배지 느낌</p>
        </div>

        <div className="rounded-2xl bg-brand-gradient-1 px-5 py-4">
          <p className="text-title-20-sb">그라디언트 카드</p>
        </div>

        <div className="space-y-2">
          <p className="text-body-16-m text-success">성공 메시지</p>
          <p className="text-body-16-m text-error">에러 메시지</p>
          <p className="text-body-16-m text-information">안내 메시지</p>
          <p className="text-body-16-m text-attention">주의 메시지</p>
          <p className="text-body-16-m text-grey-2">보조 텍스트</p>
        </div>
      </section>
    </main>
  );
}
