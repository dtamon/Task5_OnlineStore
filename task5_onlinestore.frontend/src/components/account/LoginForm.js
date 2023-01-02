import { useUser } from "../../context/UserContext"
import { Form, FormGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, Button, Stack } from "react-bootstrap"
import React, { useState } from "react"
import jwt_decode from "jwt-decode";
import AccountService from "../../services/AccountService";

export function LoginForm({ isOpenLoginForm }) {
    const accountService = new AccountService();
    const {
        setUser,
        closeLoginForm,
        openRegisterForm,
        setEmail,
        setPassword,
        user,
        email,
        password,
    } = useUser()
    const [error, setError] = useState()

    return (
        <Offcanvas show={isOpenLoginForm} onHide={closeLoginForm} placement="end">
            <OffcanvasHeader closeButton>
                <Offcanvas.Title>Login</Offcanvas.Title>
            </OffcanvasHeader>
            <OffcanvasBody>
                <Stack gap={3}>
                    {user !== undefined
                        ? (<div className="mt-auto fs-5 text-muted">
                            You are logged in as <p>{user.name}</p>
                        </div>)
                        : <React.Fragment>
                            <FormGroup>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} value={email} />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} value={password} />
                                <Form.Text className="text-danger">{error}</Form.Text>
                            </FormGroup>
                        </React.Fragment>
                    }

                    <div className="me-auto">
                        {user === undefined
                            ? <React.Fragment>
                                <Stack gap={2}>
                                    <Button variant="primary" type="submit" onClick={() => { login() }}>Sign In</Button>
                                    <Button variant="outline-primary" type="submit" onClick={() => { openRegisterForm(); closeLoginForm() }}>Register</Button>
                                </Stack>
                            </React.Fragment>
                            : <Button variant="primary" type="submit" onClick={() => { setUser(); setEmail(); setPassword() }}>Log Out</Button>
                        }
                    </div>

                </Stack>
            </OffcanvasBody>
        </Offcanvas>
    )

    async function login() {
        await accountService.loginUser(email, password)
            .then(res => {
                if (!res.ok) res.text().then((value) => setError(value))
                else {
                    closeLoginForm()
                    setError()
                    return res.text()
                }
            })
            .then((result) => {
                // console.log(result)
                // setToken(result)
                const decodedToken = jwt_decode(result)
                setUser({
                    token: result,
                    id: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                    role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
                    email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                    name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
                })
            }, (error) => {
                alert(error)
            })

    }
}