import { forwardRef } from "react";

export const Card = ({ className = "", children, ...props }) => (
  <section
    className={`rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] ${className}`}
    {...props}
  >
    {children}
  </section>
);

export const Button = forwardRef(function Button(
  { variant = "primary", className = "", children, type = "button", ...props },
  ref,
) {
  const variantClasses =
    variant === "secondary"
      ? "border border-[#0A1E6E] bg-white text-[#0A1E6E] hover:bg-blue-50"
      : variant === "danger"
        ? "bg-[#D90416] text-white hover:bg-red-700"
        : "bg-[#0A1E6E] text-white hover:bg-blue-950";

  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#D90416] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export const PageHeader = ({ title, description, actions, className = "" }) => (
  <header className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${className}`}>
    <div>
      <h2 className="text-xl font-bold tracking-tight text-[#0A1E6E] sm:text-2xl">{title}</h2>
      {description && <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>}
    </div>
    {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
  </header>
);

