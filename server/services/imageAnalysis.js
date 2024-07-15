const Tesseract = require('tesseract.js');

async function analyzeImage(imagePath) {
  try {
    const result = await Tesseract.recognize(imagePath);
    return result.data.text;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

module.exports = { analyzeImage };