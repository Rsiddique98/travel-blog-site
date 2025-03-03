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

app.get("/post1", (req, res) => {
    res.render('post1.ejs');
});

app.get("/post2", (req, res) => {
    res.render('post2.ejs');
});

app.get("/post3", (req, res) => {
    res.render('post3.ejs');
});

app.get("/post4", (req, res) => {
    res.render('post4.ejs');
});

app.get("/post5", (req, res) => {
    res.render('post5.ejs');
});

app.get("/post6", (req, res) => {
    res.render('post6.ejs');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})