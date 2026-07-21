export function BrandMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 23c6-1.2 10.5-4.5 14-10 1.4-2.2 2.8-3.6 4.6-3.6" />
      <path d="M17 9.4 22 5.5 20.4 11" />
      <circle cx="22" cy="5.8" r="1.2" fill="currentColor" stroke="none" />
      <path
        d="M3.5 23l3-1.6M9 23l3-1.6M14.5 23l3-1.6"
        opacity="0.45"
      />
    </svg>
  );
}
