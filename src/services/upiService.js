const baseUrl = "https://api-preprod.phonepe.com/"; // Replace with actual API URL
const apiKey = "your_api_key"; // Replace with actual API key

export const fetchTransactions = async (accountId, upiId) => {
  const url = `${baseUrl}/v3/qr/transaction/list`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    params: {
      account_id: accountId,
      upi_id: upiId,
    },
  });
  const data = await response.json();
  return data;
};
