import sendgridMail from '@sendgrid/mail'
import { sendgrid, env, ip, port, apiRoot } from '~/config'

const { apiKey, defaultEmail, emailTemplates } = sendgrid
sendgridMail.setApiKey(apiKey)

// relevant github issue: https://github.com/sendgrid/sendgrid-nodejs/issues/1128
const mail_settings = {
    sandbox_mode: {
        enable: env !== 'production'
    }
}

export const sendDynamicMail = ({ from = defaultEmail, to, templateId, dynamic_template_data }) =>
    sendgridMail.send({ to, from, templateId, dynamic_template_data, mail_settings })



const passwordResetLink = token =>
    env !== 'production' ?
        `http://${ip}:${port}${apiRoot}/password-reset/${token}`
        : `${process.env.APP_URL}/account/password-reset/${token}`

const verificationLink = token =>
    env !== 'production'
        ? `http://${ip}:${port}${apiRoot}/verification/${token}`
        : `${process.env.APP_URL}/account/verify/${token}`

export const sendVerificationMail = ({ to, name, token }) =>
    sendgridMail.send({
        to,
        from: defaultEmail,
        templateId: emailTemplates.welcome,
        dynamic_template_data: {
            username: name,
            link: verificationLink(token)
        },
        mail_settings
    })


export const sendPasswordResetMail = ({ to, name, token }) =>
    sendgridMail.send({
        to,
        from: defaultEmail,
        templateId: emailTemplates.forgot,
        dynamic_template_data: {
            username: name,
            link: passwordResetLink(token)
        },
        mail_settings
    })
