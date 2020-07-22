const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'verification/:token',
                methods: ['GET'],
                action: 'allow',
            }
        ]
    }
]

export default permissions
