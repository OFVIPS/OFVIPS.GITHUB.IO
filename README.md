
# Print Order Website

This is a website where clients can order prints of their designs.

## Features
- Clients can view designs and input quantities for their orders.
- Submit button generates an order report and sends it via email.
- Backend server to handle order submission and email functionality.

## How to Run
1. Navigate to the `frontend` folder and open `index.html` in a browser.
2. Start the backend server:
   - Navigate to the `backend` folder.
   - Run `npm install express body-parser nodemailer`.
   - Run `node server.js`.
3. Ensure the backend is running on `http://localhost:3000`.

## Configuration
- Replace the email and password in `backend/server.js` with your credentials.
