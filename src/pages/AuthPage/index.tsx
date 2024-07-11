import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AxiosError } from "axios";
import type { ChangeEvent, FormEvent } from "react";
import type { User } from "../../types";

type AuthPageProps = {
  heading: string;
  authFn: (user: User) => Promise<any>;
};

function AuthPage({ heading, authFn }: AuthPageProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // If user navigates between login and register urls, reset form values.
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
    setIsLoading(true);

    try {
      const { accessToken } = await authFn(form);
      setAccessToken(accessToken);
      navigate(from, { replace: true });
    } catch (error) {
      setIsLoading(false);

      let errorMessage = "Something went wrong.";
      if (error instanceof AxiosError) {
        const axiosError = error.response?.data.error.message;
        if (axiosError) errorMessage = axiosError;
      }
      setError(errorMessage);
    }
  };

  return (
    <main className="basis-[275px] max-w-[400px] justify-center -translate-y-[30px]">
      {error && <p className="mb-4 text-red">{error}</p>}
      <h1 className="font-bold text-5xl lowercase mb-6">{heading}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="leading-4 lowercase">
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
          <label htmlFor="password" className="leading-4 lowercase">
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
          disabled={!form.email || !form.password || isLoading}
          type="submit"
          className="lowercase font-semibold w-full p-3 mt-2 border border-black cursor-pointer hover:bg-aqua disabled:opacity-50 disabled:hover:cursor-auto disabled:bg-aqua disabled:hover:text-black"
        >
          {isLoading ? "Authorizing..." : "Submit"}
        </button>
      </form>
    </main>
  );
}

export default AuthPage;
