import mongoose from 'mongoose'
import { mongo } from '~/config'
export paginate from './plugins/paginate'
export gravatar from './plugins/gravatar'
export filter from './plugins/filter'
export ownership from './plugins/ownership'

const processMode =  process.env.NODE_ENV

Object.keys(mongo.options).forEach(key => {
    mongoose.set(key, mongo.options[key])
})

/* istanbul ignore next */
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error: ' + err)
    process.exit(-1)
})

mongoose.connection.on('open', () => {
    console.info('\x1b[36m%s\x1b[0m', 'Mongoose:\x1b[0m Connected')
})

if (processMode !== 'test') {
    mongoose.connect(mongo.uri)
}

export default mongoose
