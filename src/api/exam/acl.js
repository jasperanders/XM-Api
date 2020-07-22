const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'exams/*',
                methods: ['GET', 'POST'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email']
            }
        ]
    },
    {
        group: 'user',
        permissions: [
            {
                resource: 'exams/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email']
            }
        ]
    },
    {
        group: 'admin',
        permissions: [
            {
                resource: 'exams/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email']
            }
        ]
    }
]

export default permissions
