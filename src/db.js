
const users = [
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
    }
]

const posts = [
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
    }
]

const comments = [
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
    }

]

const db = {
    users,
    posts,
    comments
}

export { db as default }
