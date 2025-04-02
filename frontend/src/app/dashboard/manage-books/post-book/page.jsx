import { session } from "@/app/actions/auth";
import { PostBookForm } from "@/components/Books/PostBookForm";

export default async function PostBookPage() {
  // Fetch categories from the server
  try {
    const sessionData = await session()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const { data } = await response.json();
    console.log(data);
    return (
      <div className="container mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Post a Book</h1>
          <p className="text-muted-foreground">
            Share a book with the community by filling out the form below
          </p>
        </div>

        <PostBookForm categories={data} owner={sessionData?.user?.id}/>
      </div>
    );
  } catch (error) {
    return <div className="">There was an Error</div>;
  }
}
