
const mockDesigns = [
  { id: 1, name: "Design 1", image: "./assets/design1.png", quantity: 0 },
  { id: 2, name: "Design 2", image: "./assets/design2.png", quantity: 0 },
];

const mockUsers = [
  { id: 1, username: "client1", password: "password1", designs: [1, 2] },
  { id: 2, username: "client2", password: "password2", designs: [1] },
];

let currentUser = null;

function renderLogin() {
  document.getElementById("root").innerHTML = `
    <div class="p-4 max-w-md mx-auto">
      <h1 class="text-xl font-bold mb-4">Login</h1>
      <input id="username" class="block w-full mb-2 p-2 border rounded" placeholder="Username" />
      <input id="password" type="password" class="block w-full mb-2 p-2 border rounded" placeholder="Password" />
      <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="handleLogin()">Login</button>
    </div>
  `;
}

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    renderDashboard();
  } else {
    alert("Invalid credentials");
  }
}

function renderDashboard() {
  const userDesigns = mockDesigns.filter(d => currentUser.designs.includes(d.id));
  document.getElementById("root").innerHTML = `
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Welcome, ${currentUser.username}</h1>
      <button class="bg-red-500 text-white px-4 py-2 rounded mb-4" onclick="logout()">Logout</button>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        ${userDesigns.map(d => `
          <div class="border rounded p-2">
            <img src="${d.image}" alt="${d.name}" class="w-full h-32 object-cover mb-2" />
            <h2 class="text-lg font-semibold mb-2">${d.name}</h2>
            <input type="number" id="design-${d.id}" class="w-full p-2 border rounded mb-2" placeholder="Quantity" />
          </div>
        `).join("")}
      </div>
      <button class="bg-green-500 text-white px-4 py-2 rounded mt-4" onclick="submitOrder()">Submit Order</button>
    </div>
  `;
}

function logout() {
  currentUser = null;
  renderLogin();
}

function submitOrder() {
  const userDesigns = mockDesigns.filter(d => currentUser.designs.includes(d.id));
  const order = userDesigns.map(d => {
    const quantity = document.getElementById(`design-${d.id}`).value || 0;
    return { name: d.name, quantity: parseInt(quantity, 10) };
  }).filter(d => d.quantity > 0);

  const totalDesigns = order.reduce((sum, d) => sum + d.quantity, 0);
  console.log("Order submitted:", order, "Total designs:", totalDesigns);
  alert(`Order submitted! Total designs: ${totalDesigns}`);
}

renderLogin();
