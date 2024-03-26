import {
  NotificationChannel,
  NotificationOptions,
} from '../notifications/notifications.types';

/**
 * This class provides a central service for managing and broadcasting notifications through various channels.
 * It follows a singleton pattern, ensuring a single instance is used throughout the application.
 */
class NotificationService {
  /**
   * Stores the single instance of the NotificationService.
   */
  private static instance: NotificationService;

  /**
   * An array of registered notification channels.
   */
  private channels: NotificationChannel[] = [];

  private constructor() {}

  /**
   * Retrieves the singleton instance of the NotificationService.
   *
   * @returns The single instance of NotificationService
   */
  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Registers a single notification channel with the service.
   *
   * @param channel - The NotificationChannel to register
   */
  registerChannel(channel: NotificationChannel) {
    this.channels.push(channel);
  }

  /**
   * Registers multiple notification channels at once.
   *
   * @param channels - An array of NotificationChannel objects to register
   */
  registerChannels(channels: NotificationChannel[]) {
    for (const channel of channels) {
      this.channels.push(channel);
    }
  }

  /**
   * Broadcasts a notification to all registered channels.
   *
   * @param title - The title of the notification
   * @param message - The content of the notification
   * @param options - Optional options for customizing the notification (e.g., icons, sounds)
   */
  async broadcastNotification(
    title: string,
    message: string,
    options?: NotificationOptions
  ) {
    for (const channel of this.channels) {
      await channel.sendNotification(title, message, options);
    }
  }
}

export default NotificationService.getInstance();
