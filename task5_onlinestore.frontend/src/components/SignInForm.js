import { useState } from "react";
import { Form, Button } from "react-bootstrap"

export function SignInForm({ isOpen }) {
    const { closeForm } = useState(false)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
        <Form show={isOpen} className="rounded">
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>

            </Form.Group>
            <Button type="submit">Sign in</Button>
        </Form>
    )
}