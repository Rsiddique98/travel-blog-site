import express from "express";


const app = express();
const port = 3000;

// Middleware

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.use(express.static("public"));
app.set('view engine', 'ejs');

// routes 
app.get("/", (req, res) => {
    res.render('index.ejs');
});

app.get("/create", (req, res) => {
    res.render('create.ejs');
});

app.get("/edit", (req, res) => {
    res.render('edit.ejs');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})