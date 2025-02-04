import Link from "next/link";

export default function BlogPostCard({ post }) {
  return (
    <Link href={`/posts/${post._id}`} className="block">
      <div className="border p-4 rounded hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-2">By {post.author}</p>
        <p className="text-gray-500">{post.content.slice(0, 100)}...</p>
        <div className="mt-2 text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}
