import QueryBuilder from "../../builder/querybuilder"
import { IBlog } from "./blog.interface"
import Blog from "./blog.model"

const createBlog = async (payload: IBlog): Promise<IBlog> => {
//   payload.role = 'admin';
  const result = (await Blog.create(payload)).populate("author", "name email role")
  return result
}

// search, filtering and pagination functions for blog posts
const getBlogs = async (query: Record<string, unknown> ) => {
    const searchableFields = ["title", "content"];

    const blogs = new QueryBuilder(Blog.find(), query).search(searchableFields).filter().sort().select();
    const result = await blogs.modelQuery;
    return result;
}

const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id).populate("author", "name email role")
  return result
}

const updateBlog = async (id: string, data: IBlog) => {
  const result = await Blog.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("author", "name email role")

  return result
}

const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}

export const blogService = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
