import { asyncHandler } from "./asyncHandler.js"
import nodemailer from "nodemailer";

const sendEmail = asyncHandler(async ({ userEmail, resetField }) => {
  // send email with reset password via link
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_EMAIL_PASS_KEY,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: userEmail,
    subject: "Reset Your Password for Advance Computer Centre",
    html: `<!DOCTYPE html>
<html lang="en" >
<head>
<meta charset="UTF-8">
<title>Password Reset Email</title>


</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Advance Computer Centre</a>
  </div>
  <p style="font-size:1.1em">Hi,</p>
  <p>Thank you for choosing Advance Computer Centre. Use the following LINK to complete your Password Recovery Procedure. LINK is valid for 10 minutes</p>
 <a href=${resetField} style="
display: inline-block;
padding: 10px 20px;
font-size: 16px;
color: white;
background-color: #007BFF; /* Bootstrap primary color */
border: none;
border-radius: 10px;
text-decoration: none; /* Remove underline */
text-align: center;
transition: background-color 0.3s ease;
" onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007BFF'">
        Reset Password
    </a>
  <p style="font-size:0.9em;">Regards,<br />Advance Computer Centre</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>Advance Computer Centre Inc</p>
    <p>India</p>
  </div>
</div>
</div>
<!-- partial -->

</body>
</html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
})

export { sendEmail }