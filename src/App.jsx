import { useState } from "react";
import { AlertTriangle, BookOpen, CalendarDays, CheckCircle2, ClipboardCheck, LogOut, ShieldCheck } from "lucide-react";
import { AuthProvider, useAuth } from "./core/AuthContext";
import Login from "./core/Login";
import { Card, PageHeader } from "./core/ui";

const navItems = [
  { id: "onboarding", label: "Opplæring", description: "Kom i gang", icon: BookOpen },
  { id: "sjekklister", label: "Sjekklister", description: "Daglig drift", icon: ClipboardCheck },
  { id: "avvik", label: "Avvik", description: "Meld fra", icon: AlertTriangle },
];

function getToday() {
  return new Intl.DateTimeFormat("nb-NO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).format(new Date());
}

function Navigation({ activeTab, setActiveTab, mobile = false }) {
  return (
    <nav className={mobile ? "flex w-full justify-around gap-1" : "space-y-1"} aria-label="Hovedmeny">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            aria-current={active ? "page" : undefined}
            className={mobile
              ? `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold transition-colors ${active ? "bg-blue-50 text-[#0A1E6E]" : "text-slate-500 hover:bg-slate-50"}`
              : `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${active ? "bg-[#0A1E6E] text-white" : "text-slate-600 hover:bg-blue-50 hover:text-[#0A1E6E]"}`}
          >
            <Icon size={mobile ? 20 : 19} strokeWidth={active ? 2.4 : 2} />
            <span className={mobile ? "truncate" : "flex-1"}>{item.label}</span>
            {!mobile && <span className={`text-xs ${active ? "text-blue-100" : "text-slate-400"}`}>{item.description}</span>}
          </button>
        );
      })}
    </nav>
  );
}

function MainSystem() {
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("onboarding");
  if (!user) return <Login />;

  const activeItem = navItems.find((item) => item.id === activeTab);
  const displayName = user.email?.split("@")[0] || "frivillig";

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-24 text-slate-800 lg:pb-0">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}hak-logo.png`} alt="Hvittingfoss Alpinklubb" className="h-12 w-auto object-contain" />
            <div className="hidden min-w-0 border-l border-slate-200 pl-3 sm:block">
              <p className="truncate text-sm font-bold text-[#0A1E6E]">HMS-portal</p>
              <p className="text-xs text-slate-500">Frivillig og sikkerhet</p>
            </div>
          </div>
          <button type="button" onClick={logout} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[#0A1E6E] transition-colors hover:bg-red-50 hover:text-[#D90416] focus:outline-none focus:ring-2 focus:ring-[#D90416]" title="Logg ut">
            <LogOut size={18} /><span className="hidden sm:inline">Logg ut</span>
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 lg:px-8 lg:py-10">
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Meny</p>
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </aside>

        <main className="min-w-0">
          <Card className="mb-6 overflow-hidden border-[#dfe5f0] p-0">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#D90416]"><CalendarDays size={16} />{getToday()}</p>
                <h1 className="text-2xl font-bold tracking-tight text-[#0A1E6E] sm:text-3xl">Velkommen, {displayName}</h1>
                <p className="mt-2 text-sm text-slate-600">Her finner du det du trenger for en trygg og god dag i bakken.</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-[#0A1E6E]"><ShieldCheck size={17} /><span>{isAdmin ? "Admin" : "Frivillig"}</span></div>
            </div>
          </Card>

          <PageHeader title={activeItem.label} description={activeItem.description} />

          {activeTab === "onboarding" && <Card><div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A1E6E]"><BookOpen size={22} /></div><h2 className="text-lg font-bold text-[#0A1E6E]">Onboarding & opplæring</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Få oversikt over rutiner, ansvar og det viktigste du trenger før du starter vakten.</p></Card>}
          {activeTab === "sjekklister" && <Card><div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A1E6E]"><CheckCircle2 size={22} /></div><h2 className="text-lg font-bold text-[#0A1E6E]">Daglige sjekklister</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Gå gjennom sjekklistene for bakke og heis, og dokumenter at dagens rutiner er fulgt.</p></Card>}
          {activeTab === "avvik" && <Card><div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#D90416]"><AlertTriangle size={22} /></div><h2 className="text-lg font-bold text-[#0A1E6E]">Avviksmelding</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Meld inn hendelser, feil eller andre forhold som bør følges opp av klubben.</p></Card>}
        </main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white px-2 py-2 lg:hidden"><Navigation activeTab={activeTab} setActiveTab={setActiveTab} mobile /></div>
    </div>
  );
}

export default function App() {
  return <AuthProvider><MainSystem /></AuthProvider>;
}
