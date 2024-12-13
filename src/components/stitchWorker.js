// src/workers/stitchWorker.js

importScripts('https://docs.opencv.org/4.x/opencv.js'); // Ensure this path is correct

self.onmessage = async (e) => {
  const { images } = e.data;

  // Wait until OpenCV is ready
  if (!cv || !cv.Stitcher) {
    self.postMessage({ error: 'OpenCV.js not loaded.' });
    return;
  }

  try {
    const cvImages = images.map(img => {
      const imgElement = new Image();
      imgElement.src = img;
      const mat = cv.imread(imgElement);
      return mat;
    });

    const stitcher = cv.Stitcher.create(cv.Stitcher_PANORAMA);
    const pano = new cv.Mat();
    const status = stitcher.stitch(cvImages, pano);

    if (status !== cv.Stitcher_OK) {
      self.postMessage({ error: 'Stitching failed with status: ' + status });
      return;
    }

    // Create a canvas to draw the panorama
    const canvas = new OffscreenCanvas(pano.cols, pano.rows);
    const ctx = canvas.getContext('2d');

    // Convert Mat to ImageData
    const imgData = new ImageData(new Uint8ClampedArray(pano.data), pano.cols, pano.rows);
    ctx.putImageData(imgData, 0, 0);

    // Convert canvas to Data URL
    const blob = await canvas.convertToBlob();
    const reader = new FileReader();
    reader.onloadend = () => {
      self.postMessage({ stitchedPanorama: reader.result });
    };
    reader.readAsDataURL(blob);

    // Cleanup
    cvImages.forEach(mat => mat.delete());
    pano.delete();
    stitcher.delete();
    cv.destroyAllWindows();
    console.log('Stitching completed in worker.');
  } catch (error) {
    console.error('Stitching Error:', error);
    self.postMessage({ error: error.message });
  }
};
