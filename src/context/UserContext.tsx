import React from "react"
import { IUser } from "../models"

interface IUserContext {
    user?: IUser | null
    setUser?: (user: IUser) => void
}

const UserContext = React.createContext<IUserContext>({})

export default UserContext