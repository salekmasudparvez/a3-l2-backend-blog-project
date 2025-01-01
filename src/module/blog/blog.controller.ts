import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from "express";
import catchAsync from "../../utilittes/catchAsync";
import { blogService } from "./blog.service";
import sendResponse from "../../utilittes/sendResponse";
import { StatusCodes } from "http-status-codes";
import config from '../../config';


const creatBlog = catchAsync(async (req: Request, res: Response) => {
    const getData = req.body;

    const token = req.header('Authorization');
    if (!token) {
        return sendResponse(res, {
            success: false,
            message: 'Token not found',
            statusCode: StatusCodes.UNAUTHORIZED,
        })
    }
    const getToken = token.split(" ")[1];
  
    const decodeToken = jwt.verify(getToken, config.jwt_secret as string) as JwtPayload;


    const payload = {
        ...getData,
        author: {
            authorId: decodeToken._id,
            authorName: decodeToken.name,
            authorEmail: decodeToken.email
        },
        isPublished: true

    }
    const result = await blogService.createBlogFunc(payload)
    sendResponse(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: StatusCodes.CREATED,
        result
    })
})
const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const getId = req.params;
    const id = getId.id;
    const getData = req.body;

    const updateBlog = {
        ...getData
    }
    const token = req.header('Authorization');
    if (!token) {
        return sendResponse(res, {
            success: false,
            message: 'Token not found',
            statusCode: StatusCodes.UNAUTHORIZED,
        })
    }
    const getToken = token.split(" ")[1];
    const decodeToken = jwt.verify(getToken, config.jwt_secret as string) as JwtPayload;
    const requiredEmail = decodeToken.email;
    const findBlog = await blogService.getSingleBlogFunc(id);
    if (!findBlog) {
        return sendResponse(res, {
            success: false,
            message: 'Blog not found',
            statusCode: StatusCodes.NOT_FOUND,
        })
    }
    if (findBlog.author.authorEmail !== requiredEmail) {
        return sendResponse(res, {
            success: false,
            message: 'You are not authorized to update this blog',
            statusCode: StatusCodes.UNAUTHORIZED,
        })
    }
    const result = await blogService.updateBlogFunc(id, updateBlog)
    sendResponse(res, {
        success: true,
        message: 'Blog updated successfully',
        statusCode: StatusCodes.OK,
        result
    })
})
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const getId = req.params;
    const id = getId.id
    const token = req.header('Authorization');
    if (!token) {
        return sendResponse(res, {
            success: false,
            message: 'Token not found',
            statusCode: StatusCodes.UNAUTHORIZED,
        })
    }
    const getToken = token.split(" ")[1];
    const decodeToken = jwt.verify(getToken, config.jwt_secret as string) as JwtPayload;
    const requiredEmail = decodeToken.email;
    const findBlog = await blogService.getSingleBlogFunc(id);
    if (!findBlog) {
        return sendResponse(res, {
            success: false,
            message: 'Blog not found',
            statusCode: StatusCodes.NOT_FOUND,
        })
    }
    if (findBlog.author.authorEmail !== requiredEmail) {
        return sendResponse(res, {
            success: false,
            message: 'You are not authorized to delete this blog',
            statusCode: StatusCodes.UNAUTHORIZED,
        })
    }
    const result = await blogService.deleteBlogFunc(id);
    if (!result) {
        sendResponse(res, {
            success: false,
            message: 'Blog not found',
            statusCode: StatusCodes.NOT_FOUND,
        })
    }
    sendResponse(res, {
        success: true,
        message: 'Blog deleted successfully',
        statusCode: StatusCodes.OK,
    })
})
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {

    const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = req.query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let queryDoc: any = {};
    if (search) {
        queryDoc = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ]
        }
    }
    const validSortFields = ['createdAt', 'updatedAt', 'title', 'content',];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortOptions: any = {};
    if (validSortFields.includes(sortBy as string)) {
        sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;
    } else {
        throw new Error('Invalid sortBy field');
    }
    if (filter) {
        queryDoc['author.authorId'] = filter;
    }
    const result = await blogService.getAllBlogsFunc(queryDoc, sortOptions);
    if (result.length === 0) {
        return sendResponse(res, {
            success: false,
            message: 'Blogs not found',
            statusCode: StatusCodes.NOT_FOUND,
        })
    }
    sendResponse(res, {
        success: true,
        message: 'Blogs fetched successfull',
        statusCode: StatusCodes.OK,
        result
    })
})


export const blogController = {
    creatBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}