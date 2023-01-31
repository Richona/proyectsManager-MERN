const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

module.exports = {
    confirmRegister: async (data) => {
        const { name, email, token } = data;

        try {
            await transport.sendMail({
                from: "Project Manager <info@projectmagenerpa.com>",
                to: email,
                subject: "Confirma tu cuenta",
                text: "Confirma tu cuenta en Project Manager",
                html: `<p>Hola ${name}, hace click en el siguiente enlace</p>
                <a href="${process.env.URL_FRONTEND}/confirm/${token}">Confirma tu cuenta</a>`
            })
        } catch (error) {
            console.log(error)
        } 
    },
    forgotPassword: async (data) => {
        const { name, email, token } = data;

        try {
            await transport.sendMail({
                from: "Project Manager <info@projectmagenerpa.com>",
                to: email,
                subject: "Reestablece tu contraseña",
                text: "Reestablece tu contraseña en Project Manager",
                html: `<p>Hola ${name}, hace click en el siguiente enlace</p>
                <a href="${process.env.URL_FRONTEND}/recover-password/${token}">Reestablece tu contraseña</a>`
            })
        } catch (error) {
            console.log(error)
        } 
    }
}