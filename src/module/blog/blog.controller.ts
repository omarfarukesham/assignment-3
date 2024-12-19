import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { blogService } from './blog.service'

const createBlog = catchAsync(
  async (req, res) => {
    const payload = req.body

    const result = await blogService.createBlog(payload)

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Blog created successfully',
      data: result,
    }

    )
  })

const getBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getBlogs()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog getting successfully',
    data: result,
  })
})

const getSingleBlog = catchAsync(async (req, res) => {
  console.log(req.params)
  const blogId = req.params.id

  const result = await blogService.getSingleBlog(blogId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog getting successfully',
    data: result,
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id
  const body = req.body
  const result = await blogService.updateBlog(blogId, body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: result,
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  const userId = req.params.id
  await blogService.deleteBlog(userId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: {},
  })
})

export const blogController = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
