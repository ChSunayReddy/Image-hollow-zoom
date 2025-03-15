const lens = document.getElementById('lens');
const image = document.getElementById('image');
const zoomSlider = document.getElementById('zoom-slider');
const toggleShapeButton = document.getElementById('toggle-shape');

// Set the initial zoom level
let zoomLevel = parseFloat(zoomSlider.value);

// Function to move the lens and zoom in
function moveLens(e) {
  let pos, x, y;

  // Prevent the default action (like scrolling)
  e.preventDefault();

  // Get cursor position relative to image
  pos = getCursorPos(e);
  x = pos.x;
  y = pos.y;

  // Calculate lens position (make sure it stays within the image bounds)
  const lensWidth = lens.offsetWidth;
  const lensHeight = lens.offsetHeight;

  if (x > image.width - lensWidth / zoomLevel) {x = image.width - lensWidth / zoomLevel;}
  if (x < lensWidth / zoomLevel) {x = lensWidth / zoomLevel;}
  if (y > image.height - lensHeight / zoomLevel) {y = image.height - lensHeight / zoomLevel;}
  if (y < lensHeight / zoomLevel) {y = lensHeight / zoomLevel;}

  // Set lens position
  lens.style.left = `${x - lensWidth / zoomLevel}px`;
  lens.style.top = `${y - lensHeight / zoomLevel}px`;

  // Display the zoomed portion inside the lens
  lens.style.backgroundImage = `url('${image.src}')`;  // Set the background image to the same as the original image
  lens.style.backgroundSize = `${image.width * zoomLevel}px ${image.height * zoomLevel}px`;  // Zoom the background image
  lens.style.backgroundPosition = `-${(x * zoomLevel) - lensWidth / 2}px -${(y * zoomLevel) - lensHeight / 2}px`;  // Position the zoomed-in section in the lens
}

// Function to get cursor position relative to the image
function getCursorPos(e) {
  const a = image.getBoundingClientRect();
  const x = e.pageX - a.left;
  const y = e.pageY - a.top;
  return {x: x, y: y};
}

// Event listener to update zoom level dynamically
zoomSlider.addEventListener('input', (e) => {
  zoomLevel = parseFloat(e.target.value);
});

// Function to toggle lens shape between circle and square
toggleShapeButton.addEventListener('click', () => {
  lens.classList.toggle('circle');
  lens.classList.toggle('square');
});

// Add event listener for hovering over image
image.addEventListener('mousemove', moveLens);

// Show lens when hovering over image
image.addEventListener('mouseover', function() {
  lens.style.visibility = 'visible';
});

// Hide lens when mouse leaves image
image.addEventListener('mouseout', function() {
  lens.style.visibility = 'hidden';
});