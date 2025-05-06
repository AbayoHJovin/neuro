// This is a utility script that could be used to generate a splash image
// You would run this with Node.js to generate a PNG file

const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");

async function generateSplashImage() {
  // Create a canvas with the dimensions of a typical splash screen
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = "#050628";
  ctx.fillRect(0, 0, 1024, 1024);

  // Add logo
  // Note: In a real implementation, you'd need to import or load the SVG logo
  // For this example, we'll just add placeholder text for the logo
  ctx.fillStyle = "white";
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.fillText("N", 512, 400);

  // Add title text
  ctx.fillStyle = "white";
  ctx.font = "bold 80px Arial";
  ctx.textAlign = "center";
  ctx.fillText("NeuroLab", 512, 550);

  // Add subtitle text
  ctx.fillStyle = "#B8A625";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Healthy Minds, Strong society", 512, 630);

  // Save the image
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(
    path.join(__dirname, "../../assets/images/splash.png"),
    buffer
  );
  console.log("Splash image generated successfully!");
}

generateSplashImage().catch(console.error);

// Note: To run this script, you would need to:
// 1. npm install canvas
// 2. node screens/Splash/generateSplashImage.js
// This would generate the splash.png file in the assets/images directory
