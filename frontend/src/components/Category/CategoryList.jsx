// components/CategoryListServer.js
import { CategoryListClient } from "./CategoryListClient";

export default async function CategoryList() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch categories");
    const { data } = await res.json();
    return <CategoryListClient categories={data} />;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
