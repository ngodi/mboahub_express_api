// src/cache/keys.ts
export const cacheKeys = {
  userById: (id: string) => `user:id:${id}`,
  userByEmail: (email: string) => `user:email:${email}`,
};
