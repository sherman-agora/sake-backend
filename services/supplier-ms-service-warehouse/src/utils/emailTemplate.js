function VerificationEmailTemplate(email, name, token, origin) {
  return `<style>
    button{ 
        color: #ffffff;
        background-color: #aedd00;
        height: 30px;
        border-radius: 3px;
        decoration: none;
        cursor: pointer
    }
</style>
<p>Hello ${name},</p>
<p>Please verify ${email} as the email for your youCodia account.
</p>
<form action="${origin}/verify/${token}">
    <input type="submit" value="Verify Email"/>
</form>
<p>The youCodia Team</p>`;
}

function PasswordResetTemplate(email, name, token, origin) {
  return `<style>
    button{ 
        color: #ffffff;
        background-color: #aedd00;
        height: 30px;
        border-radius: 3px;
        decoration: none;
        cursor: pointer
    }
</style>
<p>Hello ${name},</p>
<p>A password reset request has been submitted for the youCodia account associated with ${email}. Please click on the following button to continue with the reset process.
</p>
<form action="${origin}/resetpw/${token}">
    <input type="submit" value="Reset Password"/>
</form>
<p>If you did not submit a password reset request, please ignore this email and contact us immediately.</p>
<p>The youCodia Team</p>`;
}

module.exports = { VerificationEmailTemplate, PasswordResetTemplate };
