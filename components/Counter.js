import React, { useState, useEffect } from "react";

export default function Counter(props) {
    const [count, setCount] = useState(0);
  
    function rollOverCount() {
      if (count > 10) {
        setCount(0);
      }
    }

    const buttonStyle = {
      backgroundColor: "Black",
      color: "white",
      padding: props.size + "rem",
      borderRadius: "10px",    
    };
    useEffect(rollOverCount, [count]);
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1 * props.mult)} style={buttonStyle} >{props.name}</button>
      </div>
    );
  }
