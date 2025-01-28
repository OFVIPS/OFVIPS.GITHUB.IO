
const gallery = document.getElementById("gallery");
const uploadBtn = document.getElementById("upload-btn");
const fileInput = document.getElementById("file-input");

uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
  const files = event.target.files;
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBox = document.createElement("div");
      imageBox.className = "image-box";
      imageBox.innerHTML = `
        <img src="${e.target.result}" alt="Uploaded File">
        <input type="number" placeholder="Enter quantity">
      `;
      gallery.appendChild(imageBox);
    };
    reader.readAsDataURL(file);
  });
});
