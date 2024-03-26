import BaseRouter from '@app/routes/base.router';
import NoteController from './note.controller';
import AuthMiddleware from '@app/middleware/auth.middleware';

class NoteRoutes extends BaseRouter {
  protected override base = '/api/notes';

  protected override configurePreMiddleware(): void {
    this.router.use(AuthMiddleware.isAuthenticated);
  }

  protected override configureRoutes(): void {
    this.router.post('/', NoteController.createNote);
    this.router.get('/', NoteController.getNotes);
    this.router.get('/:id', NoteController.getNoteById);
    this.router.post('/:id/share', NoteController.shareNote);
  }
}

export default NoteRoutes;
