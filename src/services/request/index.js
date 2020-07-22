/**
 * addAuthor is a middleware which takes the _id property from the jwt user and adds it to the request body
 * @param {*} options = { required, addBody }, default = { required: true, addBody: true }
 */
export const addAuthor = options => ({ bodymen: { body }, user }, res, next) => {
    const { required = true, addBody = true } = options ?? {}

    if (!user && !required) {
        return next()
    }

    if (!user && required) {
        res.status(400).end()
    }

    if (addBody) {
        body.author = user
    }

    return next()
}
