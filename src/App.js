import React, { useState, useEffect } from "react";
import { fetchTransactions } from "./services/upiService";
import TransactionList from "./components/TransactionList";
import InstallationWizard from "./components/InstallationWizard";
// import LockScreen from "./components/LockScreen";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [setupComplete, setSetupComplete] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [upiIds, setUpiIds] = useState([]);
  // const [isLocked, setIsLocked] = useState(true);

  const handleSetupComplete = (data) => {
    setAccountId(data.accountId);
    setUpiIds(data.upiIds);
    setSetupComplete(true);
    localStorage.setItem("accountId", data.accountId);
    localStorage.setItem("upiIds", JSON.stringify(data.upiIds));
    localStorage.setItem("userPin", data.userPin);
  };

  useEffect(() => {
    const storedAccountId = localStorage.getItem("accountId");
    const storedUpiIds = JSON.parse(localStorage.getItem("upiIds"));

    if (storedAccountId && storedUpiIds) {
      setAccountId(storedAccountId);
      setUpiIds(storedUpiIds);
      setSetupComplete(true);
    }
  }, []);

  useEffect(() => {
    if (setupComplete) {
      const getTransactions = async () => {
        let allTransactions = [];
        for (let upiId of upiIds) {
          const transactions = await fetchTransactions(accountId, upiId);
          allTransactions = [...allTransactions, ...transactions];
        }
        setTransactions(allTransactions);
      };

      getTransactions();
    }
  }, [setupComplete, accountId, upiIds]);

  // const handleUnlock = () => {
  //   setIsLocked(false);
  // };

  return (
    <div className="App">
      <h1>UPI Transactions</h1>
      {/* {isLocked ? ( */}
         {/* <LockScreen onUnlock={handleUnlock} />
       ) :  */}
      {!setupComplete ? (
        <InstallationWizard onComplete={handleSetupComplete} />
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </div>
  );
};

export default App;
