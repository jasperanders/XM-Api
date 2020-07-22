import acl from 'express-acl'
import rules from '~/api/acl'
import { apiRoot } from '~/config'

/**
 * DOC: https://github.com/nyambati/express-acl#readme
 */

// acl configuration
acl.config({
    //specify your own baseUrl
    baseUrl: apiRoot.replace(/^\/|\/$/g, ''),
    filename: 'acl.js',
    //path to acl (nacl) file
    rules: rules,
    yml: true,
    // The default role allows you to specify which role users will assume if they are not assigned any
    defaultRole: 'guest',
    roleSearchPath: 'user.role'
})

export default acl
