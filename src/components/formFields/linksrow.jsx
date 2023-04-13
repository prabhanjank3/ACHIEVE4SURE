import React from "react";
import { Container, Row, Col } from "react-bootstrap";
export default (props) => {
    return (
        <Container>
            <Row className="attachment-item-row">
                <Col lg="12">
                    <a href={props.item.url} target="_blank">{props.item.title}</a>
                </Col>
            </Row>
        </Container>
    )
}