/**
 * Utility function to load and ensure OpenCV.js is ready.
 * @returns {Promise} Resolves when OpenCV.js is fully loaded, rejects if it times out.
 */
export const loadOpenCV = () => {
  return new Promise((resolve, reject) => {
    if (window.cv && window.cv.Mat) {
      // OpenCV.js is already loaded
      console.log('OpenCV.js is already loaded.');
      resolve();
    } else {
      console.log('Waiting for OpenCV.js to load...');
      
      // Periodically check if OpenCV.js is ready
      const checkInterval = setInterval(() => {
        if (window.cv && window.cv.Mat) {
          clearInterval(checkInterval);
          console.log('OpenCV.js loaded successfully.');
          resolve();
        }
      }, 100); // Check every 100ms

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('OpenCV.js failed to load within the timeout period.'));
      }, 10000); // 10-second timeout
    }
  });
};
