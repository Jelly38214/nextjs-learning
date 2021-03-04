import fs from "fs";
import path from "path";

export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  const fileReader = fs.createReadStream(
    path.join(process.cwd(), "htmls", "applepay.html")
  );

  fileReader.pipe(res);
}
