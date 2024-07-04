import { getItem } from "@/core/storage";

export type ItemType = string;

const TOKEN = "authToken";

const EMAIL = "email";
export const getToken = () => getItem<ItemType>(TOKEN);

export const getEmail = () => getItem<ItemType>(EMAIL);
