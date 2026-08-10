declare global {
  namespace App {
    interface Locals {
      user: import('$lib/server/auth').AdminUser | null;
    }
    interface Platform {
      env: Env;
      ctx: ExecutionContext;
    }
  }
}

export {};
