import { createContext, type Dispatch, type SetStateAction } from "react";
import type { UserData } from "shared";

type NullableUserContextArgs = [UserData?, Dispatch<SetStateAction<UserData>>?];

const UserContext = createContext<NullableUserContextArgs>([]);

export default UserContext;