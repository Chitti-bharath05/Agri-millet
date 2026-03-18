# AgriMillet - Complete Project Documentation

## Project Overview

AgriMillet is an innovative marketplace application that directly connects millet farmers with buyers across India. The application eliminates middlemen and facilitates transparent transactions with government-set price comparisons, integrated payments, and real-time delivery tracking.

## Application Architecture

### Technology Stack

**Backend**
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Payment Gateway: Razorpay
- Package Manager: npm

**Frontend (Android Mobile)**
- Framework: Flutter
- Language: Dart
- State Management: Provider
- Local Storage: SharedPreferences
- Maps: Google Maps Flutter
- Payment Integration: Razorpay SDK
- TTS/STT: Flutter TTS, Speech to Text

**DevOps & Deployment**
- Build: Gradle (Android)
- Package Manager: Flutter pub, npm
- Version Control: Git

## Database Schema

### User Collection
```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  mobileNo: String (unique, 10 digits),
  userType: String (farmer/buyer),
  state: String,
  district: String,
  bankingDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    accountHolderName: String,
    upiId: String
  },
  profileComplete: Boolean,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Crop Collection
```
{
  _id: ObjectId,
  farmerId: ObjectId (ref: User),
  farmerState: String,
  farmerDistrict: String,
  milletType: String (enum),
  quantity: Number (kg),
  harvestDate: DateTime,
  market: String (state/national),
  expectedPrice: Number (per kg),
  governmentPrice: Number (per kg),
  status: String (available/sold/removed),
  images: [String],
  description: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Transaction Collection
```
{
  _id: ObjectId,
  cropId: ObjectId (ref: Crop),
  farmerId: ObjectId (ref: User),
  buyerId: ObjectId (ref: User),
  quantity: Number,
  pricePerKg: Number,
  totalAmount: Number,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  paymentStatus: String (pending/completed/failed),
  deliveryStatus: String (pending/in-transit/delivered/cancelled),
  gpsCordinates: [
    {
      latitude: Number,
      longitude: Number,
      timestamp: DateTime,
      address: String
    }
  ],
  farmerReceipt: String (URL),
  buyerReceipt: String (URL),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### GovernmentPrice Collection
```
{
  _id: ObjectId,
  milletType: String,
  state: String,
  pricePerKg: Number,
  lastUpdated: DateTime
}
```

### Chat Collection
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  messages: [
    {
      sender: String (user/bot),
      text: String,
      language: String,
      timestamp: DateTime
    }
  ],
  language: String (default: en),
  createdAt: DateTime
}
```

## API Endpoints

### Authentication APIs
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout

### Crop APIs
- `POST /api/crops/upload` - Upload crop (farmer)
- `GET /api/crops/marketplace` - Get marketplace crops
- `GET /api/crops/my-crops` - Get farmer's crops
- `GET /api/crops/:cropId` - Get crop details
- `DELETE /api/crops/:cropId` - Remove crop (farmer)
- `GET /api/crops/search` - Search crops
- `GET /api/crops/price/government` - Get government prices

### Transaction APIs
- `POST /api/transactions/create-order` - Create payment order
- `POST /api/transactions/verify-payment` - Verify payment
- `GET /api/transactions/my-transactions` - Get user transactions
- `GET /api/transactions/:transactionId` - Get transaction details
- `PUT /api/transactions/delivery-status` - Update delivery & GPS

### Chat APIs
- `POST /api/chat/message` - Send chat message
- `GET /api/chat/history` - Get chat history

## User Flow Diagrams

### Farmer Registration & Crop Upload Flow
```
Signup → Enter Details → Choose Farmer → Enter Bank/UPI → Profile Created
       ↓
Upload Crop → Select Millet Type → Enter Quantity → Select Market
       ↓
Set Expected Price → View Gov Price → Confirm Upload → Crop Listed
       ↓
Awaiting Purchase → Buyer Contacts → Accept Order → Update Tracking
```

### Buyer Browsing & Purchase Flow
```
Login → Browse Marketplace → Filter by State/National
    ↓
View Crops → Compare Gov & Farmer Prices → Select Crop → View Details
    ↓
Contact Farmer → View Mobile No → Accept Order → Click Buy
    ↓
Payment Gateway → Complete Payment → Get Receipt → Track Delivery
```

## Key Features Breakdown

### 1. Authentication & Authorization
- Email and phone-based registration
- Role-based access (farmer/buyer)
- JWT token-based authentication
- Secure password hashing with bcryptjs
- Profile completion tracking
- Token refresh mechanism
- Session management

### 2. Crop Management (Farmer)
- CRUD operations on crops
- Multiple millet type support
- Market selection (state/national filtering)
- Quantity tracking
- Harvest date management
- Image upload capability
- Government price comparison
- Crop status management (available/sold/removed)

### 3. Marketplace & Discovery (Buyer)
- State-level marketplace filtering
- National marketplace access
- Search functionality
- Crop filtering by type
- Price comparison (gov vs farmer)
- Pagination for performance
- Crop details view
- Farmer information display

### 4. Payment & Transactions
- Razorpay integration
- Order creation and verification
- Payment status tracking
- Transaction history
- Receipt generation (farmer & buyer)
- Automatic crop removal after sale
- Quantity deduction management

### 5. Delivery & Tracking
- GPS coordinate submission by farmer
- Real-time location tracking for buyer
- Delivery status updates (pending/in-transit/delivered)
- Address capture at each update
- Automatic crop removal on delivery completion
- Delivery confirmation to both parties

### 6. AI Chatbot & Voice Assistant
- Natural language understanding (simple rule-based initially)
- Multilingual support (8 Indian languages)
- Voice input via speech-to-text
- Voice output via text-to-speech
- FAQ integration
- Context-aware responses
- Chat history persistence

### 7. User Profile & Settings
- Complete profile management
- Banking details update
- UPI ID management
- State/district updates
- Profile completion percentage
- Settings and preferences

## Security Measures

1. **Password Security**
   - Hashed with bcryptjs (10 salt rounds)
   - Minimum 6 characters required
   - Not returned in API responses

2. **Authentication**
   - JWT tokens with 30-day expiration
   - Bearer token in Authorization header
   - Token refresh mechanism
   - Secure token storage (SharedPreferences with encryption)

3. **Authorization**
   - Route protection with middleware
   - Role-based access control
   - User can only access own data
   - Farmer-specific and buyer-specific operations

4. **Data Protection**
   - Mobile number shown only to authorized parties
   - Banking details not exposed in APIs
   - Transaction records for audit trail
   - Encrypted payment information

5. **API Security**
   - CORS enabled for allowed origins
   - Input validation on all endpoints
   - Rate limiting (to be implemented)
   - Request/response encryption (optional)

## Deployment Instructions

### Backend Deployment (Node.js)

1. **Local Development**
```bash
cd agrimillet-backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and Razorpay keys
npm run dev
```

2. **Production Deployment (Heroku)**
```bash
npm install -g heroku-cli
heroku login
heroku create agrimillet-backend
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set RAZORPAY_KEY_ID=your_key
heroku config:set RAZORPAY_KEY_SECRET=your_secret
git push heroku main
```

3. **Docker Deployment**
```bash
docker build -t agrimillet-backend .
docker run -p 5000:5000 --env-file .env agrimillet-backend
```

### Frontend Deployment (Flutter)

1. **Build APK for Distribution**
```bash
cd agrimillet-frontend
flutter build apk --release
# APK location: build/app/outputs/apk/release/app-release.apk
```

2. **Build App Bundle for Play Store**
```bash
flutter build appbundle --release
# Bundle location: build/app/outputs/bundle/release/app-release.aab
```

3. **Play Store Submission**
- Create Google Play Developer account
- Create app in Play Console
- Upload app bundle
- Add store listing, screenshots, description
- Submit for review

## Testing Strategy

### Backend Testing
```bash
npm test  # Run all tests
npm test -- --coverage  # With coverage report
npm test -- auth.test.js  # Specific test file
```

### Frontend Testing
```bash
flutter test  # All tests
flutter test test/models/user_test.dart  # Specific test
flutter test --coverage  # With coverage
```

### Manual Testing Checklist
- [ ] User signup with all fields
- [ ] User login with credentials
- [ ] Farmer crop upload
- [ ] Marketplace browsing (state/national)
- [ ] Search functionality
- [ ] Price comparison
- [ ] Payment flow
- [ ] Delivery tracking
- [ ] Chatbot functionality
- [ ] Voice assistant
- [ ] Logout functionality
- [ ] Profile update
- [ ] Banking details update

## Performance Optimization

1. **Backend**
   - Database indexing on frequently queried fields
   - Pagination for list endpoints
   - Caching with Redis (optional)
   - API response compression (gzip)

2. **Frontend**
   - Image lazy loading
   - List pagination
   - Efficient state management
   - Build size optimization
   - APK compression

## Monitoring & Logging

### Backend Logging
- Error tracking with error responses
- Request/response logging
- MongoDB operation logging
- API performance metrics

### Frontend Analytics
- User action tracking
- Error reporting
- Performance monitoring
- Crash analytics

## Maintenance & Updates

### Regular Updates
- Monthly security patches
- Quarterly feature releases
- Seasonal government price updates
- Government price data refresh (monthly)

### User Support
- In-app help/FAQ
- Chatbot support 24/7
- Email support channel
- Community forums

## Future Roadmap

### Phase 2
- Video conferencing between farmer and buyer
- Auction system for price discovery
- Weather integration for crop recommendations
- Soil quality assessment APIs

### Phase 3
- Government subsidy integration
- Crop insurance partnership
- Supply chain analytics
- B2B wholesale features

### Phase 4
- Farmer cooperative networking
- Predictive analytics for market trends
- Mobile payment wallet
- Blockchain for transaction verification

## Estimated Development Timeline

- Backend setup & APIs: 4 weeks
- Frontend screens & integration: 6 weeks
- Payment integration: 2 weeks
- Testing & QA: 3 weeks
- Deployment & launch: 2 weeks

**Total: ~17 weeks for MVP**

## Success Metrics

1. **User Adoption**
   - Active monthly users
   - Signup conversion rate
   - User retention rate

2. **Transaction Metrics**
   - Total transactions
   - Average transaction value
   - Transaction success rate

3. **Market Coverage**
   - States covered
   - Districts covered
   - Unique farmer count
   - Unique buyer count

4. **Financial Metrics**
   - Platform revenue
   - Commission collected
   - Total GMV (Gross Merchandise Value)

## Support & Contact

- **Project Lead**: Team Lead
- **Backend Developer**: Full Stack Developer
- **Frontend Developer**: Mobile Developer
- **Email**: support@agrimillet.com
- **Documentation**: Full API and app documentation included

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Status**: In Development
