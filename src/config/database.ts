import mongoose from "mongoose";

 async function connect(
  db_user: string,
  db_pass: string,
  db_host: string,
  db_name: string
) {
  try {
    const mongoDBConnectionString = `mongodb+srv://${db_user}:${db_pass}@${db_host}/${db_name}?retryWrites=true&w=majority`;

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
        const db_user = process.env.DB_USER;
        const db_pass = process.env.DB_PASS;
        const db_host = process.env.DB_HOST;
        const db_name = process.env.DB_NAME;
  
        if (db_user === undefined || db_pass === undefined || db_host === undefined || db_name === undefined) {
            return ("Error in database connection");
        }
  
        // Connect to MongoDB
        await connect(db_user, db_pass, db_host, db_name);
  
    } catch (error) {
        console.log("Error Connecting to Database", error);
    }
  }