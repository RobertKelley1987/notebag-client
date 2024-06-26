import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ChangeEvent, FormEvent } from "react";
import type { User } from "../../types";

type AuthPageProps = {
  heading: string;
  authFn: (user: User) => Promise<any>;
};

function AuthPage({ heading, authFn }: AuthPageProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  console.log(from);

  // If user navigates from login to register urls, reset form values.
  useEffect(() => {
    setError("");
    setForm({ email: "", password: "" });
  }, [location.pathname]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { accessToken, error } = await authFn(form);
    if (error) {
      const message = error.message ? error.message : "Something went wrong.";
      setError(message);
    } else {
      setAuth((prev) => {
        return { ...prev, accessToken };
      });
      navigate(from, { replace: true });
    }
  };

  return (
    <main className="basis-[275px] max-w-[400px] justify-center -translate-y-[30px]">
      {error && <p className="mb-4 text-red">{error}</p>}
      <h1 className="font-bold text-5xl lowercase mb-6">{heading}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="leading-4">
            Email
          </label>
          <input
            onChange={handleChange}
            value={form.email}
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
            value={form.password}
            type="password"
            name="password"
            id="password"
            className="text-black border border-black p-2 focus:outline-none"
          />
        </div>
        <button
          disabled={!form.email || !form.password}
          type="submit"
          className="font-semibold w-full p-3 mt-2 border border-black hover:cursor-pointer hover:bg-black hover:text-white disabled:opacity-50 disabled:hover:cursor-auto disabled:hover:bg-white disabled:hover:text-black"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default AuthPage;
