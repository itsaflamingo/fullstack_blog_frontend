import { createContext } from "react";

export const ThemeContext = createContext([true, () => {}]);
export const UserContext = createContext([null, () => {}]);