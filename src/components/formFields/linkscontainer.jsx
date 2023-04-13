import React from "react";
import LinkRow from "./linksrow";
export default (props) => {

    return (<div className="links-container form-label">
        <div className="attachment-container">{props.itemArray.map(item => <LinkRow item={item} />)}</div >
        </div>);
}