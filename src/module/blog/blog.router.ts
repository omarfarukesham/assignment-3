import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { blogController } from './blog.controller'
import { BlogValidation } from './blog.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constants'

const blogRouter = Router()

blogRouter.post('/', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(BlogValidation.blogValidationSchema), blogController.createBlog)
blogRouter.get('/:id', blogController.getSingleBlog)
blogRouter.patch('/:id', blogController.updateBlog)
blogRouter.delete('/:id', blogController.deleteBlog)
// blogRouter.get('/',auth(USER_ROLE.admin, USER_ROLE.user), blogController.getUser)
blogRouter.get('/', blogController.getBlogs)

export default blogRouter

// blogRouter.post(
//     '/create',
//     auth('admin', 'user'), // Only 'admin' and 'user' roles are allowed to create a blog
//     createBlog
//   );