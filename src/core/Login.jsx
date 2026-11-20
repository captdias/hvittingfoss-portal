import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Mountain } from "lucide-react";

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
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center px-6">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-3 rounded-full text-white mb-3">
            <Mountain size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Hvittingfoss Alpinklubb</h1>
          <p className="text-slate-500 text-sm">Sikkerhetsstyring & Frivilligportal</p>
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
              className="w-full h-12 px-4 rounded-xl border border-slate-300 text-base focus:outline-none focus:border-blue-600"
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
              className="w-full h-12 px-4 rounded-xl border border-slate-300 text-base focus:outline-none focus:border-blue-600"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Logg inn
          </button>
        </form>
      </div>
    </div>
  );
}
