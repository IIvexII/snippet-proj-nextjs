"use client";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

export default function SnippetsCreatePage() {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });

  return (
    <div className="flex flex-col justify-center gap-8 w-1/3 mx-auto h-screen">
      <h1 className="text-2xl font-bold text-center">Create Snippet</h1>
      <form className="flex flex-col gap-4" action={action}>
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

        <h1>{formState.message}</h1>
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
