import React from 'react'
import { Row } from 'reactstrap';

export default function Profile() {
    document.title = 'Profile';
    return (
        <Row className="justify-content-center mt-5">
            <img src={localStorage.getItem("token")} alt="" className="rounded-circle col-3" />
            <h3 className="mt-5 col-12 text-center">{localStorage.getItem("name")}</h3>
        </Row>
    )
}
