const transporter = require("../utils/mailer");

class MailService {
  async sendMail(to, subject, htmlContent) {
    try {
      const mailOptions = {
        from: `"Women Power App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
      return info;
    } catch (error) {
      console.error("Failed to send email:", error);
      throw error;
    }
  }
}

module.exports = new MailService();
