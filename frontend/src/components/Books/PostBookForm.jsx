"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import RichTextEditor from "../RichText/Editor";
import { toast } from "sonner";
import CreateCategoryDialog from "../Category/CreateCategoryDialog";
import { UploadButton } from "@/utils/uploadthing";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
});

export function PostBookForm({ categories, owner }) {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState("");
  const genres = [
    "Adventure",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical",
    "Biography",
    "Self-Help",
    "Educational",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      category: "",
      genres: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      toast.promise(
        async () => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...data,
                owner,
                coverImage:
                  coverImage ||
                  "/placeholder.svg?height=400&width=300&text=No+Cover",
              }),
            }
          );
          if (!response.ok) throw new Error("Failed to post book");
          router.push("/dashboard/browse");
        },
        {
          loading: "Posting...",
          success: "Book posted successfully!",
          error: "Failed to post book",
        }
      );
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
          <CardDescription>
            Fill in the details about the book you want to share
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                {...register("author")}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              onChange={(content) => setValue("description", content)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <div className="flex gap-2">
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CreateCategoryDialog />
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-3">
            <Label>Genres</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={genre}
                    onCheckedChange={() =>
                      setValue("genres", [...watch("genres"), genre])
                    }
                  />
                  <Label htmlFor={genre} className="text-sm font-normal">
                    {genre}
                  </Label>
                </div>
              ))}
            </div>
            {errors.genres && (
              <p className="text-red-500 text-sm">{errors.genres.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-32 w-24 overflow-hidden rounded-md border">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Book cover preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res.length > 0) {
                  setCoverImage(res[0].url);
                }
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/browse")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Book"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
