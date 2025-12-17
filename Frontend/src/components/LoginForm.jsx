import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const { VITE_BACKEND_URL, VITE_BACKEND_PORT } = import.meta.env;
  const BACKEND_ADDRESS = `${VITE_BACKEND_URL}:${VITE_BACKEND_PORT}`;

  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        name,
        surname,
        email,
        password,
        role: "user",
        phone: "123456789",
      };
      const res = await fetch(`${BACKEND_ADDRESS}/register`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => null);
        toast.error(`Rejestracja nie powiodła się: ${errText || res.status}`);
        return;
      }

      await res.json().catch(() => null);
      toast.success("Utworzono konto! Możesz się zalogować!");
      setIsRegistering(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(`Wystąpił błąd, spróbuj ponownie później`);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("Zalogowano");
    navigate("/");
    setUser({ email, password });
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-md p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl text-zinc-100">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
        {isRegistering
          ? "Zarejestruj się"
          : "Witaj ponownie"}
      </h2>
      <p className="text-zinc-400 mt-2 text-sm">
        {isRegistering
          ? "Utwórz nowe konto, aby zacząć."
          : "Zaloguj się na swoje konto."}
      </p>

      {!isRegistering ? (
        <form className="mt-8" onSubmit={handleLogin}>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-zinc-200"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="nazwa@przyklad.pl"
            className="w-full p-3 mb-4 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
          />

          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-zinc-200"
          >
            Hasło
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Hasło"
            value={password}
            className="w-full p-3 mb-4 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
          />

          <div className="text-right mb-8">
            <Link
              to={"/contact"}
              className="text-sm font-medium text-zinc-400 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Zapomniałeś hasła?
            </Link>
          </div>

          <button
            onClick={() => navigate("/")}
            type="submit"
            className="w-full py-3.5 font-bold text-zinc-950 bg-zinc-100 rounded-lg hover:bg-white hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-100 focus:ring-offset-zinc-900 transition-all shadow-lg"
          >
            Zaloguj się
          </button>

          <p className="text-center text-zinc-500 mt-8 text-sm">
            Nie masz konta?{" "}
            <button
              type="button"
              className="text-white font-semibold hover:underline"
              onClick={() => setIsRegistering(true)}
            >
              Zarejestruj się
            </button>
          </p>
        </form>
      ) : (
        <form className="mt-8" onSubmit={handleRegister}>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full sm:w-1/2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-zinc-200"
              >
                Imię
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                placeholder="Jan"
                value={name}
                required
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label
                htmlFor="surname"
                className="block mb-2 text-sm font-semibold text-zinc-200"
              >
                Nazwisko
              </label>
              <input
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                id="surname"
                name="surname"
                placeholder="Kowalski"
                value={surname}
                required
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
              />
            </div>
          </div>

          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-zinc-200"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            name="email"
            type="email"
            placeholder="nazwa@przyklad.pl"
            required
            className="w-full p-3 mb-4 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
          />

          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-zinc-200"
          >
            Hasło
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            type="password"
            placeholder="Stwórz silne hasło"
            required
            className="w-full p-3 mb-8 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 font-bold text-zinc-950 bg-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-100 focus:ring-offset-zinc-900 transition-all shadow-lg ${isSubmitting ? "opacity-60 cursor-not-allowed hover:scale-100 hover:bg-zinc-100" : "hover:bg-white hover:scale-[1.01]"}`}
          >
            {isSubmitting ? "Rejestrowanie..." : "Utwórz konto"}
          </button>

          <p className="text-center text-zinc-500 mt-8 text-sm">
            Masz już konto?{" "}
            <button
              type="button"
              className="text-white font-semibold hover:underline"
              onClick={() => setIsRegistering(false)}
            >
              Zaloguj się
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
