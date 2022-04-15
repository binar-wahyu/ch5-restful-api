const express = require("express");
const articles = require("./data");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/articles", (req, res) => {
  res.status(200).json(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const article = articles.find((e) => e.id === Number(req.params.id));
  res.status(200).json(article);
});

app.post("/api/articles", (req, res) => {
  // Destructuring
  const { title, body } = req.body;

  // Dapatkan ID dari item terakhir
  const lastId = articles[articles.length - 1].id;
  const newId = lastId + 1;

  const article = {
    id: newId,
    title: title,
    body: body,
  };

  articles.push(article);

  res.status(201).json(article);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
