import { Verification } from '.'
import { NOT_FOUND, NO_CONTENT } from 'http-status-codes'
import { errorHandler } from 's/response'

export const verify = async ({ params: { token } }, res, next) => {
    try {
        const verification = await Verification.findOne({ token }).populate('user')

        if (!verification || !verification.user) {
            res.status(NOT_FOUND).json({ valid: false, message: res.__('not-found')})
            return
        }

        await verification.user.set({ verified: true }).save()

        await verification.remove()

        res.status(NO_CONTENT).end()
    } catch (error) {
        errorHandler(res, error)
    }
}