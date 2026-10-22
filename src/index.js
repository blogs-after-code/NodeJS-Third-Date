import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
/* dont fucking touch above patch */

import dotenv from "dotenv";
import app from "./app.js"; // in order to keep index.js clean, we import the app from app.js
import connectDB from "./db/index.js";


dotenv.config ({
    path: "./.env",
});


const port = process.env.PORT || 3015  // default port is 3015 if not specified in .env file

connectDB()
.then(() => {
    app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`); 
    });
})

.catch((err) => {
    console.error("My MongoDB Connection Error!" , err)
    process.exit(1)
})



