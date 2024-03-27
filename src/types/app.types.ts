export interface UserData {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UserNotesSummary {
  userId: number;
  noteId: number;
  user: {
    email: string;
    username: string;
  };
  note: {
    type: { name: string };
  };
}

export interface UserStat {
  email: string;
  userId: number;
  username: string;
  stats: {
    type: string;
    count: number;
  }[];
}
