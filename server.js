const express = require("express");
const dotenv = require("dotenv");
const { getAltTextFromOpenAI } = require("./openaiService");
const { updateAltTextInShopify } = require("./shopifyService");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Shopify Alt Text App is running!");
});

app.post("/update-alt-text", async (req, res) => {
  const { productTitle, imageUrl, imageId, shop, accessToken } = req.body;

  if (!productTitle || !imageUrl || !imageId || !shop || !accessToken) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const altText = await getAltTextFromOpenAI(productTitle, imageUrl);
    await updateAltTextInShopify(shop, accessToken, imageId, altText);

    res.json({ success: true, altText });
  } catch (error) {
    console.error("Error updating alt text:", error);
    res.status(500).json({ error: "Failed to update alt text" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
