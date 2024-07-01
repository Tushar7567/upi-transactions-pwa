import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
