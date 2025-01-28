
const designs = [
  { id: 1, name: "Design 1", image: "images/design1.png" },
  { id: 2, name: "Design 2", image: "images/design2.png" },
  { id: 3, name: "Design 3", image: "images/design3.png" },
  { id: 4, name: "Design 4", image: "images/design4.png" },
  { id: 5, name: "Design 5", image: "images/design5.png" },
  { id: 6, name: "Design 6", image: "images/design6.png" },
  { id: 7, name: "Design 7", image: "images/design7.png" },
  { id: 8, name: "Design 8", image: "images/design8.png" },
  { id: 9, name: "Design 9", image: "images/design9.png" },
  { id: 10, name: "Design 10", image: "images/design10.png" }
];

function renderDesigns() {
  const container = document.getElementById("designs-container");
  container.innerHTML = designs.map(design => `
    <div class="design">
      <img src="${design.image}" alt="${design.name}" />
      <p>${design.name}</p>
      <input type="number" id="quantity-${design.id}" placeholder="Enter quantity" />
    </div>
  `).join("");
}

function submitOrder() {
  const orderDetails = designs.map(design => {
    const quantity = parseInt(document.getElementById(`quantity-${design.id}`).value, 10) || 0;
    return { name: design.name, quantity };
  }).filter(item => item.quantity > 0);

  const totalPrints = orderDetails.reduce((sum, item) => sum + item.quantity, 0);

  const report = {
    orderDetails,
    totalPrints
  };

  fetch("http://localhost:3000/api/submit-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(report)
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
  })
  .catch(error => console.error("Error submitting order:", error));
}

document.getElementById("submit-button").addEventListener("click", submitOrder);
renderDesigns();
