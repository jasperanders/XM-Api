const { isNumber, isEmpty } = require('lodash')

const validateInput = function(input) {
    // Declare function as asynchronous, and save the done callback
    const done = this.async()

    isNumber(input) ? done('You need to provide a string') : null
    isEmpty(input, { ignore_whitespace: true }) ? done('You cannot provide empty a string') : null
    if(/\s/.test(input)) {
        done('Your value cannot have whitespaces')
    }

    // Pass the return value in the done callback
    done(null, true)
}

module.exports = function (plop) {
    plop.setWelcomeMessage('What do you want to generate?')

    plop.setGenerator('api endpoint', {
        description: 'Create a new api endpoint (api/endpoint)',
        prompts: [
            {
                type: 'input',
                name: 'endpointName',
                message: 'name of the endpoint in singular like "message" or "article"',
                validate: validateInput
            }
        ],
        actions: function(data) {
            const actions = [
                // Add Testfile
                {
                    type: 'add',
                    path: 'test/api/{{lowerCase endpointName}}.test.js',
                    templateFile: '_templates/test/api/_endpoint.hbs'
                },
                // Add acl
                {
                    type: 'add',
                    path: 'src/api/{{lowerCase endpointName}}/acl.js',
                    templateFile: '_templates/src/api/_acl.hbs'
                },
                // Add index
                {
                    type: 'add',
                    path: 'src/api/{{lowerCase endpointName}}/index.js',
                    templateFile: '_templates/src/api/_index.hbs'
                },
                // Add model
                {
                    type: 'add',
                    path: 'src/api/{{lowerCase endpointName}}/model.js',
                    templateFile: '_templates/src/api/_model.hbs'
                },
                // Add controller
                {
                    type: 'add',
                    path: 'src/api/{{lowerCase endpointName}}/controller.js',
                    templateFile: '_templates/src/api/_controller.hbs'
                },
                // Append index routes and docs
                {
                    type: 'append',
                    path: 'src/api/index.js',
                    pattern: '/* ENDPOINT_ROUTER_IMPORT */',
                    template: 'import {{lowerCase endpointName}}, { {{pascalCase endpointName}} } from \'./{{lowerCase endpointName}}\'',
                },
                {
                    type: 'append',
                    path: 'src/api/index.js',
                    pattern: '/* ENDPOINT_ROUTER_EXPORT */',
                    template: 'router.use(\'/{{lowerCase endpointName}}s\', {{lowerCase endpointName}})',
                },
                {
                    type: 'append',
                    path: 'src/api/index.js',
                    pattern: '/* ENDPOINT_DOCS_EXPORT */',
                    template: '{{pascalCase endpointName}},',
                },
                // Append acl
                {
                    type: 'append',
                    path: 'src/api/acl.js',
                    pattern: '/* ENDPOINT_ACL_IMPORT */',
                    template: 'import {{lowerCase endpointName}}Acl from \'./{{lowerCase endpointName}}/acl\'',
                },
                {
                    type: 'append',
                    path: 'src/api/acl.js',
                    pattern: '/* ENDPOINT_ACL_EXPORT */',
                    template: '...{{lowerCase endpointName}}Acl,',
                }
            ]

            return actions

        }
    })
}
