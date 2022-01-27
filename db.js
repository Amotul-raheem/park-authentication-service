import mongoose from "mongoose";


try{
    mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log ("Server is up and running:"));
} catch (error){
    console.log(error.message)
}

