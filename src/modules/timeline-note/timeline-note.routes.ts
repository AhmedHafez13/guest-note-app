import BaseRouter from '@app/routes/base.router';
import TimelineNoteController from './timeline-note.controller';
import AuthMiddleware from '@app/middleware/auth.middleware';

class TimelineNoteRoutes extends BaseRouter {
  protected override base = '/api/timeline';

  protected override configurePreMiddleware(): void {
    this.router.use(AuthMiddleware.isAuthenticated);
  }

  protected override configureRoutes(): void {
    this.router.get('/', TimelineNoteController.getReceivedNotes);
    this.router.delete('/', TimelineNoteController.deleteReceivedNote);
  }
}

export default TimelineNoteRoutes;
