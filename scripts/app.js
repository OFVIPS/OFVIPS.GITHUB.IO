
const gallery = document.getElementById("images-container");
const uploadBtn = document.getElementById("upload-btn");
const fileInput = document.getElementById("file-input");
const totalQuantityEl = document.getElementById("total-quantity");
const submitBtn = document.getElementById("submit-btn");

let images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
let totalQuantity = 0;

function updateGallery() {
  gallery.innerHTML = "";
  images.forEach((image, index) => {
    const imageBox = document.createElement("div");
    imageBox.className = "image-box";
    imageBox.innerHTML = `
      <p class="file-name">${image.name}</p> <!-- File name displayed above the image -->
      <img src="${image.src}" alt="Uploaded File">
      <input type="number" placeholder="Enter quantity" data-index="${index}" value="${image.quantity || 0}">
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    gallery.appendChild(imageBox);
  });
  updateTotalQuantity();
}

function updateTotalQuantity() {
  totalQuantity = images.reduce((sum, image) => sum + (parseInt(image.quantity, 10) || 0), 0);
  totalQuantityEl.textContent = totalQuantity;
}

uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
  const files = event.target.files;
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.push({ name: file.name, src: e.target.result, quantity: 0 });
      localStorage.setItem("uploadedImages", JSON.stringify(images));
      updateGallery();
    };
    reader.readAsDataURL(file);
  });
});

gallery.addEventListener("input", (event) => {
  if (event.target.tagName === "INPUT" && event.target.type === "number") {
    const index = event.target.getAttribute("data-index");
    images[index].quantity = event.target.value;
    localStorage.setItem("uploadedImages", JSON.stringify(images));
    updateTotalQuantity();
  }
});

gallery.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const index = event.target.getAttribute("data-index");
    images.splice(index, 1);
    localStorage.setItem("uploadedImages", JSON.stringify(images));
    updateGallery();
  }
});

submitBtn.addEventListener("click", () => {
  const name = document.getElementById("customer-name").value.trim();
  const email = document.getElementById("customer-email").value.trim();

  if (!name || !email) {
    alert("Please enter your name and email.");
    return;
  }

  const orderDetails = images
    .filter(image => image.quantity > 0)
    .map((image, index) => `File: ${image.name}, Quantity: ${image.quantity}`)
    .join("\n");

  const report = `Customer Name: ${name}\nCustomer Email: ${email}\n\nOrder Details:\n${orderDetails}\n\nTotal Quantity: ${totalQuantity}`;

  const blob = new Blob([report], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "order_report.txt";
  link.click();
});

updateGallery();
