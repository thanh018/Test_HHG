import React, { useState } from 'react';

const Counter = () => {
  const [clicks, setClicks] = useState(0);
  return (
    <>
      <p>Counter: {clicks}</p>
      <button onClick={() => setClicks(clicks+1)}>Increase</button>
      <button onClick={() => setClicks(0)}>Reset</button>
    </>
  );
}
export default Counter;