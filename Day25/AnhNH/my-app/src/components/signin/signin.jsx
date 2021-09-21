import React, { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
export default function Signin(props) {
    document.title = 'signin';
    const [user, setuser] = useState({
        userName: "",
        userPass: ""
    })
    const [border, setborder] = useState("")
    const onChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setuser({ ...user, [name]: value })
    }
    const onClickExport = () => {
        if (user.userName === "") {
            alert("bạn chưa nhập đủ thông tin")
            setborder("border-danger")
        }
        else if (user.userPass === "") {
            alert("bạn chưa nhập đủ thông tin")
            setborder("border-danger")
        }
        else {
            props.signIn(user)
            setborder("")
        }
    }
    return (
        <>
            <Container className="">
                <Row className="justify-content-center mt-5">
                    <Col lg="4" md="8" xs="12" className="border p-5 rounded shadow ">
                        <Form>
                            <h3 className="text-center">LOGIN</h3>
                            <FormGroup className="mt-3">
                                <Label for="exampleEmail">Username</Label>
                                <Input type="text" name="userName" id="exampleEmail" placeholder="username" className={`shadow-none ${border}`} value={user.userName} onChange={onChange} />
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="userPass" id="examplePassword" placeholder="password" className={`shadow-none ${border}`} value={user.userPass} onChange={onChange} />
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button color="primary" className="mt-3" onClick={onClickExport}>Login</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
