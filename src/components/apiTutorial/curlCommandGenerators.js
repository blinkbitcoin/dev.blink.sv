export const generateCurlCommandRequestEmailCode = (authEndpoint, emailAddress) => {
  const requestBody = {
    email: emailAddress
  };

  return `curl -X POST '${authEndpoint}/auth/email/code' \\
  --header 'Content-Type: application/json' \\
  --header 'Accept: application/json' \\
  --data '${JSON.stringify(requestBody)}'`;
};


export const generateCurlCommandPhoneLogin = (apiEndpoint, phone, code) => {
  const requestBody = {
    query: `mutation login($input: UserLoginInput!) { userLogin(input: $input) { authToken } }`,
    variables: {
      "input": {
        "phone": phone,
        "code": code
      }
    }
  };

  return `curl '${apiEndpoint}' \\
  --header 'Content-Type: application/json' \\
  --header 'Accept: application/json' \\
  --data-binary '${JSON.stringify(requestBody)}'`;
}

export const generateCurlCommandEmailLogin = (authEndpoint, emailLoginId, emailCode) => {
  const url = `${authEndpoint}/auth/email/login`;

  // Convert the body object to a string for the curl command
  const body = JSON.stringify({
    code: emailCode,
    emailLoginId: emailLoginId
  });

  return `curl -X POST '${url}' \\
  --header 'Content-Type: application/json' \\
  --header 'Accept: application/json' \\
  --data '${body}'`;
}

export function generateCurlCommand({
  query,
  type,
  setCurlCommand,
  authToken,
  apiEndpoint,
  amount,
  accountWalletId,
  paymentRequest = '',
  walletId = '',
  walletCurrency = ''
}) {
  let requestBody = {
    query: query.trim(),
    variables: {}
  };

  const authHeader = authToken
    ? `--header 'Authorization: Bearer ${authToken}'`
    : "--header 'Authorization: Bearer <YOUR_AUTH_TOKEN_HERE>'";

  if (type === 'invoice') {
    requestBody.variables.input = {
      amount: amount.toString(),
      walletId: accountWalletId,
    };
  } else if (type === 'feeProbe') {
    requestBody.variables.input = {
      paymentRequest: paymentRequest,
      walletId: accountWalletId,
    };
  } else if (type === 'lnInvoicePaymentSend') {
    requestBody.variables.input = {
      paymentRequest: paymentRequest,
      walletId: walletId
    };
  }

  let queryData = JSON.stringify(requestBody).replace(/\n/g, '');5

  const walletCommand = `curl -sS --request POST --header 'content-type: application/json' \\
  ${authHeader} \\
  --url '${apiEndpoint}' \\
  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}", "variables":{}}' \\
| jq '.data.me.defaultAccount.wallets[] | select(.walletCurrency == "${walletCurrency}") .id'`;

  const command = `curl --request POST --header 'content-type: application/json' \\
  ${authHeader} \\
  --url '${apiEndpoint}' \\
  --data '${queryData}'`;

  // Determine which command to use based on type
  let commandToSet = (type === 'wallet') ? walletCommand : command;

  // Use the passed setter to update the state
  setCurlCommand(commandToSet);
};
