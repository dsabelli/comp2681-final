exports.handler = async (event, context) => {
  try {
    const apiKey = process.env.EMAILJS_API_KEY; // Replace with your environment variable

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ apiKey }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
