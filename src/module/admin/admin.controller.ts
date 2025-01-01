import { Request, Response } from "express";
import { adminService } from "./admin.service";
import sendResponse from "../../utilittes/sendResponse";
import { StatusCodes } from "http-status-codes";
import User from "../auth/auth.model";
import BlogPostModel from "../blog/blog.model";
import catchAsync from "../../utilittes/catchAsync";


const userBlock = catchAsync(async (req: Request, res: Response) => {
    const getid = req.params.userId
    const getUser = await User.findById(getid);
    if (!getUser) {
        return sendResponse(res, {
            success: false,
            message: 'User not found',
            statusCode: StatusCodes.NOT_FOUND,
        })
    }
    if(getUser?.isBlocked===true){
        return  sendResponse(res, {
            success: false,
            message: 'User already blocked',
            statusCode: StatusCodes.CONFLICT,
        })
    }
    const result = await adminService.userBlockFunc(getid);
    if (!result) {
        return sendResponse(res, {
            success: false,
            message: 'Failed to block user',
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
    sendResponse(res, {
        success: true,
        message: 'User blocked successfully',
        statusCode: StatusCodes.OK,
    })
})
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const getid = req.params.id
    const findBlog = await BlogPostModel.findById(getid)
    if (!findBlog) {
        return sendResponse(res, {
            success: false,
            message: 'Blog not found',
            statusCode: StatusCodes.NOT_FOUND,
        })
    }
    const getBlog = await adminService.deleteBlogFunc(getid);
    if (!getBlog) {
        return sendResponse(res, {
            success: false,
            message: 'Failed to delete blog',
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }

    sendResponse(res, {
        success: true,
        message: 'Blog deleted successfully',
        statusCode: StatusCodes.OK,
    })
}
)
export const adminController = {
    userBlock,
    deleteBlog
}