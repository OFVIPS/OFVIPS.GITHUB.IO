const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

fileInput.addEventListener('change', (event) => {
    // Clear the existing list
    fileList.innerHTML = '';

    const files = event.target.files;

    Array.from(files).forEach(file => {
        // Create a container for the file preview
        const fileContainer = document.createElement('div');
        fileContainer.classList.add('file-container');

        // Display the file name
        const fileName = document.createElement('div');
        fileName.classList.add('file-name');
        fileName.textContent = file.name;
        fileContainer.appendChild(fileName);

        // Display the file preview (if it's an image)
        if (file.type.startsWith('image/')) {
            const filePreview = document.createElement('div');
            filePreview.classList.add('file-preview');

            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = file.name;

            filePreview.appendChild(img);
            fileContainer.appendChild(filePreview);

            // Revoke the object URL after the image loads
            img.onload = () => URL.revokeObjectURL(img.src);
        }

        // Append the container to the file list
        fileList.appendChild(fileContainer);
    });
});
