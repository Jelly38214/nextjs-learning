import Cors from "cors";
import { runMiddleware, allowRequestMethods } from "../../middleware";

const cors = Cors({
  methods: ["POST", "GET", "OPTIONS"],
});

export default function handler(req, res) {
  await runMiddleware(req, res, cors, allowRequestMethods());
  res.status(200).json({ isOk: Math.floor(Math.random() * 10) > 5 });
}
