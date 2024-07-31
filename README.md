# Chit-chat - Chat Application

![Chit-chat](/public/images/logo.png)

Chit-chat is a real-time chat application built with Next.js, Tailwind CSS, Prisma, Pusher, MongoDB Atlas, and Next-Auth. It offers features for user authentication, one-on-one chat, user search, and group chat.

## Features

Authentication:
- User registration
- User login

Real-time Chat:
- One-on-one chat with message history
- Real-time message delivery and updates

User Search:
- Search for other users by username

Group Chat:
- Create and manage groups
- Group chat functionality with message history

## Technologies Used

- Frontend: Next.js, Tailwind CSS
- Backend: Prisma, Pusher, MongoDB Atlas
- Authentication: Next-Auth

## Demo
[![Chit-chat_Demo_Video](https://img.youtube.com/vi/3gAK5bG2bDQ/0.jpg)](https://youtu.be/3gAK5bG2bDQ)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/rezakurniawan88/chit-chat.git
```

2. Install dependencies:
```bash
cd chit-chat
npm install
```

3. Set up environment variables :
```bash
cp .env.example .env
```
After that, edit the .env file according to the environment variables.

4. Set up MongoDB Atlas:
- Register an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
- Create a MongoDB Atlas cluster.
- Create a database and a user.

5. Set up Pusher:
- Create a [Pusher account](https://pusher.com). after that fill the environtment variables in the .env file.

6. Start the development server:
```bash
npm run dev
```