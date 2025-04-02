import { Suspense } from "react"
import { BookList } from "@/components/Books/BookList"
import { BookSearch } from "@/components/Books/BookSearch"
import  CategoryList  from "@/components/Category/CategoryList"
import { BookListSkeleton } from "@/components/Books/BookListSkeleton"

export default async function BrowsePage({ searchParams }) {
 
  const {title,author,genre,categorySlug} = await searchParams

  return (
    <div className="mx-4 md:my-4 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Browse Books</h1>
        <p className="text-muted-foreground">Discover new books and authors in our extensive collection</p>
      </div>

      <BookSearch />

      <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        <div className="md:w-1/4">
          <CategoryList />
        </div>
        <div className="md:w-3/4">
          <Suspense fallback={<BookListSkeleton />}>
            <BookList title={title} author={author} genre={genre} categorySlug={categorySlug} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

