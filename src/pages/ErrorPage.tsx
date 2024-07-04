import PageContainer from "../components/PageContainer";

function ErrorPage() {
  return (
    <PageContainer>
      <div className="flex flex-col basis-full grow items-center justify-center">
        <main className="flex flex-col gap-3 items-center">
          <h1 className="font-display text-5xl">Oops!</h1>
          <p>An unexpected error occurred.</p>
        </main>
      </div>
    </PageContainer>
  );
}

export default ErrorPage;
