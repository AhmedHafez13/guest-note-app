export interface NotificationOptions {
  emailOptions?: {
    recipientEmails: string[];
  };
  webhookOptions?: {
    urls: string[];
  };
  socketsOptions?: {
    recipientIds: number[];
  };
}

export interface NotificationChannel {
  sendNotification(
    title: string,
    message: string,
    options?: NotificationOptions
  ): Promise<void>;
}
