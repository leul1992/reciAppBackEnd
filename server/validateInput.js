const nodemailer = require('nodemailer');

async function sendConfirmationEmail(email) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'leulbkm@gmail.com',
            pass: 'Leulbkm+191'
        }
    });
    const confirmationCode = Math.random().toString(36).substring(2, 8);

    let info = await transporter.sendMail({
        from: 'leulbkm@gmail.com',
        to: email,
        subject: 'Confirm your Email Address',
        text: `Thank you for Signing up for RecipeApp. Please Click on the following link or enter the confirmation code to confirm your email address: http://yourwebsite.com/confirm?code=${confirmationCode}`,
        html: `<p>Thank you for signing up. Please click on the following link or enter the confirmation code to confirm your email address:</p><p><a href="http://yourwebsite.com/confirm?code=${confirmationCode}">http://yourwebsite.com/confirm?code=${confirmationCode}</a></p>`
    });

    return confirmationCode;
}

function getEmailFromInput(email) {
    sendConfirmationEmail(email)
    .then(confirmationCode => {
        return confirmationCode;
    })
}

module.exports = getEmailFromInput
