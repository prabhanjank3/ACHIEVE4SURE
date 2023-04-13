import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { downloadAttachment } from "../../container/duration/CommonFunctions";
export default (props) => {
    const downloadClickHandler = () => {
        downloadAttachment(props.item.id)
    }
    return (
        <Container>
            <Row className="attachment-item-row">
                <Col lg="8">
                    <a href={props.item.path}>{props.item.name}</a>
                </Col>
                <Col lg="4">
                <a href={props.item.path}><FaDownload size="0.9em" color="#3272d9" /></a>
                </Col>
            </Row>
        </Container>
    )
}