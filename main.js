const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to compress an image
const compressImage = async (inputPath, outputPath, quality) => {
  try {
    await sharp(inputPath)
      .rotate(-90)
      .jpeg({ quality: quality }) // Set the quality for JPEG
      .toFile(outputPath);

    console.log(`Image compressed successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error during image compression:', error);
  }
};

// Function to compress all images in a folder
const compressImagesInFolder = async (folderPath, outputFolderPath, quality) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading the folder:', err);
      return;
    }

    let count = 1; // Initialize counter for file naming
    files.forEach(file => {
      const inputImagePath = path.join(folderPath, file);
      // const outputImagePath = path.join(outputFolderPath, file);

      // Rename file with count
      const outputImagePath = path.join(outputFolderPath, `${count}.jpg`);

      // Check if the file is an image
      if (path.extname(file).match(/\.(jpg|jpeg|png|gif)$/)) {
        compressImage(inputImagePath, outputImagePath, quality);
        count++; // Increment counter after each image is processed
      }
    });
  });
};

// Usage
const folderPath = 'img'; // Replace with your input folder path
const outputFolderPath = 'output'; // Replace with your output folder path
const compressionQuality = 80; // Compression quality (1-100)

compressImagesInFolder(folderPath, outputFolderPath, compressionQuality);