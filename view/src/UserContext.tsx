import { createContext, type Dispatch, type SetStateAction } from "react";
import type { UserData } from "./types";

type NullableUserContextArgs = [UserData?, Dispatch<SetStateAction<UserData>>?];

const UserContext = createContext<NullableUserContextArgs>([]);

export default UserContext;