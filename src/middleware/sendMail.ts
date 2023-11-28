import nodemailer from "nodemailer";

export const sendMessage = async (email: string, subject: string, output: any) => {
    console.log('Trying to send mail');
    
    const transporter = await nodemailer.createTransport({
        // service: 'gmail',
        host: 'mail.privateemail.com',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const mailOptions = {
        from: `"Trustcorp Bank" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: output
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Didn't send")
            return console.log(error);
        }

        if (info) {
            console.log("Message sent!");
        }
    });

    // try {
    //     let testAccount = await nodemailer.createTestAccount();
    //     console.log('Trying to send mail');
    //     // create reusable transporter object using the default SMTP transport
    //     let transporter = nodemailer.createTransport({
    //         host: "smtp.ethereal.email",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //             user: testAccount.user, // generated ethereal user
    //             pass: testAccount.pass, // generated ethereal password
    //         },
    //     });

    //     transporter.verify(function(error, success) {
    //         if (error) {
    //             console.log('Transporter not verified...')
    //               console.log(error);
    //         } else {
    //               console.log('Server is ready to take our messages');
    //         }
    //       });

    //     // send mail with defined transport object
    //     let info = await transporter.sendMail({
    //         from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //         to: "bar@example.com, baz@example.com", // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         text: "Hello world?", // plain text body
    //         html: "<b>Hello world?</b>", // html body
    //     });

    //     console.log("Message sent: %s", info.messageId);
    //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //     // Preview only available when sending through an Ethereal account
    //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // } catch (error) {
    //     console.log(error);
    // }
}

// module.exports = sendMessage;