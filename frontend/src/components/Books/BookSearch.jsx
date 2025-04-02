"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function BookSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [author, setAuthor] = useState(searchParams.get("author") || "");
  const [selectedGenres, setSelectedGenres] = useState(
    searchParams.get("genre")?.split(",").filter(Boolean) || []
  );
  const [genreInput, setGenreInput] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (title) {
      params.set("title", title);
    } else {
      params.delete("title");
    }

    if (author) {
      params.set("author", author);
    } else {
      params.delete("author");
    }

    if (selectedGenres.length > 0) {
      params.set("genre", selectedGenres.join(","));
    } else {
      params.delete("genre");
    }

    startTransition(() => {
      router.push(`/dashboard/browse?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setSelectedGenres([]);
    setGenreInput("");
    router.push("/dashboard/browse");
  };

  const addGenre = () => {
    if (genreInput && !selectedGenres.includes(genreInput)) {
      setSelectedGenres([...selectedGenres, genreInput]);
      setGenreInput("");
    }
  };

  const removeGenre = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="title"
              placeholder="Search by title..."
              className="pl-8"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="genre" className="text-sm font-medium">
              Genre
            </label>
            <div className="flex gap-2">
              <Input
                id="genre"
                placeholder="Enter genre..."
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
              />
              <Button onClick={addGenre}>
                <Plus />
              </Button>
            </div>

            {selectedGenres.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedGenres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeGenre(genre)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {genre}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Author
            </label>
            <Input
              id="author"
              placeholder="Search by author..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </div>
  );
}
