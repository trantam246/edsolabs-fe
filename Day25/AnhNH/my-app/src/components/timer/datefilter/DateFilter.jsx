import React from 'react'
import { Col, Row } from 'reactstrap'

export default function DateFilter(props) {
  const onChange=(e)=>{
    props.dataFilter(e.target.value)
  }

  return (
    <>
      <Row className="mt-5 mb-5">
        <Col>
          <span className="fa-bold">Date filter </span>
          <input type="date" value="" onChange={onChange} />
        </Col>
      </Row>
    </>
  )
}

