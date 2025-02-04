import BlogPostCard from "@/components/BlogPostCard";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/blogPost.model";
import Link from "next/link";

async function fetchPosts(page = 1, limit = 5) {
  await connectDB();

  const skip = (page - 1) * limit;

  const posts = await BlogPost.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await BlogPost.countDocuments();

  return {
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string; search?: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const { posts, totalPages, currentPage } = await fetchPosts(page);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link
          href="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Blog Post
        </Link>
      </div>
      <SearchBar />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
