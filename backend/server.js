
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/api/submit-order", (req, res) => {
  const { orderDetails, totalPrints } = req.body;

  const report = `Order Report:\n\n` +
    orderDetails.map(item => `Design: ${item.name}, Quantity: ${item.quantity}`).join("\n") +
    `\n\nTotal Prints: ${totalPrints}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password"
    }
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "your-email@gmail.com",
    subject: "New Print Order",
    text: report
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Order submitted successfully!" });
    }
  });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
