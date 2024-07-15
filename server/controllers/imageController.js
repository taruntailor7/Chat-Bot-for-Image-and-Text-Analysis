const Image = require('../models/Image');
const { analyzeImage } = require('../services/imageAnalysis');

// Define allowed file types
const TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// Function to check if the analysis result is meaningful
function isAnalysisMeaningful(analysis) {
  const meaningfulCharRatio = analysis.replace(/[^a-zA-Z0-9]/g, '').length / analysis.length;
  return meaningfulCharRatio > 0.5 && analysis.length > 20;
}

// Function to check if the user is asking about a person
function isAskingAboutPerson(text) {
  const personKeywords = ['who', 'person', 'name', 'identify'];
  return personKeywords.some(keyword => text.toLowerCase().includes(keyword));
}

exports.analyzeImageAndText = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: 'Please provide an image file.' });
    }

    // Check file type
    if (!TYPE[req.file.mimetype]) {
      return res.status(400).json({ error: 'Invalid file type. Only PNG and JPEG images are allowed.' });
    }

    const { text } = req.body;
    const imagePath = req.file.path;

    // Analyze the image
    const analysis = await analyzeImage(imagePath);

    // Check if the analysis is meaningful
    if (!isAnalysisMeaningful(analysis)) {
      return res.status(400).json({ error: 'Unable to extract meaningful text from the image. Please try a different image.' });
    }

    // Check if the user is asking about a person
    if (isAskingAboutPerson(text)) {
      return res.status(400).json({ error: 'I apologize, but I am not able to identify specific individuals in images. I can only extract and analyze text content from images.' });
    }

    // Process the user's text input
    let response;
    if (text) {
      response = `Based on your question "${text}", here's what I found in the image: ${analysis}`;
    } else {
      response = `Here's what I found in the image: ${analysis}`;
    }

    // Save the analysis to the database
    const newImage = new Image({
      imageUrl: imagePath,
      text,
      analysis: response,
    });

    await newImage.save();

    res.json({ analysis: response, text });
  } catch (error) {
    console.error('Error in analyzeImageAndText:', error);
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size is too large. Maximum size is 5MB.' });
      }
    }
    res.status(500).json({ error: 'An error occurred during image analysis' });
  }
};

exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Image.find().sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    console.error('Error in getAllAnalyses:', error);
    res.status(500).json({ error: 'An error occurred while fetching analyses' });
  }
};