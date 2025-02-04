import BlogPostCard from "@/components/BlogPostCard";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/blogPost.model";

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

export default async function Home() {
  const page = 1;
  const { posts, totalPages, currentPage } = await fetchPosts(page);
  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
