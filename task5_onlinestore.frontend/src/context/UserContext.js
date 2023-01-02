import { createContext, useContext, useState } from "react"
import { LoginForm } from "../components/account/LoginForm"
import { RegisterForm } from "../components/account/RegisterForm"

const UserContext = createContext({})

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const [isOpenLoginForm, setIsOpenLoginForm] = useState(false)
    const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false)
    const [user, setUser] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()

    const openLoginForm = () => setIsOpenLoginForm(true)
    const closeLoginForm = () => setIsOpenLoginForm(false)

    const openRegisterForm = () => {
        setEmail()
        setPassword()
        setConfirmPassword()
        setFirstName()
        setLastName()
        setIsOpenRegisterForm(true)
    }
    const closeRegisterForm = () => setIsOpenRegisterForm(false)

    return (
        <UserContext.Provider
            value={{
                setUser,
                setEmail,
                setPassword,
                setConfirmPassword,
                setFirstName,
                setLastName,
                openLoginForm,
                closeLoginForm,
                openRegisterForm,
                closeRegisterForm,
                user,
                email,
                password,
                confirmPassword,
                firstName,
                lastName
            }}
        >
            {children}
            <LoginForm isOpenLoginForm={isOpenLoginForm} />
            <RegisterForm isOpenRegisterForm={isOpenRegisterForm} />
        </UserContext.Provider>
    )
}