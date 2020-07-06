import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailtaken = db.users.some((user) => user.email === args.data.email)
        if (emailtaken) {
            throw new Error("Email Taken")
        }
        const user = {
            id: uuidv4(),
            ...args.data
        }
        db.users.push(user)
        return user
    },

    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)
        if (userIndex === -1) {
            throw new Error('User not found')
        }
        const deletedUsers = db.users.splice(userIndex, 1)

        db.posts.filter((post) => {
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

    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)
        if (!user) {
            throw new Error('User not found')
        }
        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email ===
                data.email)
            if (emailTaken) {
                throw new Error('Email taken')
            }
            user.email = data.email
        }
        if (typeof data.name === 'string') {
            user.name = data.name
        }
        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }
        return user
    },

    createPost(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        if (!userExists) {
            throw new Error('User not found')
        }
        const post = {
            id: uuidv4(),
            ...args.data
        }
        db.posts.push(post)
        return post
    },

    deletePost(parent, args, { db }, info) {
        const postIndex = post.findIndex((post) => post.id === args.id)
        if (postIndex === -1) {
            throw new Error("Post Not Found")
        }
        const deletePosts = db.posts.slice(postIndex, 1);
        comments.filter((comment) => comment.post !== db.posts[postIndex].id)
        deletePosts[0];
    },

    updatePost(parent, args, {db}, info){
        const {id, data} = args
        const post = db.posts.find(() => post.id === id)

        if(!post){
            throw new Error("Post not Found!")
        }

        if(typeof data.title === 'string'){
            post.title = data.title
        }

        if (typeof data.body === 'string') {
            post.body = data.body
        }

        if (typeof data.publised === Boolean) {
            post.publised = data.publised
        }
        return user
    },

    createComment(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        if (!userExists) {
            throw new Error("User not exists")
        }
        const postExists = db.posts.some((post) => user.id == args.data.post)
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

    deleteComment(parent, args, { db }, info) {
        const commentIndex = comments.findIndex((comment) => comment.id === args.id)
        if (commentIndex === -1) {
            throw new Error("Comment Not Found!")
        }
        deleteComments = comments.slice(commentIndex, 1);
        return deleteComments[0]
    },

    updateComment(parent, args, { db }, info ){
        const {id, data} = args
        const comment = db.comments.find((comment) => comment.id === id)

        if(typeof data.text === 'string')
        {
            comment.text = data.text
        }

        return comment
    }
}
export { Mutation as default }