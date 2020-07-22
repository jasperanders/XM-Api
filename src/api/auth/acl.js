const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'auth/*',
                methods: ['POST'],
                action: 'allow'
            }
        ]
    },
    {
        group: 'user',
        permissions: [
            {
                resource: 'auth/*',
                methods: ['POST'],
                action: 'allow'
            }
        ]
    },
    {
        group: 'admin',
        permissions: [
            {
                resource: 'auth/*',
                methods: ['POST'],
                action: 'allow'
            }
        ]
    }
]

export default permissions
