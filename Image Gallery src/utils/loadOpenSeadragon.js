/* global OpenSeadragon */

const OPEN_SEADRAGON_URL =
  "https://cdn.jsdelivr.net/gh/gmlnchv/openseadragon@2.4.2/build/openseadragon/openseadragon.min.js";

export async function loadOpenSeadragon() {
  if (typeof OpenSeadragon === "undefined") {
    await loadScript(OPEN_SEADRAGON_URL);
  }
  return OpenSeadragon;
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(
        new Error(`An error occurred while loading a script (URL: '${url}')`)
      );
    };
    script.src = url;
    document.head.appendChild(script);
  });
}
