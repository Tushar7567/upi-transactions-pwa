import React, { useState } from "react";

const LockScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleUnlock = () => {
  console.log(pin, localStorage.clear("userPin"));
    const storedPin = localStorage.getItem("userPin");
    if (pin === storedPin) {
      onUnlock();
    } else {
      setError("Incorrect PIN");
    }
  };

  return (
    <div className="lock-screen">
      <h2>Enter PIN to Unlock</h2>
      <input
        type="password"
        value={pin}
        onChange={handlePinChange}
        placeholder="Enter PIN"
      />
      <button onClick={handleUnlock}>Unlock</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LockScreen;
