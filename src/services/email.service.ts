import nodemailer from 'nodemailer';

/**
 * This class provides a singleton service for sending emails.
 * It follows a singleton pattern to ensure a single instance is used throughout the application.
 * Sensitive email configuration details are expected to be retrieved from environment variables.
 */
class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      secure: false, // based on server configuration
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Sends an email using the configured transporter.
   *
   * @param to - The recipient's email address
   * @param subject - The email subject line
   * @param text - The email content in plain text format
   * @returns A Promise that resolves when the email is sent or rejects on error
   */
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default EmailService.getInstance();
