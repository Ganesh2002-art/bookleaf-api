const authors = [
  { id: 1, name: "Priya Sharma", email: "priya@email.com" },
  { id: 2, name: "Rahul Verma", email: "rahul@email.com" },
  { id: 3, name: "Anita Desai", email: "anita@email.com" }
];

const books = [
  { id: 1, title: "The Silent River", authorId: 1, royalty: 45 },
  { id: 2, title: "Midnight in Mumbai", authorId: 1, royalty: 60 },
  { id: 3, title: "Code & Coffee", authorId: 2, royalty: 75 },
  { id: 4, title: "Startup Diaries", authorId: 2, royalty: 50 },
  { id: 5, title: "Poetry of Pain", authorId: 2, royalty: 30 },
  { id: 6, title: "Garden of Words", authorId: 3, royalty: 40 }
];

const sales = [
  { bookId: 1, quantity: 25, date: "2025-01-05" },
  { bookId: 1, quantity: 40, date: "2025-01-12" },
  { bookId: 2, quantity: 15, date: "2025-01-08" },
  { bookId: 3, quantity: 60, date: "2025-01-03" },
  { bookId: 3, quantity: 45, date: "2025-01-15" },
  { bookId: 4, quantity: 30, date: "2025-01-10" },
  { bookId: 5, quantity: 20, date: "2025-01-18" },
  { bookId: 6, quantity: 10, date: "2025-01-20" }
];

const withdrawals = [];

module.exports = { authors, books, sales, withdrawals };
