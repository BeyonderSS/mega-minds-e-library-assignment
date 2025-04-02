"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
});

function CreateCategoryDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    ).then(async (response) => {
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to create category");
      }
      return result;
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: (result) => {
        reset();
        setOpen(false);
        return `${result.name} category has been added`;
      },
      error: "Error",
    });
    router.refresh();
    setIsLoading(false);
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        <Plus />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              handleSubmit(onSubmit)(e);
            }}
          >
            <div className="space-y-4">
              <Input placeholder="Category Name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <Textarea
                placeholder="Description"
                {...register("description")}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateCategoryDialog;
