import EmailNotificationChannel from '@app/notifications/channels/email.channel';
import SocketsNotificationChannel from '@app/notifications/channels/sockets.channel';
import WebhookNotificationChannel from '@app/notifications/channels/webhook.channel';

/**
 * This constant exports an array containing predefined notification channels.
 * These channels are used for system-wide notifications or broadcasts.
 */
export const GeneralNotificationChannels = [
  new SocketsNotificationChannel(),
  new EmailNotificationChannel(),
  new WebhookNotificationChannel(),
  // Register more notification channels here ...
];
