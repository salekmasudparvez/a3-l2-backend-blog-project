---

# Blog API

This is an API for managing a Blog Project, built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**. The API allows user to manage the blog,create the blog and delete his blog . Beside there will be a admin who can block a user and delete blog post of any user.

## Features

- **User Management **:

  - User can register and login.
  - User can create blog post.
  - User can update his own post .
  - User can delete his post .
  - User can filter , sort and show spacific user's blog post

- **Admin Management**:

  - Admin can block any user.
  - Admin can delete any a post .
  - Admin can't update any post .


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)

## Installation

### Prerequisites

- Node.js
- MongoDB (or a MongoDB cloud service like Atlas)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/salekmasudparvez/a3-l2-backend-blog-project.git
   ```

2. Navigate to the project folder:

   ```bash
   cd a3-l2-backend-blog-project
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your **MongoDB** connection in the `app.ts` file (or use a service like MongoDB Atlas):

   ```typescript
   mongoose.connect('mongodb://localhost:5000/api/blogs')
   ```

5. Run the application:

   ```bash
   npm run dev
   ```

   The app will start on **http://localhost:5000**.

