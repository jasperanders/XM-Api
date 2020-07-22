import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swagger } from '~/config'
import { Models } from '~/api'

const specs = swaggerJSDoc(swagger)
const router = new Router()

specs.components.schemas = {}
Models.forEach((model) => {
    specs.components.schemas[model.swaggerSchema.title] = model.swaggerSchema
})

router.use(swagger.url, swaggerUi.serve)
router.get(
    swagger.url,
    swaggerUi.setup(specs, {
        explorer: true
    })
)
export default router
