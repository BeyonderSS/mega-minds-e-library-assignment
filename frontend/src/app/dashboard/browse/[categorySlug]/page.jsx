import { Suspense } from "react";
import { BookList } from "@/components/Books/BookList";
import { BookSearch } from "@/components/Books/BookSearch";
import { BookListSkeleton } from "@/components/Books/BookListSkeleton";
import CategoryList from "@/components/Category/CategoryList";

export default function CategoryPage({ params, searchParams }) {
  const { categorySlug } = params;
  const title = searchParams.title;
  const author = searchParams.author;
  const genre = searchParams.genre;

  // Format category name for display (e.g., "science-fiction" -> "Science Fiction")
  const categoryName = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {categoryName} Books
        </h1>
        <p className="text-muted-foreground">
          Browse our collection of {categoryName.toLowerCase()} books
        </p>
      </div>

      <BookSearch />

      <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        <div className="md:w-1/4">
          <CategoryList />
        </div>
        <div className="md:w-3/4">
          <Suspense fallback={<BookListSkeleton />}>
            <BookList
              title={title}
              author={author}
              genre={genre}
              categorySlug={categorySlug}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
