import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditPageProp {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage({ params }: SnippetEditPageProp) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div className="max-w-lg mx-auto h-screen flex flex-col justify-center">
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
