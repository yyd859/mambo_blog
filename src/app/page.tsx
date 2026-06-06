import { getAllPosts } from "@/lib/posts";
import { HomeClient } from "@/components/HomeClient";

export default function Home() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return <HomeClient posts={posts} allTags={allTags} />;
}
