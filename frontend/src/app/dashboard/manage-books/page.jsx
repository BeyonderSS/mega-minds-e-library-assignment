import { Suspense } from "react";
import { BookList } from "@/components/Books/BookList";
import { BookSearch } from "@/components/Books/BookSearch";
import CategoryList from "@/components/Category/CategoryList";
import { BookListSkeleton } from "@/components/Books/BookListSkeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { session } from "@/app/actions/auth";

export default async function ManageBooks({ searchParams }) {
  const sessionData = await session();
  const { title, author, genre, categorySlug } = await searchParams;
  return (
    <div className="  mx-4 md:my-4 space-y-8">
      <div className="flex justify-between flex-col md:flex-row gap-4">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Browse Your Books
          </h1>
          <p className="text-muted-foreground">
            Explore and manage books posted by you.
          </p>
        </div>
        <Link
          href={"/dashboard/manage-books/post-book"}
          className="cursor-pointer"
        >
          <Button>
            {" "}
            <Plus /> Create Post
          </Button>
        </Link>
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
              userId={sessionData?.user.id}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
