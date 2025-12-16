import type { User } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
  const data = fetch("/users.json").then((res) => res.json());
  return data;
};
