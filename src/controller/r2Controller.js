const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const r2 = require("../utils/r2/r2Client");




exports.generateUploadUrl = async (req, res) => {
  try {
    const { fileName, fileType } = req.body;
    const key = `uploads/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 60 });
    res.json({ uploadUrl, key });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.generateAccessUrl = async (req, res) => {
  try {
    const { key } = req.query;

    if (!key) {
      return res.status(400).json({ error: "Missing key parameter" });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ResponseContentType: "image/jpeg", // ✅ make browser treat as image
      ResponseContentDisposition: "inline", // ✅ display image instead of download
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 300 }); // 5 minutes expiry

    res.json({ url: signedUrl });
  } catch (err) {
    console.error("❌ Error generating signed URL:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { key } = req.body;

    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });

    await r2.send(command);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
