import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function BookCard({ book }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/dashboard/browse/${book.category.slug}/${book._id}`}>
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </CardHeader>
        {/* <CardContent className="p-4 pt-2">
        <div dangerouslySetInnerHTML={{__html:book.description}}/>
        </CardContent> */}
        <CardFooter className="flex flex-wrap gap-2 p-4 pt-0">
          {book.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="secondary" className="text-xs">
              {g}
            </Badge>
          ))}
        </CardFooter>
      </Link>
    </Card>
  );
}
