import { UserStat } from '@app/types/app.types';
import EmailService from './email.service';

class DailyNotificationService {
  /**
   * Stores the single instance of the DailyNotificationService.
   */
  private static instance: DailyNotificationService;

  private constructor() {}

  /**
   * Retrieves the singleton instance of the DailyNotificationService.
   *
   * @returns The single instance of DailyNotificationService
   */
  static getInstance(): DailyNotificationService {
    if (!DailyNotificationService.instance) {
      DailyNotificationService.instance = new DailyNotificationService();
    }
    return DailyNotificationService.instance;
  }

  async sendDailyNoteStats(userStats: UserStat[]) {
    for (const userStat of userStats) {
      const message = this.formatStatsMessage(userStat);
      await EmailService.sendEmail(
        userStat.email,
        'Daily Notes Stats',
        message
      );
    }
  }

  /**
   * Formats a message string with user email, note type counts, and a call to action.
   *
   * @param userStat UserStat object containing user information and note statistics.
   * @param callToActionUrl Optional URL for a call to action link.
   * @returns A formatted message string with user email, note type counts, and call to action (if provided).
   */
  private formatStatsMessage(
    userStat: UserStat,
    callToActionUrl?: string
  ): string {
    const messageParts = [
      `Hi ${userStat.username},`,
      'You got some new notes!',
    ];

    const statLines = userStat.stats.map(
      (stat) => `${stat.count} ${stat.type} notes`
    );
    messageParts.push(...statLines);

    if (callToActionUrl) {
      messageParts.push(`See all your notes: ${callToActionUrl}`);
    }

    return messageParts.join('\n');
  }
}

export default DailyNotificationService.getInstance();
