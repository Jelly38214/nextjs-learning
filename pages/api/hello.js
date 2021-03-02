import Cors from "cors";
import { runMiddleware, allowRequestMethods } from "../../middleware";

const cors = Cors({
  methods: ["POST", "OPTIONS"],
});

export default function handler(req, res) {
  await runMiddleware(req, res, cors, allowRequestMethods(["POST", "OPTIONS"]));
  res.status(200).json({ isOk: Math.floor(Math.random() * 10) > 5 });
}
