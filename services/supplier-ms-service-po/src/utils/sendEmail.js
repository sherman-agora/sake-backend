// TODO: use email-templates library
const nodemailer = require("nodemailer");
const { VerificationEmailTemplate, PasswordResetTemplate } = require("./emailTemplate");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "hello.projectc@ygn.org.hk",
    pass: "Baf71567"
  }
});

function sendVerificationEmail(token, email, name, clientOrigin) {
  const mailOptions = {
    from: '"No-Reply" <hello.projectc@ygn.org.hk>', // sender address
    to: email, // list of receivers
    subject: "youCodia Account Verification", // Subject line
    html: VerificationEmailTemplate(
      email,
      name,
      token,
      clientOrigin
    )
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`A verification email has been sent to ${email}.`);
    }
  });
}

function sendPasswordResetEmail(token, email, name, clientOrigin) {
  const mailOptions = {
    from: '"No-Reply" <hello.projectc@ygn.org.hk>', // sender address
    to: email, // list of receivers
    subject: "youCodia Account Password Reset", // Subject line
    html: PasswordResetTemplate(
      email,
      name,
      token,
      clientOrigin
    )
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`A password reset email has been sent to ${email}.`);
    }
  });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
