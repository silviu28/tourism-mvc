import { createContext, type Context } from "react";

type AlertContextValue = (title: string, content: string, isError: boolean) => void;

const AlertContext: Context<AlertContextValue> = createContext((_title, _content, _error) => { });

export default AlertContext;