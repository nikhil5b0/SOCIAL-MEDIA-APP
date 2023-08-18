const mongoose = require("mongoose");
// Middleware
const db = 'mongodb+srv://social-media:social-media@social-media.fthgzkv.mongodb.net/?retryWrites=true&w=majority'
// Connect to MongoDB using the connection string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017