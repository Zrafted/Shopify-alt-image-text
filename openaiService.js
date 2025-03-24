const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAltTextFromOpenAI(productTitle, imageUrl) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: "You are an SEO expert that creates accessible, keyword-rich alt text for e-commerce product images.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Generate an SEO-friendly alt text for a product image. The product name is: "${productTitle}". Keep it under 20 words.`,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    max_tokens: 100,
  });

  const altText = response.choices[0].message.content.trim();
  return altText;
}

module.exports = { getAltTextFromOpenAI };
