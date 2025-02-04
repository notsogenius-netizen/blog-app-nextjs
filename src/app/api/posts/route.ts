import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/blogPost.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments();

    return NextResponse.json({
      posts,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    console.log(body);

    const newPost = await BlogPost.create({
      title: body.title,
      author: body.author,
      content: body.content,
    });
    console.log(newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create post ${error}` },
      { status: 400 }
    );
  }
}
