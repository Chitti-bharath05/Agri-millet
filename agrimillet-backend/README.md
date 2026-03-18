# AgriMillet Backend

AgriMillet is a marketplace app for buying and selling millets in India, connecting farmers directly with buyers.

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend folder:
```bash
cd agrimillet-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrimillet
JWT_SECRET=your_jwt_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=development
```

### Database Setup

1. Make sure MongoDB is running
2. Seed the government prices:
```bash
node seed.js
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on http://localhost:5000

## API Documentation

### Authentication Routes
- `POST /api/auth/signup` - Register a new user (farmer/buyer)
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/logout` - Logout (protected)

### Crop Routes
- `POST /api/crops/upload` - Upload crop (farmer only)
- `GET /api/crops/marketplace` - View marketplace crops
- `GET /api/crops/search` - Search crops
- `GET /api/crops/my-crops` - Get farmer's crops
- `GET /api/crops/:cropId` - Get crop details
- `DELETE /api/crops/:cropId` - Remove crop (farmer only)
- `GET /api/crops/price/government` - Get government prices

### Transaction Routes
- `POST /api/transactions/create-order` - Create payment order
- `POST /api/transactions/verify-payment` - Verify payment
- `GET /api/transactions/my-transactions` - Get user's transactions
- `GET /api/transactions/:transactionId` - Get transaction details
- `PUT /api/transactions/delivery-status` - Update delivery and GPS

### Chat Routes
- `POST /api/chat/message` - Send chat message
- `GET /api/chat/history` - Get chat history

## Features
- User authentication with JWT
- Farmer and buyer registration
- Crop upload and marketplace
- Government price display
- Payment gateway integration (Razorpay)
- Delivery tracking with GPS
- AI Chatbot with multilingual support
- Transaction management

## Database Models
- **User**: Stores user information and banking details
- **Crop**: Stores crop information uploaded by farmers
- **Transaction**: Manages crop purchases and payments
- **GovernmentPrice**: Stores government-set prices for millets
- **Chat**: Stores chat messages and history

## Technologies
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Razorpay - Payment Gateway
- bcryptjs - Password hashing

## Notes
- All protected routes require JWT token in Authorization header
- Government prices should be updated regularly
- Razorpay credentials are required for payment processing
