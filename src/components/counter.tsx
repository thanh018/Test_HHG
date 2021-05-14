import React, { FunctionComponent, useState } from 'react';

const Counter:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
  const [clicks, setClicks] = useState(initial);
  return <>
    <p>Counter: {clicks}</p>
    <button onClick={() => setClicks(clicks+1)}>Increase</button>
    <button onClick={() => setClicks(initial)}>Reset</button>
  </>
}
export default Counter;