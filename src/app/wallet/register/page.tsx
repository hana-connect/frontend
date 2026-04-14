import RegisterFunnel from "./_components/register-funnel/register-funnel";

const RegisterPage = () => {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto flex min-h-screen w-[375px] max-w-full flex-col bg-white">
        <RegisterFunnel />
      </div>
    </main>
  );
};

export default RegisterPage;
