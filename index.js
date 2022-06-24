import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


import rootRouter from "./router/root.js";

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());


// app.use("/book",bookRouter);
// app.use("/review",reviewRouter);
app.use("/",rootRouter);

const PORT = process.env.PORT || 3009;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})
