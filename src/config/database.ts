import mongoose from "mongoose";

 async function connect(
mongoURL:string
) {
  try {
    const mongoDBConnectionString = mongoURL;

    await mongoose.connect(mongoDBConnectionString).then(
   ()=>{console.log("Connected to DB");
   }
   
    ).catch((Error)=>console.log("error")
    );
  

    // console.log("MongoDB connection successful");
    return mongoose.connection; // Return the mongoose connection object
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // You might want to handle this error in the calling code
  }
}


export async function startServer() {
    try {
        const db = process.env.mongoURL;
        
  
        if (db === undefined ) {
            return ("Error in database connection");
        }
  
        // Connect to MongoDB
        await connect(db);
  
    } catch (error) {
        console.log("Error Connecting to Database", error);
    }
  }