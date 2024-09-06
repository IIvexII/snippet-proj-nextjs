import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-between items-center p-8 text-xl">
      <Link className="font-bold" href="/">
        Home
      </Link>
      <nav className="flex gap-8">
        <Link href="/performance">Performance</Link>
        <Link href="/scalability">Scalibility</Link>
        <Link href="/reliability">Reliability</Link>
      </nav>
    </header>
  );
}
