import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button, Card } from "./ui";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch {
      setError("Feil e-post eller passord. Prøv igjen.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 px-6 py-10">
      <Card className="mx-auto w-full max-w-md p-8">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/hak-logo.png"
            alt="Hvittingfoss Alpinklubb"
            className="mb-5 h-auto w-full max-w-[260px] object-contain"
          />
          <p className="text-sm text-slate-500">Sikkerhetsstyring & Frivilligportal</p>
        </div>

        {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-post</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-base focus:border-[#0A1E6E] focus:outline-none focus:ring-2 focus:ring-[#D90416]/30"
              placeholder="navn@epost.no"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Passord</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-base focus:border-[#0A1E6E] focus:outline-none focus:ring-2 focus:ring-[#D90416]/30"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            Logg inn
          </Button>
        </form>
      </Card>
    </div>
  );
}
