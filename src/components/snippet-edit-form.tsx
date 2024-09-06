"use client";

// library imports
import { Snippet } from "@prisma/client";
import { useState } from "react";

// components
import EditableText from "./editable-text";
import { Editor, type Monaco } from "@monaco-editor/react";

// actions
import * as actions from "@/actions";
import { useFormState } from "react-dom";

/// Interface of SnippetEditForm
interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [formState, action] = useFormState(actions.editSnippet, {
    message: "",
  });
  const [title, setTitle] = useState(snippet.title);
  const [code, setCode] = useState(snippet.code);

  const handleCodeChange = (value: string = "") => {
    setCode(value);
  };

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Snippet</h1>

      {/* Editor */}
      <div className="w-full flex flex-col mt-4 border border-gray-300 rounded-md`">
        <div className="bg-gray-200 rounded-t-md flex justify-between items-center px-4 py-2">
          <form action={action}>
            <input type="hidden" name="id" value={snippet.id} />
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="code" value={code} />

            <button
              type="submit"
              className="text-gray-500 hover:text-white text-xs bg-white hover:bg-green-400 rounded-full px-3 py-1 cursor-pointer transition-all duration-300"
            >
              Update
            </button>
          </form>

          {/* Title */}
          <EditableText text={title} setText={setTitle} />

          {/* buttons for mac like look */}
          <div className="flex flex-row-reverse gap-2">
            <div className="h-4 w-4 bg-red-600 rounded-full"></div>
            <div className="h-4 w-4 bg-yellow-600 rounded-full"></div>
            <div className="h-4 w-4 bg-green-600 rounded-full"></div>
          </div>
        </div>

        {/* Editor */}
        <Editor
          height="40vh"
          defaultLanguage="typescript"
          theme="vs-light"
          value={snippet.code}
          options={{
            minimap: { enabled: false },
          }}
          onChange={handleCodeChange}
          beforeMount={handleEditorDidMount}
        />
      </div>

      {formState.message && (
        <div className="bg-red-500 text-white p-4 rounded-md mt-4">
          {formState.message}
        </div>
      )}
    </div>
  );
}
