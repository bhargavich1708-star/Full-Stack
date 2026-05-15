"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export async function getBooks() {
  return await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function addBook(formData: FormData) {
  try {
    console.log("Adding book with data:", Object.fromEntries(formData.entries()));
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const description = formData.get("description") as string;
    const coverImage = formData.get("coverImage") as string;
    const rating = parseInt(formData.get("rating") as string) || 0;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        coverImage,
        rating,
        status: "WANT_TO_READ",
      },
    });
    console.log("Book created successfully:", book.id);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding book:", error);
    return { success: false, error: String(error) };
  }
}

export async function deleteBook(id: string) {
  await prisma.book.delete({
    where: { id },
  });
  revalidatePath("/");
}

export async function updateBookStatus(id: string, status: string) {
  await prisma.book.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/");
}
