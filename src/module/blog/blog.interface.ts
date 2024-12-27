

export interface IblogPost {
    title: string;
    content: string;
    author: {
        authorId: string;
        authorName: string;
        authorEmail: string;
    };
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}
