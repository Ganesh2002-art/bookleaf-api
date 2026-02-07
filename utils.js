const { books, sales, withdrawals } = require("./data");

function calculateEarnings(authorId) {
  let total = 0;

  books
    .filter(b => b.authorId === authorId)
    .forEach(book => {
      sales
        .filter(s => s.bookId === book.id)
        .forEach(sale => {
          total += sale.quantity * book.royalty;
        });
    });

  return total;
}

function calculateBalance(authorId) {
  const earnings = calculateEarnings(authorId);
  const withdrawn = withdrawals
    .filter(w => w.authorId === authorId)
    .reduce((sum, w) => sum + w.amount, 0);

  return earnings - withdrawn;
}

module.exports = { calculateEarnings, calculateBalance };
