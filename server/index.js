import express from 'express';
;import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import postRoutes from './routes/posts.js'

const app = express();

// middleware. Starting point for all the routes. Every route inside of the post routes is going to start with /posts 
app.use('/posts', postRoutes);

// sending some images which can be large in size
app.use(bodyParser.json({ limit: "30mb", extended: true })); 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://aishwarya:aish@cluster0.zpjrzoi.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false)