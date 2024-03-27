import EmailService from '@app/services/email.service';
import {
  NotificationChannel,
  NotificationOptions,
} from '../notifications.types';

class EmailNotificationChannel implements NotificationChannel {
  async sendNotification(
    title: string,
    message: string,
    options?: NotificationOptions
  ) {
    if (!options?.emailOptions) {
      return;
    }

    console.log(
      '>>> Sending an Email Notification to ',
      options.emailOptions.recipientEmails,
      message
    );

    for (const email of options.emailOptions.recipientEmails) {
      await EmailService.sendEmail(email, title, message);
    }
  }
}

export default EmailNotificationChannel;
