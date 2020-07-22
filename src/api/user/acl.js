const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'users/',
                methods: ['POST'],
                action: 'allow',
                view: ['_id', 'verified', 'role', 'picture', 'name', 'email']
            }
        ]
    },
    {
        group: 'user',
        permissions: [
            {
                resource: 'users/:id/*',
                methods: ['PUT', 'DELETE', 'GET'],
                checkOwner: true,
                action: 'allow',
                view: ['_id', 'verified', 'role', 'name', 'email', 'picture']
            }
        ]
    },
    {
        group: 'admin',
        permissions: [
            {
                resource: 'users/*',
                methods: ['POST', 'DELETE', 'PUT', 'GET'],
                action: 'allow',
                view: ['_id', 'verified', 'role', 'name', 'email', 'picture']
            }
        ]
    }
]

export default permissions
