const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
let transport

if(process.env.MAIL_USER_APIKEY){
    transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.MAIL_USER_APIKEY
        })
    )
}else{
    transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })
}
/* 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 */


module.exports = {
    confirmRegister: async (data) => {
        const { name, email, token } = data;

        try {
            if (process.env.MAIL_USER_APIKEY) {
                await transport.sendMail({
                    from: "Project Manager <info@projectmagenerpa.com>",
                    to: email,
                    subject: "Confirma tu cuenta",
                    text: "Confirma tu cuenta en Project Manager",
                    html: `<p>Hola ${name}, hace click en el siguiente enlace</p>
                    <a href="${process.env.URL_FRONTDEPLOY}/confirm/${token}">Confirma tu cuenta</a>`
                })
            }else{
                await transport.sendMail({
                    from: "Project Manager <info@projectmagenerpa.com>",
                    to: email,
                    subject: "Confirma tu cuenta",
                    text: "Confirma tu cuenta en Project Manager",
                    html: `<p>Hola ${name}, hace click en el siguiente enlace</p>
                    <a href="${process.env.URL_FRONTEND}/confirm/${token}">Confirma tu cuenta</a>`
                })
            }
            
        } catch (error) {
            console.log(error)
        } 
    },
    forgotPassword: async (data) => {
        const { name, email, token } = data;

        try {
            if (process.env.MAIL_USER_APIKEY) {
                await transport.sendMail({
                    from: "Project Manager <info@projectmagenerpa.com>",
                    to: email,
                    subject: "Reestablece tu contraseña",
                    text: "Reestablece tu contraseña en Project Manager",
                    html: `<p>Hola ${name}, hace click en el siguiente enlace</p>
                    <a href="${process.env.URL_FRONTEND}/recover-password/${token}">Reestablece tu contraseña</a>`
                })
            }else{
                await transport.sendMail({
                    from: "Project Manager <info@projectmagenerpa.com>",
                    to: email,
                    subject: "Reestablece tu contraseña",
                    text: "Reestablece tu contraseña en Project Manager",
                    html: `<p>Hola ${name}, hace click en el siguiente enlace</p>
                    <a href="${process.env.URL_FRONTEND}/recover-password/${token}">Reestablece tu contraseña</a>`
                })
            }

        } catch (error) {
            console.log(error)
        } 
    }
}