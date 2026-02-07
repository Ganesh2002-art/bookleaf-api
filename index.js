const express = require("express");
const cors = require("cors");

const { authors, books, sales, withdrawals } = require("./data");
const { calculateEarnings, calculateBalance } = require("./utils");

const app = express();
app.use(cors());
app.use(express.json());

/* 1️⃣ GET /authors */
app.get("/authors", (req, res) => {
  const result = authors.map(author => ({
    id: author.id,
    name: author.name,
    total_earnings: calculateEarnings(author.id),
    current_balance: calculateBalance(author.id)
  }));
  res.json(result);
});

/* 2️⃣ GET /authors/:id */
app.get("/authors/:id", (req, res) => {
  const authorId = Number(req.params.id);
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorBooks = books.filter(b => b.authorId === authorId);

  const booksData = authorBooks.map(book => {
    const bookSales = sales.filter(s => s.bookId === book.id);
    const totalSold = bookSales.reduce((sum, s) => sum + s.quantity, 0);

    return {
      id: book.id,
      title: book.title,
      royalty_per_sale: book.royalty,
      total_sold: totalSold,
      total_royalty: totalSold * book.royalty
    };
  });

  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    total_books: booksData.length,
    total_earnings: calculateEarnings(authorId),
    current_balance: calculateBalance(authorId),
    books: booksData
  });
});

/* 3️⃣ GET /authors/:id/sales */
app.get("/authors/:id/sales", (req, res) => {
  const authorId = Number(req.params.id);

  const authorBooks = books.filter(b => b.authorId === authorId);
  if (authorBooks.length === 0) {
    return res.status(404).json({ error: "Author not found" });
  }

  let result = [];

  authorBooks.forEach(book => {
    sales
      .filter(s => s.bookId === book.id)
      .forEach(sale => {
        result.push({
          book_title: book.title,
          quantity: sale.quantity,
          royalty_earned: sale.quantity * book.royalty,
          sale_date: sale.date
        });
      });
  });

  result.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
  res.json(result);
});

/* 4️⃣ POST /withdrawals */
app.post("/withdrawals", (req, res) => {
  const { author_id, amount } = req.body;
  const author = authors.find(a => a.id === author_id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  if (amount < 500) {
    return res.status(400).json({ error: "Minimum withdrawal is ₹500" });
  }

  const balance = calculateBalance(author_id);
  if (amount > balance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const withdrawal = {
    id: withdrawals.length + 1,
    authorId: author_id,
    amount,
    status: "pending",
    created_at: new Date()
  };

  withdrawals.push(withdrawal);

  res.status(201).json({
    ...withdrawal,
    new_balance: calculateBalance(author_id)
  });
});

/* 5️⃣ GET /authors/:id/withdrawals */
app.get("/authors/:id/withdrawals", (req, res) => {
  const authorId = Number(req.params.id);

  const result = withdrawals
    .filter(w => w.authorId === authorId)
    .sort((a, b) => b.created_at - a.created_at);

  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
