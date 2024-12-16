import React from "react";
import PanoramaUploader from "./components/PanoramaViewer";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <PanoramaUploader />
    </div>
  );
};

export default App;













// import React, { useState, useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const App = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [panoramaImage, setPanoramaImage] = useState(null);

//   useEffect(() => {
//     // Access webcam
//     const initCamera = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     };
//     initCamera();
//   }, []);

//   const captureFrame = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     const video = videoRef.current;

//     if (video && canvas) {
//       // Draw the current frame onto the canvas
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageData = canvas.toDataURL("image/jpeg");
//       setPanoramaImage(imageData); // Set as the panorama image (in a real app, you would combine multiple captures)
//     }
//   };

//   const renderPanorama = () => {
//     if (!panoramaImage) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const geometry = new THREE.SphereGeometry(500, 60, 40);
//     geometry.scale(-1, 1, 1);

//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(panoramaImage);
//     const material = new THREE.MeshBasicMaterial({ map: texture });

//     const sphere = new THREE.Mesh(geometry, material);
//     scene.add(sphere);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableZoom = false;

//     camera.position.set(0, 0, 0.1);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     animate();
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>360° Panorama Capture</h1>
//       <video ref={videoRef} autoPlay style={{ width: "100%", maxWidth: "640px" }}></video>
//       <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }}></canvas>
//       <br />
//       <button onClick={captureFrame}>Capture Frame</button>
//       {panoramaImage && (
//         <div>
//           <h2>Preview</h2>
//           <img src={panoramaImage} alt="Captured" style={{ width: "100%", maxWidth: "640px" }} />
//           <button onClick={renderPanorama}>Render Panorama</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
