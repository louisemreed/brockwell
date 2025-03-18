// Variables for idle timeout
let idleTimer = null;
let isScreensaverActive = false;

// Initialize images and setup custom controls
window.onload = function() {
  // Set background image
  document.body.style.backgroundImage = `url('${config.background}')`;
  
  // Set thumbnail images
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`thumb${i}-img`).src = config.thumbnails[i-1];
  }
  
  // Set exit icons
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`exit-icon-${i}`).src = config.exitIcon;
  }
  
  // Set video sources and setup custom controls
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`video-source-${i}`).src = config.videos[i-1];
    setupCustomControls(i);
  }
  
  // Start idle timer
  resetIdleTimer();
  
  // Add event listeners for user activity
  document.addEventListener('mousemove', userActivity);
  document.addEventListener('mousedown', userActivity);
  document.addEventListener('keypress', userActivity);
  document.addEventListener('touchstart', userActivity);
  
  // Preload screensaver
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.href = config.screensaver;
  preloadLink.as = 'video';
  document.head.appendChild(preloadLink);
};

// Setup custom video controls
function setupCustomControls(videoNumber) {
  const video = document.getElementById(`video-player-${videoNumber}`);
  const playPauseBtn = document.querySelector(`#video-container-${videoNumber} .play-pause-btn`);
  const progressBar = document.querySelector(`#video-container-${videoNumber} .progress-bar`);
  const progress = document.querySelector(`#video-container-${videoNumber} .progress`);
  const timeDisplay = document.querySelector(`#video-container-${videoNumber} .time-display`);
  
  // Play/pause button
  playPauseBtn.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      video.pause();
      playPauseBtn.textContent = 'Play';
    }
  });
  
  // Click on video to play/pause
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      video.pause();
      playPauseBtn.textContent = 'Play';
    }
  });
  
  // Update progress bar
  video.addEventListener('timeupdate', function() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + '%';
    
    // Update time display
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  });
  
  // Click on progress bar to seek
  progressBar.addEventListener('click', function(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  });
  
  // Reset when video ends
  video.addEventListener('ended', function() {
    playPauseBtn.textContent = 'Play';
    progress.style.width = '0%';
    
    // Return to main menu when video ends
    closeVideo(videoNumber);
  });
}

// Function to handle user activity - reset idle timer
function userActivity() {
  // Only respond to activity if screensaver is not active
  if (!isScreensaverActive) {
    resetIdleTimer();
  }
}

// Reset the idle timer
function resetIdleTimer() {
  // Clear any existing timer
  if (idleTimer) {
    clearTimeout(idleTimer);
  }
  
  // Set a new timer
  idleTimer = setTimeout(startScreensaver, config.idleTimeout);
}

// Start the screensaver using iframe to bypass autoplay restrictions
function startScreensaver() {
  // Only start if we're on the main menu (not watching a video)
  const videoContainers = document.querySelectorAll('.video-container:not(#screensaver-container)');
  for (let container of videoContainers) {
    if (container.style.display === 'flex') {
      // A video is currently playing, reset the timer and return
      resetIdleTimer();
      return;
    }
  }

  isScreensaverActive = true;
  
  // Show screensaver container
  const screensaverContainer = document.getElementById('screensaver-container');
  screensaverContainer.style.display = 'block';
  
  // Use iframe to embed the video with autoplay enabled
  const iframe = document.getElementById('screensaver-iframe');
  
  // Create a simple HTML page with the video that autoplays
  const iframeContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
        video { width: 100%; height: 100%; object-fit: cover; }
      </style>
    </head>
    <body>
      <video autoplay loop muted playsinline>
        <source src="${config.screensaver}" type="video/mp4">
      </video>
      <script>
        document.querySelector('video').play();
      </script>
    </body>
    </html>
  `;
  
  // Set the iframe content
  iframe.srcdoc = iframeContent;
  
  // For debugging
  console.log('Screensaver started');
}

// Exit screensaver
function exitScreensaver() {
  const screensaverContainer = document.getElementById('screensaver-container');
  const iframe = document.getElementById('screensaver-iframe');
  
  // Clear the iframe content to stop the video
  iframe.srcdoc = '';
  
  // Hide the screensaver container
  screensaverContainer.style.display = 'none';
  
  isScreensaverActive = false;
  
  // Reset the idle timer
  resetIdleTimer();
  
  // For debugging
  console.log('Screensaver exited');
}

// Play video function
function playVideo(videoNumber) {
  // Reset idle timer on video play
  resetIdleTimer();
  
  // Exit screensaver if it's active
  if (isScreensaverActive) {
    exitScreensaver();
  }
  
  const videoContainer = document.getElementById(`video-container-${videoNumber}`);
  const videoPlayer = document.getElementById(`video-player-${videoNumber}`);
  const playPauseBtn = document.querySelector(`#video-container-${videoNumber} .play-pause-btn`);
  
  // Show the video container
  videoContainer.style.display = "flex";
  
  // Load and play the video automatically
  videoPlayer.load();
  videoPlayer.play();
  playPauseBtn.textContent = 'Pause';
}

// Close video function
function closeVideo(videoNumber) {
  // Reset idle timer when closing video
  resetIdleTimer();
  
  const videoContainer = document.getElementById(`video-container-${videoNumber}`);
  const videoPlayer = document.getElementById(`video-player-${videoNumber}`);
  
  // Pause the video
  videoPlayer.pause();
  
  // Hide the video container
  videoContainer.style.display = "none";
}