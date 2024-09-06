"use client";

import { useState } from "react";

export default function EditableText({ text, setText }) {
  const [isTitleClicked, setIsTitleClicked] = useState(false);

  return (
    <>
      {isTitleClicked ? (
        <div className="flex items-center gap-1">
          <input
            type="text"
            placeholder="Title"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
              setIsTitleClicked(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsTitleClicked(false);
              }
            }}
            className=" bg-transparent border-b border-gray-400 ring-0 focus:ring-0 focus:outline-none"
          />
        </div>
      ) : (
        <p
          className="text-gray-500 text-sm cursor-pointer"
          onClick={() => setIsTitleClicked(true)}
        >
          <abbr title={text} className="no-underline">
            {text.length > 26 ? `${text.slice(0, 26)}...` : text}
          </abbr>
        </p>
      )}
    </>
  );
}
