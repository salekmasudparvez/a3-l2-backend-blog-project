import mongoose, { Schema } from 'mongoose';
import { IblogPost } from './blog.interface';


const BlogPostSchema = new Schema<IblogPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        authorId: { type: String, required: true },
        authorName: { type: String, required: true },
        authorEmail: { type: String, required: true },
    },
    isPublished: { type: Boolean, default: true },
},
{ 
    timestamps: true ,
    versionKey: false,
    collection:"blogpostsDB"
});

const BlogPostModel = mongoose.model<IblogPost>('BlogPost', BlogPostSchema);
export default BlogPostModel;
