import { useUser } from "../../context/UserContext"
import { Form, FormGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, Button, Stack } from "react-bootstrap"

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

    return (
        <Offcanvas show={isOpen} onHide={closeForm} placement="end">
            <OffcanvasHeader closeButton>
                <Offcanvas.Title>Login</Offcanvas.Title>
            </OffcanvasHeader>
            <OffcanvasBody>
                <Stack gap={3}>
                    <FormGroup>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={e => changeUserEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e => changeUserPassword(e.target.value)} />
                    </FormGroup>
                    <Button variant="primary" type="submit" onClick={() => login()}>
                        Sign In
                    </Button>
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
                password: password
            })
        })
    }
}