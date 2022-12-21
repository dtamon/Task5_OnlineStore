import { useUser } from "../../context/UserContext"
import { Form, FormGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, Button, Stack } from "react-bootstrap"
import React, { useState } from "react"

export function LoginForm({ isOpenLoginForm }) {
    const {
        closeLoginForm,
        openRegisterForm,
        setEmail,
        setPassword,
        setToken,
        email,
        password,
        token,
    } = useUser()
    const [error, setError] = useState()

    return (
        <Offcanvas show={isOpenLoginForm} onHide={closeLoginForm} placement="end">
            <OffcanvasHeader closeButton>
                <Offcanvas.Title>Login</Offcanvas.Title>
            </OffcanvasHeader>
            <OffcanvasBody>
                <Stack gap={3}>
                    {token !== undefined
                        ? (<div className="mt-auto fs-5 text-muted">
                            You are logged in
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
                        {token === undefined
                            ? <React.Fragment>
                                <Stack gap={2}>
                                    <Button variant="primary" type="submit" onClick={() => { login() }}>Sign In</Button>
                                    <Button variant="outline-primary" type="submit" onClick={() => { openRegisterForm(); closeLoginForm() }}>Register</Button>
                                </Stack>
                            </React.Fragment>
                            : <Button variant="primary" type="submit" onClick={() => { setToken(); setEmail(); setPassword() }}>Log Out</Button>
                        }
                    </div>

                </Stack>
            </OffcanvasBody>
        </Offcanvas>
    )

    function login() {
        fetch('/api/account/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
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
                setToken(result)
            }, (error) => {
                alert(error)
            })

    }
}