const axios = require("axios");

async function updateAltTextInShopify(shop, accessToken, imageId, altText) {
  const endpoint = `https://${shop}/admin/api/2023-10/products/images/${imageId}.json`;

  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };

  const body = {
    image: {
      id: imageId,
      alt: altText,
    },
  };

  await axios.put(endpoint, body, { headers });
}

module.exports = { updateAltTextInShopify };
