import React, { useState } from "react";

const InstallationWizard = ({ onComplete }) => {
  const [accountId, setAccountId] = useState("");
  const [upiIds, setUpiIds] = useState([""]);
  const [userPin, setUserPin] = useState("");

  const handleAddUpiId = () => {
    setUpiIds([...upiIds, ""]);
  };

  const handleUpiIdChange = (index, value) => {
    const newUpiIds = upiIds.slice();
    newUpiIds[index] = value;
    setUpiIds(newUpiIds);
  };

  const handleSubmit = () => {
    onComplete({ accountId, upiIds, userPin });
  };

  return (
    <div>
      <h2>Setup Your Account</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label>Account ID:</label>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>UPI IDs:</label>
          {upiIds.map((upiId, index) => (
            <div key={index}>
              <input
                type="text"
                value={upiId}
                onChange={(e) => handleUpiIdChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddUpiId}>
            Add Another UPI ID
          </button>
        </div>
        <div>
          <label>Set PIN:</label>
          <input
            type="password"
            value={userPin}
            onChange={(e) => setUserPin(e.target.value)}
            required
          />
        </div>
        <button type="submit">Complete Setup</button>
      </form>
    </div>
  );
};

export default InstallationWizard;
