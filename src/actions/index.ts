"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editSnippet(
  _formState: { message: string },
  formData: FormData
) {
  const id = formData.get("id");
  const title = formData.get("title");
  const code = formData.get("code");

  // Validate title and code
  if (typeof id !== "string") {
    return { message: "Id is required" };
  }

  // find snippet by id
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return { message: "Snippet not found" };
  }

  if (typeof title !== "string" || title.length < 3) {
    return { message: "Title must be at least 3 characters" };
  }
  if (typeof code !== "string" || code.length < 10) {
    return {
      message: "Code must be at least 10 characters",
    };
  }

  try {
    // Update snippet
    await db.snippet.update({
      where: { id: snippet.id },
      data: { title, code },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "Something went wrong while updating snippet" };
    }
  }
  revalidatePath("/");
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath("/");
  redirect("/");
}

export async function createSnippet(
  _formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title");
  const code = formData.get("code");

  // Validate title and code
  if (typeof title !== "string" || title.length < 3) {
    return { message: "Title must be at least 3 characters" };
  }
  if (typeof code !== "string" || code.length < 10) {
    return {
      message: "Code must be at least 10 characters",
    };
  }

  try {
    // Create snippet
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "Something went wrong while creating snippet" };
    }
  }

  revalidatePath("/");
  redirect("/");

  return { message: "Successfully created snippet!" };
}
