export default function AuroraBackground() {
  return (
    <>
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/15 blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" aria-hidden="true" />
    </>
  );
}
