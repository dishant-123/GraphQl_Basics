const Query = {
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
    gretting(parent, args, {db}, info) {
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

    users(parent, args, {db}, info) {
        if (args.name) {
            return db.users.filter((user) => {
                return user.name.toLowerCase().includes(args.name)
            })
        }
        return db.users
    },

    posts(parent, args, {db}, info) {
        if (args.query) {
            const isTitleMatch = db.posts.filter((post) => post.title.toLowerCase().includes(args.query.toLowerCase()))
            const isBodyMatch = db.posts.filter((post) => post.body.toLowerCase().includes(args.query.toLowerCase()))
            return isBodyMatch || isTitleMatch
        }
        return db.posts
    },

    comments() {
        return comments
    }
}
export {Query as default}