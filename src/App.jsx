import { useState } from "react";
import { AuthProvider, useAuth } from "./core/AuthContext";
import Login from "./core/Login";
import { ClipboardCheck, AlertTriangle, BookOpen, LogOut, ShieldCheck } from "lucide-react";

function MainSystem() {
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("onboarding");

  // Vis innloggingsskjerm hvis brukeren ikke er logget inn
  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Toppmeny */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-slate-900">Hvittingfoss Alpinklubb</h1>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{user.email}</span>
            {isAdmin && (
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <ShieldCheck size={12} /> Admin
              </span>
            )}
          </div>
        </div>
        <button onClick={logout} className="p-2 text-slate-500 hover:text-red-600" title="Logg ut">
          <LogOut size={20} />
        </button>
      </header>

      {/* Hovedinnhold (Her bytter vi mellom de isolerte modulene) */}
      <main className="max-w-2xl mx-auto p-4">
        {activeTab === "onboarding" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-2">Onboarding & Opplæring</h2>
            <p className="text-slate-600">Her kommer modulen for frivillige.</p>
          </div>
        )}

        {activeTab === "sjekklister" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-2">Daglige sjekklister</h2>
            <p className="text-slate-600">Her kommer sjekklistene for bakke og heis.</p>
          </div>
        )}

        {activeTab === "avvik" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-2">Avviksmelding</h2>
            <p className="text-slate-600">Her kan frivillige melde inn hendelser og feil.</p>
          </div>
        )}
      </main>

      {/* Fast bunnmeny tilpasset mobil */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2 px-1 z-20">
        <button
          onClick={() => setActiveTab("onboarding")}
          className={`flex flex-col items-center p-2 rounded-xl flex-1 ${
            activeTab === "onboarding" ? "text-blue-600 font-semibold" : "text-slate-500"
          }`}
        >
          <BookOpen size={24} />
          <span className="text-xs mt-1">Opplæring</span>
        </button>

        <button
          onClick={() => setActiveTab("sjekklister")}
          className={`flex flex-col items-center p-2 rounded-xl flex-1 ${
            activeTab === "sjekklister" ? "text-blue-600 font-semibold" : "text-slate-500"
          }`}
        >
          <ClipboardCheck size={24} />
          <span className="text-xs mt-1">Sjekklister</span>
        </button>

        <button
          onClick={() => setActiveTab("avvik")}
          className={`flex flex-col items-center p-2 rounded-xl flex-1 ${
            activeTab === "avvik" ? "text-blue-600 font-semibold" : "text-slate-500"
          }`}
        >
          <AlertTriangle size={24} />
          <span className="text-xs mt-1">Avvik</span>
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainSystem />
    </AuthProvider>
  );
}
