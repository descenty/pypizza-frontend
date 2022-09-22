import React from "react"
import { IUser } from "../models"

interface IUserContext {
    user?: IUser
    setUser?: (user: IUser) => void
}

const UserContext = React.createContext<IUserContext>({
    user: {
        phone: 'anonymous',
        fio: ''
    },
    setUser(user: IUser) { this.user = user }
})

export default UserContext