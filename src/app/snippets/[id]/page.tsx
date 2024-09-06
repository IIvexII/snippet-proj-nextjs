import { db } from "@/db";
import { notFound } from "next/navigation";

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

  return (
    <div>
      <h1>{snippet.title}</h1>
    </div>
  );
}
