const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const postRoutes=require("./routes/postRoutes")
const commentRoutes=require("./routes/commentRoutes")
dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/post",postRoutes)
app.use("/api/comment",commentRoutes)

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "BlogApp"
    })
    .then(() => {
        console.log("connected to Database");
    })
    .catch((err) => {
        console.log(err);
    });
});