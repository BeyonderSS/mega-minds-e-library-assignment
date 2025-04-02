import React from "react";
import { Card, CardContent } from "../ui/card";

export function RichTextParser({ content = "" }) {
  return (
    <Card className="w-full max-w-3xl mx-auto p-4">
      <CardContent>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
    </Card>
  );
}
export default RichTextParser;
