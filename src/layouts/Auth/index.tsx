import { Outlet } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Logo from "../../components/Logo";
import AuthLinks from "./AuthLinks";

function Auth() {
  return (
    <PageContainer>
      <header className="text-black flex justify-between py-3 px-6 items-center h-[60px]">
        <Logo />
        <AuthLinks />
      </header>
      <div className="text-black flex items-center justify-center basis-full grow">
        <Outlet />
      </div>
    </PageContainer>
  );
}

export default Auth;
