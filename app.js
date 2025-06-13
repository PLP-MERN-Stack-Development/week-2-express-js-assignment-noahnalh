const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./utils/errorHandler");

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

app.use("/api/products", productRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
