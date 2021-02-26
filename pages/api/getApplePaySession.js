import Cors from "cors";
import { runMiddleware, allowRequestMethods } from "../../middleware";

const cors = Cors({
  methods: ["POST", "OPTIONS"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors, allowRequestMethods(["POST", "OPTIONS"]));

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
