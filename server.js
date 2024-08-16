const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://abaffyacostac:yAjh2GwjRXwgIDYK@cluster0.d0mojbq.mongodb.net/BookDB";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// import routes
const bookRouter = require('./routes/books');

// adding /books to before all routes
app.use('/api/v1/book', bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

