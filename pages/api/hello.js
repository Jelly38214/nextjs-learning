export default function handler(req, res) {
  res.status(200).json({ isOk: Math.floor(Math.random() * 10) > 5 });
}
