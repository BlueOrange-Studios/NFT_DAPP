import React from "react";
import ReactDOM from "react-dom";
import engine from "./nft/api";

// TODO test engine
let e = engine;

import "./style.css";

type MainProps = {
}

function MainComponent(props: MainProps) {
    return (
        <div>
            Main Component
        </div>
    )
}

ReactDOM.render(<MainComponent></MainComponent>, document.getElementById('root'));
