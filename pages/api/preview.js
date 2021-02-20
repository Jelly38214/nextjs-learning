export default async function handler(req, res) {
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== "ORANGE" || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Need to call `setPreviewData` on the response object.
  // `__prerender_bypass` and `__next_preview_data` cookies will be set to identify preview mode request.
  res.setPreviewData(
    { count: req.query.count ?? 1 },
    {
      maxAge: 60 * 5, // The preview mode cookies expire in 1 hour
    }
  );
  res.redirect(req.query.slug);
}
