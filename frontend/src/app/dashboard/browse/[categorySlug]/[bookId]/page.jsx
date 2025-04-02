import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

async function getBook(bookId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/${bookId}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    if (!response.ok) {
      console.error("Failed to fetch book data", response.statusText);
      return null;
    }

    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}

export default async function BookPage({ params }) {
  const { bookId, categorySlug } = await params;
  const book = await getBook(bookId);

  if (!book) {
    notFound();
  }

  const formattedDate = book?.createdAt
    ? new Date(book.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  return (
    <div className="mb-4 md:mb-0 space-y-8 md:my-10 mx-4">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg border md:col-span-1">
          <Image
            src={book?.coverImage || "/placeholder.svg"}
            alt={book?.title || "Book Cover"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        <div className="space-y-6 md:col-span-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {book?.title || "Untitled"}
            </h1>
            <p className="mt-2 text-xl text-muted-foreground">
              by {book?.author || "Unknown Author"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {book?.genre?.length > 0 ? (
              book.genre.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary">No Genre</Badge>
            )}
          </div>

          <Separator />
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            {book?.description ? (
              <div dangerouslySetInnerHTML={{ __html: book?.description }} />
            ) : (
              <p className="text-muted-foreground">
                {"No description available."}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">
                Added by: {book?.owner?.name || "Unknown"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Added on: {formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Category: {book?.category?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
