export function PairedRails() {
  return (
    <svg className="paired-rails" viewBox="0 0 180 34" role="img" aria-label="Two paths connecting">
      <path d="M2 9h72l18 16h86" className="device-line" />
      <path d="M2 25h70L90 9h88" className="device-line device-line-offset" />
      <circle cx="90" cy="17" r="3.5" className="device-point" />
    </svg>
  );
}

export function RouteLine({ className = "" }: { className?: string }) {
  return (
    <svg className={`route-line ${className}`} viewBox="0 0 92 22" aria-hidden>
      <path d="M1 11h28l9-8 16 16 10-8h18" className="device-line" />
      <circle cx="87" cy="11" r="4" className="device-point" />
    </svg>
  );
}

export function InterruptedLine({ className = "" }: { className?: string }) {
  return (
    <svg className={`interrupted-line ${className}`} viewBox="0 0 150 24" aria-hidden>
      <path d="M1 12h52l8-8 15 16 9-8h64" className="device-line" />
      <path d="M59 6l17 14" className="device-break" />
    </svg>
  );
}