export function HeroChart() {
  return (
    <svg
      viewBox="0 0 360 96"
      className="block h-[104px] w-full lg:h-[120px]"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c96442" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#c96442" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="76" x2="360" y2="76" stroke="#e8e6dc" strokeWidth="1" />
      <line x1="0" y1="52" x2="360" y2="52" stroke="#f0eee6" strokeWidth="1" />
      <line x1="0" y1="28" x2="360" y2="28" stroke="#f0eee6" strokeWidth="1" />
      <path
        d="M0 58 L36 50 L72 54 L108 34 L144 38 L180 24 L216 28 L252 16 L288 20 L324 12 L360 16 L360 96 L0 96 Z"
        fill="url(#heroChartFill)"
      />
      <path
        d="M0 58 L36 50 L72 54 L108 34 L144 38 L180 24 L216 28 L252 16 L288 20 L324 12 L360 16"
        fill="none"
        stroke="#d97757"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
