import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as actions from "@/actions";

interface SnippetPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetPage({ params }: SnippetPageProps) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="max-w-2xl max-md:max-w-md mx-auto flex flex-col justify-center h-screen gap-2">
      <h1 className="text-4xl font-bold mb-12 text-center">Snippet</h1>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">{snippet.title}</h1>
        <div className="flex flex-row items-center gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      {/* show code block with line numbers */}
      <div className="bg-gray-100 p-4 rounded-md">
        {snippet.code.split("\n").map((line, index) => (
          <pre key={index}>
            <span className="select-none text-gray-500 border-r border-gray-300 pr-2 py-1">
              {index + 1}
            </span>{" "}
            {line}
          </pre>
        ))}
      </div>
    </div>
  );
}
