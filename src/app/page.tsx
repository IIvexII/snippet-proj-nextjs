import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  // Render snippets
  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="px-6 py-4 flex items-center justify-between gap-2 border border-gray-300 rounded-md group hover:bg-gray-100 transition-colors"
      >
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className=" bg-blue-500 group-hover:bg-blue-600 text-white rounded-md px-4 py-2">
          View
        </div>
      </Link>
    );
  });

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col justify-center h-screen">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Snippet Project</h1>
        <Link
          href="/snippets/new"
          className="bg-blue-500 text-center text-white w-10 h-10 rounded-md text-3xl hover:bg-blue-600"
        >
          +
        </Link>
      </div>
      <div className="flex flex-col gap-3">{renderedSnippets}</div>
    </div>
  );
}
