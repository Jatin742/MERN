const app=require("./app");
const dotenv=require("dotenv").config();
const connectToMongo =require("./db.js");
const PORT=process.env.PORT||4000;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectToMongo();

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT ${PORT}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });