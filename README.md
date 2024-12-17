# Demo Credit Wallet Service API

A mobile lending app with wallet functionality that allows users to create accounts, fund their wallets, transfer funds, and withdraw funds.

## Features

- User account creation and authentication
- Wallet management
- Fund transfers between users
- Wallet funding
- Fund withdrawals
- Transaction history
- Real-time balance checking

## API Endpoints

### Authentication Routes

#### Register New User

```
POST /api/v1/auth/register
```

Request body:

```json
{
  "username": "string",
  "email": "string",
  "phone_number": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string"
}
```

Response:

```json
{
  "message": "Account created successfully",
  "token": "jwt_token"
}
```

#### Login

```
POST /api/v1/auth/login
```

Request body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "jwt_token"
}
```

### Wallet Routes

#### Fund Wallet

```
POST /api/v1/wallet/fund
```

Request body:

```json
{
  "amount": "number",
  "payment_method": "string"
}
```

Response:

```json
{
  "message": "Wallet funded successfully",
  "transaction_id": "string"
}
```

#### Transfer Funds

```
POST /api/v1/wallet/transfer
```

Request body:

```json
{
  "recipient_email": "string",
  "amount": "number",
  "note": "string"
}
```

Response:

```json
{
  "message": "Transfer successful",
  "transaction_id": "string"
}
```

#### Withdraw Funds

```
POST /api/v1/wallet/withdraw
```

Request body:

```json
{
  "amount": "number",
  "bank_account": {
    "account_number": "string",
    "bank_code": "string"
  }
}
```

Response:

```json
{
  "message": "Withdrawal initiated successfully",
  "transaction_id": "string"
}
```

#### Get Wallet Balance

```
GET /api/v1/wallet/balance
```

Response:

```json
{
  "balance": "number",
  "currency": "string"
}
```

#### Get All Transactions

```
GET /api/v1/wallet/transactions
```

Query parameters:

- page (optional): number
- limit (optional): number

Response:

```json
{
  "transactions": [
    {
      "id": "string",
      "amount": "number",
      "type": "string",
      "status": "string",
      "created_at": "datetime",
      "metadata": "object"
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "pages": "number"
  }
}
```

#### Get Single Transaction

```
GET /api/v1/wallet/transaction?id=""
```

Response:

```json
{
  "id": "string",
  "amount": "number",
  "type": "string",
  "status": "string",
  "created_at": "datetime",
  "metadata": "object"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. All wallet endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Responses

The API returns appropriate HTTP status codes and error messages:

```json
{
  "error": "Error message description"
}
```

Common status codes:

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Installation

1. Clone the repository

```bash
git clone https://github.com/Ennyolar96/lendsqr.git
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Run migrations

```bash
npx knex --knexfile knexfile.js migrate:latest
```

5. Start the server

```bash
npm start
```

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=demo_credit
JWT_SECRET=your_jwt_secret
```

## Database Schema

The service uses MySQL with the following main tables:

- users
- wallets
- transactions

## Running Tests

```bash
npm test
```

## License

[MIT](LICENSE)
