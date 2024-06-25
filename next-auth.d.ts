export type ExtendedUser = DefaultSession & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };
  
  declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
    }
  }
  