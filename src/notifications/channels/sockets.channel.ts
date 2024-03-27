import {
  NotificationChannel,
  NotificationOptions,
} from '../notifications.types';

class SocketsNotificationChannel implements NotificationChannel {
  async sendNotification(
    title: string,
    message: string,
    options?: NotificationOptions
  ) {
    if (!options?.socketsOptions) {
      return;
    }

    try {
      console.log(
        '>>> Sending a Socket Notification to',
        options.socketsOptions.recipientIds,
        title,
        message
      );
      /* for (const recipientId of options.socketsOptions.recipientIds) {
        // TODO: HANDLE SOCKET NOTIFICATION
      } */
    } catch (error) {
      // TODO: HANDLE PROPER LOGGING
      console.error('Error sending webhook notification:', error);
    }
  }
}

export default SocketsNotificationChannel;
