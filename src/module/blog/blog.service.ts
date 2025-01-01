import { IblogPost } from "./blog.interface";
import BlogPostModel from "./blog.model";

const createBlogFunc = async (payload: IblogPost): Promise<IblogPost> => {
    return await BlogPostModel.create(payload);
};

const updateBlogFunc = async (id: string, data: Partial<IblogPost>): Promise<IblogPost | null> => {
    return await BlogPostModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteBlogFunc = async (id: string): Promise<IblogPost | null> => {
    return await BlogPostModel.findByIdAndDelete(id);
};

const getAllBlogsFunc = async (
    queryDoc: object,
    sortOption: Record<string, 1 | -1>
): Promise<IblogPost[]> => {
    const result = await BlogPostModel.find(queryDoc).sort(sortOption);
    return result;
};

const getSingleBlogFunc = async (id: string): Promise<IblogPost | null> => {
    return await BlogPostModel.findById(id);
};

export const blogService = {
    createBlogFunc,
    updateBlogFunc,
    deleteBlogFunc,
    getAllBlogsFunc,
    getSingleBlogFunc
};
