import { text } from "express"; // ghost line
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail =  async (options) => {
    const mailGenerator  = new Mailgen ({
        theme: "default" ,
        product : {
            name: "Task Manager" , 
            link:"https://taskmanagerlink.com"
        }
    }) 

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHtml = mailGenerator.generate(options.mailgenContent)


    const transporter = nodemailer.createTransport ({

        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USERNAME,
            pass: process.env.MAILTRAP_SMTP_PASSWORD
        }
    })

    const mail = {
        from: "mail.taskkkk@example.com" ,
        to: options.email, 
        subject: options.subject ,
        text: emailTextual,
        html: emailHtml

    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed silently babe. Make sure you provided your MAILTRAP credentials in the .env file")
        console.error("Error : ", error);
        
    }
}


const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {

            name: username,
            intro: "Welcome to our Third Date! and I am excited to play with you here." ,
            
            action:{
            instructions: "To verify your email please, click on Verify Heart Button" ,
            button: {
                color : "#b90000" , 
                text : "Verify Heart Button",
                link: verificationUrl ,
                },

            },
            outro: "Need help, or have questions? Just reply to this email, I would love to help."
        }
    }
}


const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {

            name: username,
            intro: "I got request to reset the password of your account babe." ,
            
            action:{
            instructions: "To reset your password please, click on Reset Button or link." ,
            button: {
                color : "#0070d8" , 
                text : "Reset Button",
                link: passwordResetUrl ,
                },

            },
            outro: "Need help, or have questions? Just reply to this email, I would love to help."
        }
    }
}

export {
    emailVerificationMailgenContent ,
    forgotPasswordMailgenContent,
    sendEmail
}