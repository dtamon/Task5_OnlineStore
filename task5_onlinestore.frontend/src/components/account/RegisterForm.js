import { useUser } from "../../context/UserContext"
import { Form, FormGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, Button, Stack } from "react-bootstrap"
import React, { useState } from "react"

export function RegisterForm({ isOpenRegisterForm }) {
    const {
        closeRegisterForm,
        openLoginForm,
        setEmail,
        setPassword,
        setConfirmPassword,
        setFirstName,
        setLastName,
        email,
        password,
        confirmPassword,
        firstName,
        lastName
    } = useUser()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [confirmPasswordError, setconfirmPasswordError] = useState()
    const [firstNameError, setFirstNameError] = useState()
    const [lastNameError, setLastNameError] = useState()

    return (
        <Offcanvas show={isOpenRegisterForm} onHide={closeRegisterForm} placement="end">
            <OffcanvasHeader closeButton>
                <Offcanvas.Title>Register</Offcanvas.Title>
            </OffcanvasHeader>
            <OffcanvasBody>
                <Stack gap={3}>
                    <FormGroup>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} value={email} />
                        <Form.Text className="text-danger">{emailError}</Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} value={password} />
                        <Form.Text className="text-danger">{passwordError}</Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        <Form.Text className="text-danger">{confirmPasswordError}</Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" onChange={e => setFirstName(e.target.value)} value={firstName} />
                        <Form.Text className="text-danger">{firstNameError}</Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" onChange={e => setLastName(e.target.value)} value={lastName} />
                        <Form.Text className="text-danger">{lastNameError}</Form.Text>
                    </FormGroup>

                    <div className="me-auto">
                        <Button variant="primary" type="submit" onClick={() => { register() }}>Register</Button>
                    </div>

                </Stack>
            </OffcanvasBody>
        </Offcanvas>
    )

    function register() {
        fetch('/api/account/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                firstName: firstName,
                lastName: lastName,
                roleId: 2
            })
        })
            .then(res => res.text())
            .then(body => {
                try {
                    return JSON.parse(body)
                } catch {
                    return body
                }
            })
            .then((result) => {
                if (result.errors !== undefined) {
                    result.errors.Email !== undefined ? setEmailError(result.errors.Email[0]) : setEmailError()
                    result.errors.Password !== undefined ? setPasswordError(result.errors.Password[0]) : setPasswordError()
                    result.errors.ConfirmPassword !== undefined ? setconfirmPasswordError(result.errors.ConfirmPassword[0]) : setconfirmPasswordError()
                    result.errors.FirstName !== undefined ? setFirstNameError(result.errors.FirstName[0]) : setFirstNameError()
                    result.errors.LastName !== undefined ? setLastNameError(result.errors.LastName[0]) : setLastNameError()
                } else {
                    openLoginForm()
                    closeRegisterForm()
                    resetForm()
                    alert(result)
                }
            }, (error) => {
                alert(error)
            })

    }

    function resetForm() {
        setConfirmPassword()
        setFirstName()
        setLastName()
        setEmailError()
        setPasswordError()
        setconfirmPasswordError()
        setFirstNameError()
        setLastNameError()
    }
}