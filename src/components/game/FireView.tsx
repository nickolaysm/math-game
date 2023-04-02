import fire from "./fire.png";
import React from "react";

const FireView = (props) => {
    return(
        <span className={"align-top"}>
        { [...Array(props.count)].map(()=>
            <img height={"120em"} src={fire} alt="спички"/>
        )
        }
        </span>
    )
}

export default FireView;