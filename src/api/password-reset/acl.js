const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'password-reset/*',
                methods: ['GET', 'POST', 'PATCH'],
                action: 'allow',
            }
        ]
    }
]

export default permissions
