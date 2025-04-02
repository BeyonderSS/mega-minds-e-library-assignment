import { session } from "@/app/actions/auth";

export default async function Home() {
  const sessionData = await session()
  console.log(sessionData)
  return (
    <div></div>
  );
}
