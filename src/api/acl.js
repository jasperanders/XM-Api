import { merge, flow, groupBy, mapValues, map, omit } from 'lodash'
/* ENDPOINT_ACL_IMPORT */
import multiple_choice_answerAcl from './multiple_choice_answer/acl'
import multiple_choice_questionAcl from './multiple_choice_question/acl'
import free_text_answerAcl from './free_text_answer/acl'
import free_text_questionAcl from './free_text_question/acl'
import answerAcl from './answer/acl'
import questionAcl from './question/acl'
import examAcl from './exam/acl'
import messageAcl from './message/acl'
import authAcl from './auth/acl'
import userAcl from './user/acl'
import verificationAcl from './verification/acl'
import passwordResetAcl from './password-reset/acl'

const defaultPermissions = []

const permissions = {
    ...groupBy([
        /* ENDPOINT_ACL_EXPORT */
...multiple_choice_answerAcl,
...multiple_choice_questionAcl,
...free_text_answerAcl,
...free_text_questionAcl,
...answerAcl,
...questionAcl,
...examAcl,
        ...defaultPermissions,
        ...messageAcl,
        ...authAcl,
        ...userAcl,
        ...verificationAcl,
        ...passwordResetAcl
    ],'group')
}

Object.keys(permissions).forEach((group) => {
    permissions[group] = permissions[group].reduce((accu, curr) => {
        return { group, permissions: accu.permissions.concat(curr.permissions)}
    })
})

export default Object.values(permissions)
