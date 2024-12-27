import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";


const useblogRouter = Router()

useblogRouter.post('/',auth('user'),blogController.creatBlog)
useblogRouter.patch('/:id',auth('user'),blogController.updateBlog)
useblogRouter.delete('/:id',auth('user'),blogController.deleteBlog)
useblogRouter.get('/',auth('user'),blogController.getAllBlogs)

export default useblogRouter