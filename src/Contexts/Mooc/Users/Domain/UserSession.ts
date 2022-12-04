export interface IUserSession {
  id: string;
  user: { id: string; email: string };
  expiration: string;
}

export class UserSession {
  private id: string;
  private user: { id: string; email: string };
  private expiration: Date;

  constructor(id: string, user: { id: string; email: string }, expiration?: string | number) {
    this.id = id;
    this.user = user;

    if (expiration) {
      this.expiration = new Date(expiration);
    } else {
      const today = new Date();
      today.setHours(today.getHours() + 4);
      this.expiration = today;
    }
  }

  getUserId() {
    return this.user.id;
  }

  getUserEmail() {
    return this.user.email;
  }

  isExired(): boolean {
    return this.expiration < new Date();
  }

  toPrimitives(): IUserSession {
    return {
      id: this.id,
      user: this.user,
      expiration: this.expiration.toISOString()
    };
  }
}
