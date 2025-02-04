import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/blogPost.model";
import { notFound } from "next/navigation";
import Link from "next/link";

async function fetchPost(id: string) {
  await connectDB();
  const post = await BlogPost.findById(id);
  return post;
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await fetchPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">By {post.author}</p>
          <p className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="prose max-w-none">{post.content}</div>
        <div className="mt-6 flex space-x-4">
          <Link
            href={`/edit/${post._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
