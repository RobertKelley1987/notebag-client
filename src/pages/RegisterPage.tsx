import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import users from "../services/users";
import PageContainer from "../components/PageContainer";
import Logo from "../components/Logo";
import type { ChangeEvent, FormEvent } from "react";

function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await users.register(form);
    if (user) {
      navigate("/");
    } else {
      setError("Something went wrong.");
    }
  };

  return (
    <PageContainer>
      <header className="text-black flex justify-between py-3 px-6 items-center h-[60px]">
        <Logo />
        <div className="flex gap-3">
          <Link to="/register">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </div>
      </header>
      <div className="text-black flex items-center justify-center basis-full grow">
        <main className="basis-[275px] max-w-[400px] justify-center -translate-y-[30px]">
          <h1 className="font-bold text-5xl lowercase mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="leading-4">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="text-black border border-black p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="leading-4">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="text-black border border-black p-2 focus:outline-none"
              />
            </div>
            <button
              disabled={!form.email || !form.password}
              type="submit"
              className="font-semibold w-full p-3 rounded-lg bg-blue-600 mt-2 hover:bg-blue-300 hover:cursor-pointer disabled:opacity-50 disabled:hover:cursor-auto disabled:hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
    </PageContainer>
  );
}

export default RegisterPage;
