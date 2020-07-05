import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4'

let users = [
    {
        id: 1,
        name: "Dishant",
        email: "dishantdua8956@gmail.com",
        age: 20
    },
    {
        id: 2,
        name: "Kashish",
        email: "kashish@gmail.com",
    },
    {
        id: 3,
        name: "Geetangli",
        email: "geetangli@gmail.com",
    },
]

let posts = [
    {
        id: 1,
        title: "GraphQl",
        body: "GraphQl can overcome traditional REST API's",
        publised: false,
        author: 1
    },
    {
        id: 2,
        title: "NodeJs",
        body: "NodeJs is server side programmig language",
        publised: false,
        author: 1
    },
    {
        id: 3,
        title: "PHP",
        body: "PHP is a programming language",
        publised: true,
        author: 2
    },
]

let comments = [
    {
        id: 1,
        text: "Hello world",
        author: 1,
        post: 1

    },
    {
        id: 2,
        text: "Nice!",
        author: 2,
        post: 1
    },
    {
        id: 3,
        text: "awesome!",
        author: 2,
        post: 2
    },
    {
        id: 4,
        text: "Great job did!!",
        author: 3,
        post: 3
    },

]
//schema
const typeDefs = `
    type Query {
        me : User!
        gretting(name : String) : String!
        marks : [Int!]!
        post : Post!
        posts(query : String) : [Post!]!
        users(name : String) : [User]!
        comments : [Comment!]!
    }
    type Mutation {
        createUser(data : CreateUserInput!) : User!
        deleteUser(id : ID!) : User!
        createPost(data : CreatePostInput!) : Post!
        deletePost(id : ID!) : Post!
        createComment(data : CreateCommentInput) : Comment!
        deleteComment(id : ID!) : Comment!
    }
    input CreateUserInput {
        name : String!,
        email : String!,
        age : Int
    }
    input CreatePostInput {
        title : String!,
        body : String!,
        publised : Boolean!,
        author : ID!
    }
    input CreateCommentInput {
        text : String!,
        author : ID!,
        post : ID!
    }
    type Post {
        id : ID!
        title : String!
        body : String!
        publised : Boolean!
        author : User!
        comments : [Comment!]!
    }

    type User {
        id : ID!
        name : String!
        email : String!
        age : Int
        posts : [Post!]!
        comments : [Comment!]!
    }

    type Comment {
        id : ID!
        text : String!
        author : User!
        post : Post!
    }
`
//Resolvers
const resolvers = {
    Query: {
        post() {
            return {
                id: 'abcd123',
                title: 'dishant dua post',
                body: 'successful completed graphql !',
                publised: false
            }
        },
        me() {
            return {
                id: '1234',
                name: 'Dishant',
                email: 'dishantdua8956@gmail.com',
                age: 20
            }
        },
        gretting(parent, args, ctx, info) {
            if (args.name) {
                return `Hello ${args.name}`
            }
            else {
                return 'Hello'
            }
        },
        marks() {
            return [99, 90, 21]
        },
        users(parent, args, ctx, info) {
            if (args.name) {
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.name)
                })
            }
            return users
        },
        posts(parent, args, ctx, info) {
            if (args.query) {
                const isTitleMatch = posts.filter((post) => post.title.toLowerCase().includes(args.query.toLowerCase()))
                const isBodyMatch = posts.filter((post) => post.body.toLowerCase().includes(args.query.toLowerCase()))
                return isBodyMatch || isTitleMatch
            }
            return posts
        },
        comments() {
            return comments
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailtaken = users.some((user) => user.email === args.data.email)
            if (emailtaken) {
                throw new Error("Email Taken")
            }
            const user = {
                id: uuidv4(),
                ...args.data
            }
            users.push(user)
            return user
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex((user) => user.id === args.id)
            if (userIndex === -1) {
                throw new Error('User not found')
            }
            const deletedUsers = users.splice(userIndex, 1)
            posts = posts.filter((post) => {
                const match = post.author === args.id
                if (match) {
                    comments = comments.filter((comment) => comment.post !==
                        post.id)
                }
                return !match
            })
            comments = comments.filter((comment) => comment.author !==
                args.id)
            return deletedUsers[0]
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            if (!userExists) {
                throw new Error('User not found')
            }
            const post = {
                id: uuidv4(),
                ...args.data
            }
            posts.push(post)
            return post
        },
        deletePost(parent, args, ctx,  info){
            const postIndex = post.findIndex((post)=> post.id === args.id)
            if(postIndex === -1){
                throw new Error("Post Not Found")
            }
            const deletePosts = posts.slice(postIndex, 1);
            comments.filter((comment) => comment.post !== posts[postIndex].id)
            deletePosts[0];
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            if (!userExists) {
                throw new Error("User not exists")
            }
            const postExists = posts.some((post) => user.id == args.data.post)
            if (!postExists) {
                throw new Error("Post not exists")
            }

            const comment = {
                id: uuidv4(),
                ...args
            }
            comments.push(comment)
            return comment
        },
        deleteComment(parent, args, ctx, info){
            const commentIndex = comments.findIndex((comment) => comment.id === args.id)
            if(commentIndex === -1){
                throw new Error("Comment Not Found!")
            }
            deleteComments = comments.slice(commentIndex, 1);
            return deleteComments[0]
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.author === parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => post.id == parent.post)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})