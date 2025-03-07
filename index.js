import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


// Middleware

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true }));


// Multer middleware for image uploads

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage: storage });

// routes 
app.get("/", (req, res) => {
    res.render('index.ejs', { blogPosts });
});

app.get("/create", (req, res) => {
    res.render('create.ejs');
});

app.get("/edit", (req, res) => {
    res.render('edit.ejs', { blogPosts });
});

// route to render individual blog post pages

app.get("/post/:id", (req, res) => {
    const { id } = req.params; // Gets the ID from the URL
    const post = blogPosts[id]; // Finds the post by its ID

    if (post) {
        res.render('posts.ejs', { post }); // Passes the post to the view
    } else {
        res.status(404).send('Post not found');
    }
});



// Route to edit a specific post

app.get("/edit/:id", (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    const post = blogPosts[id]; // Find the post by its ID

    if (post) {
        res.render('edit-form.ejs', { post, id }); // Pass the post and its ID to the view
    } else {
        res.status(404).send('Post not found');
    }
});

// Route to handle an update post request

app.post("/edit/:id", upload.single("image"), (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    const { title, author, date, content } = req.body;
    const image = req.file ? "/uploads/" + req.file.filename : blogPosts[id].image; // Use existing image if not updated

    // Update the post in the array
    blogPosts[id] = { title, author, date, image, content };

    res.redirect("/edit"); // Redirect back to the manage entries page
});

// Route to delete a post

app.post("/delete/:id", (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    blogPosts.splice(id, 1); // Remove the post from the array by its ID

    res.redirect("/edit"); // Redirect back to the manage entries page
});


// Blog posts storage 

let blogPosts = [
    {
        title: "Exploring Slovenia: Lake Bled",
        author: "Rida Siddique",
        date: "09/09/2024",
        image: "/images/Lake-bled.jpg",
        content: "A journey through the breathtaking landscapes of Slovenia. A journey through the breathtaking landscapes of Slovenia.A journey through the breathtaking landscapes of Slovenia. A journey through the breathtaking landscapes of Slovenia.A journey through the breathtaking landscapes of Slovenia. A journey through the breathtaking landscapes of Slovenia.A journey through the breathtaking landscapes of Slovenia. A journey through the breathtaking landscapes of Slovenia.A journey through the breathtaking landscapes of Slovenia. A journey through the breathtaking landscapes of Slovenia.A journey through the breathtaking landscapes of Slovenia. A journey through the breathtaking landscapes of Slovenia.",
    },
    {
        title: "Osaka: A Food Lover’s Paradise",
        author: "Rida Siddique",
        date: "11/12/2024",
        image: "/images/Tsutenkaku.jpg",
        content: "From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.From street food in Dotonbori to Michelin stars, Osaka has it all. From street food in Dotonbori to Michelin stars, Osaka has it all.",
    },

    {
        title: "12 Hours in Shanghai",
        author: "Rida Siddique",
        date: "12/12/2024",
        image: "/images/The-Bund.jpg",
        content: "The most unforgettable skyline by The Bund to the world's longest shopping district, Nanjing Road, here's why Shanghai should be your next travel destination.",
    },

    {
        title: "The Charms of Kyoto, Japan",
        author: "Rida Siddique",
        date: "15/12/2024",
        image: "/images/arashiyama.jpg",
        content: "From Arashiyama to the Gion district, here's why Kyoto should be at the top of your list of places to hit up when exploring Japan's Kansai region.",
    },

    {
        title: "Exploring The Dolomites in Northeastern Italy",
        author: "Rida Siddique",
        date: "12/09/2024",
        image: "/images/Lago-di-Carezza.jpg",
        content: "Beautiful emerald green waters to the iconic three peaks of Laveredo, there's so much to see in the Dolomites.Beautiful emerald green waters to the iconic three peaks of Laveredo, there's so much to see in the Dolomites.Beautiful emerald green waters to the iconic three peaks of Laveredo, there's so much to see in the Dolomites.Beautiful emerald green waters to the iconic three peaks of Laveredo, there's so much to see in the Dolomites.Beautiful emerald green waters to the iconic three peaks of Laveredo, there's so much to see in the Dolomites.Beautiful emerald green waters to the iconic three peaks of Laveredo, there's so much to see in the Dolomites.Beautiful emerald green waters to the iconic three peaks of Laveredo, there's so much to see in the Dolomites.Beautiful emerald green waters to the iconic three peaks of Laveredo, there's so much to see in the Dolomites.",
    },

    {
        title: "A day trip to Nara, Japan",
        author: "Rida Siddique",
        date: "20/12/2024",
        image: "/images/Nara.jpg",
        content: "Less than an hour away by train from Kyoto and Osaka, Nara is the perfect place to spend a wholesome day taking in the natural beauty, eating fresh mochi and roaming around the deer park!",
    },
];


// Handle blog post submissions

app.post("/create", upload.single("image"), (req, res) => {
    const { title, author, date, content } = req.body;
    const image = req.file ? "/uploads/" + req.file.filename : "/images/default.jpg"; // Default image fallback

    const newPost = { title, author, date, image, content };
    blogPosts.push(newPost);

    res.redirect("/");
});



app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})