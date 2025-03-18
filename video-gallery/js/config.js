// Configuration for local hosting with Google Drive video links
const config = {
  // Background image
  background: "../images/Background_1.png",
  
  // Thumbnail images
  thumbnails: [
    "../images/Window01.png", // Thumbnail 1
    "../images/Window02.png", // Thumbnail 2
    "../images/Window03.png", // Thumbnail 3
    "../images/Window04.png"  // Thumbnail 4
  ],
  
  // Video files - Google Drive links formatted for direct embedding
  videos: [
    "https://drive.google.com/uc?export=download&id=1goY5D2N2GiZ9B25iysWjHK95MwbHpNlm", // Video 1
    "https://drive.google.com/uc?export=download&id=1vqKf7YwDANY9vFE3NsYroulSA0BFbvCG", // Video 2
    "https://drive.google.com/uc?export=download&id=1KwoQ-ze1_uhyeQjtl5A_m0ltIF07ay8o", // Video 3
    "https://drive.google.com/uc?export=download&id=1kPyxkNl3ja6zjttPJmOyP58FqwttQpzT"  // Video 4
  ],
  
  // Exit icon
  exitIcon: "../images/X-Button.png",
  
  // Screensaver video - You'll need to add your screensaver video URL here
  // For example: screensaver: "https://drive.google.com/uc?export=download&id=YOUR_SCREENSAVER_ID",
  screensaver: "https://drive.google.com/uc?export=download&id=1goY5D2N2GiZ9B25iysWjHK95MwbHpNlm", // Using first video as placeholder
  
  // Idle timeout in milliseconds (60 seconds)
  idleTimeout: 60000
};