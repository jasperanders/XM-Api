## ExpressJS Service

As basis we use Express ACL. We have extended the spelling in the configuration. This enables us to configure the projection of the response (view key).

Express Access Control Lists [express-acl](https://github.com/nyambati/express-acl#readme) enable you to manage the requests made to your express server. It makes use of ACL rules to protect your sever from unauthorized access. ACLs defines which user groups are granted access and the type of access they have against a specified resource. When a request is received against a resource, express-acl checks the corresponding ACL policy to verify if the requester has the necessary access permissions.

In the example we see an acl configuration for the endpoint "messages"

```js
const permissions = [
    {
        group: 'guest',
        permissions: [
            {
                resource: 'messages/*',
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
                resource: 'messages/*',
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
                resource: 'messages/*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                action: 'allow',
                view: ['content', 'author', 'author.name', 'author.email']
            }
        ]
    }
]

export default permissions
```
