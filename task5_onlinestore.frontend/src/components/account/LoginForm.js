import { useUser } from "../../context/UserContext"
import { Form, FormGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, Button, Stack } from "react-bootstrap"
import React, { useState } from "react"

export function LoginForm({ isOpen }) {
    const {
        closeForm,
        changeUserEmail,
        changeUserPassword,
        changeUserToken,
        email,
        password,
        token,
    } = useUser()
    const [error, setError] = useState()

    return (
        <Offcanvas show={isOpen} onHide={closeForm} placement="end">
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
                                <Form.Control type="email" placeholder="Enter Email" onChange={e => changeUserEmail(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onChange={e => changeUserPassword(e.target.value)} />
                                <Form.Text className="text-danger">{error}</Form.Text>
                            </FormGroup>
                        </React.Fragment>
                    }

                    <div className="me-auto">
                        {token === undefined
                            ? <Button variant="primary" type="submit" onClick={() => { login() }}>Sign In</Button>
                            : <Button variant="primary" type="submit" onClick={() => { changeUserToken() }}>Log Out</Button>
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
            .then(res => res.text())
            .then(result => {
                changeUserToken(result)
            }, (error) => {
                alert(error)
            })

    }
}