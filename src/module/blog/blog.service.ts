import { IblogPost } from "./blog.interface";
import BlogPostModel from "./blog.model";


const createBlogFunc = async (payload:IblogPost):Promise<IblogPost> => {

    return await BlogPostModel.create(payload);
};

const updateBlogFunc = async (id:string,data:IblogPost)=>{
    return await BlogPostModel.findByIdAndUpdate(id,data,{new:true})
}
const deleteBlogFunc = async (id:string)=>{
    return await BlogPostModel.findByIdAndDelete(id)
}
const getAllBlogsFunc = async (queryDoc : object,sortOption:number )=>{

    return await BlogPostModel.find(queryDoc).sort(sortOption)
}
const getSingleBlogFunc = async (id:string)=>{
    return await BlogPostModel.findById(id)
}

export const blogService = {
    createBlogFunc,
    updateBlogFunc,
    deleteBlogFunc,
    getAllBlogsFunc,
    getSingleBlogFunc
}