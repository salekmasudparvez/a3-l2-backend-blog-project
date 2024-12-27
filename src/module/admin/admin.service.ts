import User from "../auth/auth.model"
import BlogPostModel from "../blog/blog.model"


const userBlockFunc = async (userId: string) => {
   const result = await User.findByIdAndUpdate(userId, {isBlocked: true}, {new: true})
   return result
}
const deleteBlogFunc = async (blogId: string) => {
    const result = await BlogPostModel.findByIdAndDelete(blogId);
    return result
}

export const adminService = {
    userBlockFunc,
    deleteBlogFunc
}