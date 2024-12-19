// import { IUser } from './user.interface'
// import User from './user.model'

import { IBlog } from "./blog.interface"
import Blog from "./blog.model"

const createBlog = async (payload: IBlog): Promise<IBlog> => {
//   payload.role = 'admin';
  const result = await Blog.create(payload)
  return result
}

const getBlogs = async () => {
  const result = await Blog.find()
  return result
}

const getSingleBlog = async (id: string) => {
  //   const result = await User.findOne({name:"habi jabi"})
  const result = await Blog.findById(id)
  return result
}

const updateBlog = async (id: string, data: IBlog) => {
  const result = await Blog.findByIdAndUpdate(id, data, {
    new: true,
  })
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
