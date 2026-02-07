📚 BookLeaf Author Royalty API

A simple REST API built for managing authors, book sales, royalty earnings, and withdrawal requests.
This project was developed as part of the BookLeaf – Junior Full Stack Developer (Round 1) technical assignment.

🚀 Live API URL
https://bookleaf-api-qgml.onrender.com

🛠 Tech Stack

Backend: Node.js + Express

Storage: In-memory JavaScript objects (as allowed in assignment)

CORS: Enabled for all origins

Deployment: Render (Free Tier)

Why this stack?
Node.js and Express allow fast development of clean REST APIs, and in-memory storage keeps the solution simple and focused on business logic as required.

📊 Core Business Logic

Total Earnings = Sum of (copies sold × royalty per sale)

Current Balance = total earnings − total withdrawals

All earnings are calculated dynamically from sales data to ensure accuracy.

🔗 API Endpoints
1️⃣ Get All Authors
GET /authors


Returns all authors with:

id

name

total_earnings

current_balance

2️⃣ Get Author Details
GET /authors/:id


Returns:

Author details

Total earnings & balance

Book list with total sales and royalties

404 if author not found.

3️⃣ Get Author Sales
GET /authors/:id/sales


Returns all sales for an author’s books

Sorted by newest sale first

4️⃣ Create Withdrawal (Important)
POST /withdrawals


Request Body

{
  "author_id": 1,
  "amount": 2000
}


Validation Rules

Minimum withdrawal: ₹500

Amount cannot exceed current balance

Author must exist

On success

Status: 201 Created

Withdrawal stored with pending status

Updated balance returned

5️⃣ Get Author Withdrawals
GET /authors/:id/withdrawals


Returns all withdrawals for an author, sorted by newest first.

🧪 Testing

Tested locally using Postman

Validated both success and failure scenarios:

Minimum withdrawal rule

Insufficient balance

Invalid author

Deployed API verified via browser and Postman

Example:

GET https://bookleaf-api-qgml.onrender.com/authors

⚠️ Notes & Assumptions

Data is stored in-memory, so it resets when the server restarts (expected and acceptable for this assignment).

No authentication was required as per the assignment scope.

Render free tier may take ~30 seconds to wake up after inactivity.

⏱ Time Spent

Approx. 3–4 hours, including:

Logic design

Implementation

Local testing

Deployment

Documentation

👤 Author

Devana SIva Naga Ganesh Babi
Junior Full Stack Developer Candidate

GitHub Repository:

https://github.com/Ganesh2002-art/bookleaf-api
