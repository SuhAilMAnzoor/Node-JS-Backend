import express from "express";

const app = express();

// app.get("/", (req, res) => {
//     res.send("Server is Ready");
// });

    // get a list of 5 jokes
app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "A joke",
            content: "This is a joke"
        },
        {
            id: 2,
            title: "Another joke",
            content: "This is another joke"
        },
        {
            id: 3,
            title: "Yet another joke",
            content: "This is yet another joke"
        },
        {
            id: 4,
            title: "A funny joke",
            content: "This is a funny joke"
        },
        {
            id: 5,
            title: "A final joke",
            content: "This is a final joke"
        }
    ];
    res.json(jokes);
});


const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});