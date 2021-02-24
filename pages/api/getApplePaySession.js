export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).end();
  }

  const token = await fetch(
    "https://checkout.iherb.com/pro/getApplePaySession",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  ).then((res) => res.json());

  res.status(200).json(token);
}
