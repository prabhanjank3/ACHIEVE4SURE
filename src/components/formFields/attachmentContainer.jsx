import React from "react";
import AttachmentRow from "./attachmentrow";
export default (props) => {
    return <div className="attachment-container">{props.itemArray.map(item => <AttachmentRow item={item} />)}</div >
}