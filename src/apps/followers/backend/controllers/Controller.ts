export type SessionType = {
  id: string;
  user: { id: string; email: string };
  expiration: string;
  iat: number;
  exp: number;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Controller {}
