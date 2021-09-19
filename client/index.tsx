import React, { FormHTMLAttributes } from "react";
import ReactDOM from "react-dom";
import engine from "./nft/api";

// test engine
const e = engine;

import "./style.css";

function FormComponent() {
    return(
        <div>
            <form id="claimForm">
                <label> Longitude </label>
                <input type="number" name="long"></input><br></br>

                <label> Latitude </label>
                <input type="number" name="lat"></input><br></br>

                <label> Depth </label>
                <input type="number" name="depth"></input><br></br>

                <label> Name </label>
                <input type="text" name="nft_name"></input><br></br>

                <label> Kind </label>
                <input type="text" name="kind"></input><br></br>

                <button type="button" onClick={()=>{
                    // TODO finish calim form
                    const form = document.getElementById("claimForm") as HTMLFormElement;
                    const long = form.elements["long"].value;
                    const lat = form.elements["lat"].value;
                    const depth = form.elements["depth"].value;
                    const name = form.elements["nft_name"].value;
                    const kind = form.elements["kind"].value;
                    e.claim(long, lat, depth, name, kind);
                }
                }>claim</button>
            </form>
        </div>
    )
}

function MainComponent() {
    return (
        <div>
            <div>
                Claim your NFT
            </div>
            <FormComponent></FormComponent>
        </div>
    )
}


ReactDOM.render(<MainComponent></MainComponent>, document.getElementById('root'));
