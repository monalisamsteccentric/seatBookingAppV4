import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import mongo_url from "./config.js";
import getRoute from "./routes/getRoute.js"
import postRoute from "./routes/postRoute.js"
// import Seat from "./models/SeatModel.js";

// const currentModuleUrl = new URL(import.meta.url);
// const currentModulePath = currentModuleUrl.pathname;

// Initialize express
const app = express();

// app.use(express.static(path.join(currentModulePath, './client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(currentModulePath, './client/build/index.html'));
// });


// Set the strict query to false to avoid any errors
mongoose.set('strictQuery', false)



// Use JSON format for requests and responses
app.use(express.json());

// Use CORS for allowing cross-origin requests
app.use(cors());

app.use('/api/seats', getRoute)
app.use('/api/book', postRoute)


const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(mongo_url, (err) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log('db connected')
  }
});



// Code to add documents to the database (This is used only once)

// const docs = [];
// for (let i = 1; i <= 80; i++) {
//   let rn = Math.floor((i-1)/7)
//   docs.push({
//     seatNumber: i,
//     isAvailable: true,
//     rowNumber: rn
//   });
// }

// Seat.create(docs, function (err, docs) {
//   if (err) return handleError(err);
//   console.log("docs added");
// });

// Start the express server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


