import fetch from "node-fetch";

const { CLIENT_2K85TGHQ47J8S, APP_EMAZEK3-gHIFl2TxZC2Qll0pFelDAr0Z8GAFVhyHo1DYX794BZmq6C-KQAIVgcAIt6crUJzLygj4Wfnn } = process.env;
const base = "https://api-m.sandbox.paypal.com";

export async function createOrder() {
  const accessToken = await generateAccessToken(access_token$sandbox$xqc6g2hgj5yypnq8$1d6a1dd001953dbb068f4925efe79796);
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {https://unavidaquecontar.com.mx}
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token$sandbox$4zyxxff8mps6mpn3$a16c0dbb1dc85d8f00e4b153980d62ee}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
    }),
  });

  return handleResponse(response);
}

export async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

export async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
