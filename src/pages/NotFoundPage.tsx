import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";

function NotFoundPage() {
  return (
    <PageContainer>
      <div className="flex flex-col basis-full grow items-center justify-center">
        <main className="flex flex-col gap-3 items-center">
          <h1 className="font-sans font-bold text-5xl">404</h1>
          <p className="font-ibm">
            We could not find the page you were looking for.
          </p>
          <Link
            to="/"
            className="font-ibm p-3 mt-2 border border-black cursor-pointer hover:bg-aqua"
          >
            Return Home
          </Link>
        </main>
      </div>
    </PageContainer>
  );
}

export default NotFoundPage;
