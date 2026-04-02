const floorPlanInput = document.getElementById('floorPlanInput');
const cameraNameInput = document.getElementById('cameraName');
const cameraImageInput = document.getElementById('cameraImageInput');
const addCameraBtn = document.getElementById('addCameraBtn');
const clearBtn = document.getElementById('clearBtn');
const mapContainer = document.getElementById('mapContainer');

const cameraDialog = document.getElementById('cameraDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogImage = document.getElementById('dialogImage');
const closeDialog = document.getElementById('closeDialog');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const resetZoom = document.getElementById('resetZoom');
const zoomLevel = document.getElementById('zoomLevel');

let readyToPlace = false;
let pendingCamera = null;
let cameras = [];
let zoom = 1;

floorPlanInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const dataUrl = await fileToDataUrl(file);
  mapContainer.style.backgroundImage = `url("${dataUrl}")`;
  mapContainer.querySelector('.placeholder')?.remove();
});

addCameraBtn.addEventListener('click', async () => {
  const name = cameraNameInput.value.trim();
  const image = cameraImageInput.files[0];

  if (!mapContainer.style.backgroundImage) {
    alert('Primeiro carregue a planta da empresa.');
    return;
  }

  if (!name || !image) {
    alert('Informe o nome da câmera e selecione uma foto.');
    return;
  }

  pendingCamera = {
    name,
    imageData: await fileToDataUrl(image),
  };

  readyToPlace = true;
  addCameraBtn.textContent = 'Clique no ponto da planta';
});

mapContainer.addEventListener('click', (event) => {
  if (!readyToPlace || !pendingCamera) return;

  const rect = mapContainer.getBoundingClientRect();
  const xPct = ((event.clientX - rect.left) / rect.width) * 100;
  const yPct = ((event.clientY - rect.top) / rect.height) * 100;

  const camera = {
    id: Date.now(),
    ...pendingCamera,
    xPct,
    yPct,
  };

  cameras.push(camera);
  drawCameraMarker(camera);

  readyToPlace = false;
  pendingCamera = null;
  addCameraBtn.textContent = 'Adicionar câmera (clique na planta)';
  cameraNameInput.value = '';
  cameraImageInput.value = '';
});

clearBtn.addEventListener('click', () => {
  cameras = [];
  mapContainer.querySelectorAll('.camera-marker').forEach((marker) => marker.remove());
});

closeDialog.addEventListener('click', () => cameraDialog.close());
zoomIn.addEventListener('click', () => setZoom(zoom + 0.2));
zoomOut.addEventListener('click', () => setZoom(zoom - 0.2));
resetZoom.addEventListener('click', () => setZoom(1));

function drawCameraMarker(camera) {
  const marker = document.createElement('button');
  marker.className = 'camera-marker';
  marker.style.left = `${camera.xPct}%`;
  marker.style.top = `${camera.yPct}%`;
  marker.textContent = '📷';
  marker.title = camera.name;

  marker.addEventListener('click', (event) => {
    event.stopPropagation();
    openCameraDialog(camera);
  });

  mapContainer.appendChild(marker);
}

function openCameraDialog(camera) {
  dialogTitle.textContent = camera.name;
  dialogImage.src = camera.imageData;
  setZoom(1);
  cameraDialog.showModal();
}

function setZoom(nextZoom) {
  zoom = Math.min(4, Math.max(0.4, nextZoom));
  dialogImage.style.transform = `scale(${zoom})`;
  zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.'));
    reader.readAsDataURL(file);
  });
}
