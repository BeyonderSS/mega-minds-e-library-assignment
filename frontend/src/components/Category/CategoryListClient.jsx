// components/CategoryListClient.js
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryListClient({ categories }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategorySlug =
    searchParams.get("categorySlug") ||
    (pathname.startsWith("/dashboard/browse/") ? pathname.split("/")[3] : null);

  const handleCategoryClick = (slug) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("categorySlug", slug);
    } else {
      params.delete("categorySlug");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>
      <div className="space-y-1">
        <button
          onClick={() => handleCategoryClick(null)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
            !currentCategorySlug && "bg-accent text-accent-foreground"
          )}
        >
          <BookOpen className="h-4 w-4" />
          All Books
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category.slug)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              currentCategorySlug === category.slug &&
                "bg-accent text-accent-foreground"
            )}
          >
            <BookOpen className="h-4 w-4" />
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
