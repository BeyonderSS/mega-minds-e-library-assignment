import { BookCard } from "@/components/Books/BookCard";
async function getBooks({ title, author, genre, categorySlug, userId }) {
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  if (author) params.append("author", author);
  if (genre) params.append("genre", genre);
  if (categorySlug) params.append("categorySlug", categorySlug);
  if (userId) params.append("userId", userId);

  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/search?${queryString}`;

  try {
    const response = await fetch(url, { cache: "no-store" });

    // Read the JSON body only once
    const data = await response.json();

    if (!response.ok) {
      console.log("Error response:", data);
    }

    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export async function BookList({ title, author, genre, categorySlug, userId }) {
  const books = await getBooks({ title, author, genre, categorySlug, userId });

  if (books.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No books found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            We couldn't find any books matching your search criteria. Try
            adjusting your filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
