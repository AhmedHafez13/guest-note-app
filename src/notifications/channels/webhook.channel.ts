// import axios from 'axios';
import {
  NotificationChannel,
  NotificationOptions,
} from '../notifications.types';

class WebhookNotificationChannel implements NotificationChannel {
  async sendNotification(
    title: string,
    message: string,
    options?: NotificationOptions
  ) {
    if (!options?.webhookOptions) {
      return;
    }

    try {
      console.log(
        '>>> Sending a Webhook Notification...',
        options.webhookOptions.urls,
        title,
        message
      );
      /* for (const url of options.webhookOptions.urls) {
        // TODO: HANDLE WEBHOOKS NOTIFICATION
        await axios.post(url, { message });
      } */
    } catch (error) {
      // TODO: HANDLE PROPER LOGGING
      console.error('Error sending webhook notification:', error);
    }
  }
}

export default WebhookNotificationChannel;
