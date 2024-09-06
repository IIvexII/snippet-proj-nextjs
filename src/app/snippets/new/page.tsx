import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnippetsCreatePage() {
  async function createSnippet(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center gap-8 w-1/3 mx-auto h-screen">
      <h1 className="text-2xl font-bold text-center">Create Snippet</h1>
      <form className="flex flex-col gap-4" action={createSnippet}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="border border-gray-300 rounded-md p-2"
        />
        <textarea
          name="code"
          placeholder="Code"
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
