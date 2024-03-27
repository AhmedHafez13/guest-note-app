import schedule from 'node-schedule';
import DailyNotificationService from '@app/services/daily-notification.service';
import UserNotesRepository from '@app/repositories/user-notes.repository';
import { UserNotesSummary, UserStat } from '@app/types/app.types';

class DailyNotificationConfig {
  private static scheduled = false;

  public static scheduleDailyNotifications() {
    if (this.scheduled) {
      return;
    }

    // Schedule job to run daily at midnight [At 12:00 AM]
    // This job should send an email with a notes summary in the last 24 hours
    schedule.scheduleJob('0 0 * * *', async () => {
      const notesSummary = await UserNotesRepository.getUsersNotesSummary();
      const userStats = this.summarizeUserNotes(notesSummary);

      await DailyNotificationService.sendDailyNoteStats(userStats);
    });

    this.scheduled = true;
  }

  /**
   * Transforms an array of UserNotesSummary objects into an array of UserStat objects.
   *
   * @param summary An array of UserNotesSummary objects.
   * @returns An array of UserStat objects with aggregated note counts by type.
   */
  private static summarizeUserNotes(summary: UserNotesSummary[]): UserStat[] {
    const userStats: Record<number, UserStat> = {};

    for (const curr of summary) {
      const userId = curr.userId;
      const email = curr.user.email;
      const username = curr.user.username;
      const type = curr.note.type.name;

      if (!userStats[userId]) {
        userStats[userId] = { email, username, userId, stats: [] };
      }

      const existingStat = userStats[userId].stats.find(
        (stat) => stat.type === type
      );
      if (existingStat) {
        existingStat.count++;
      } else {
        userStats[userId].stats.push({ type, count: 1 });
      }
    }

    return Object.values(userStats);
  }
}

export default DailyNotificationConfig;
