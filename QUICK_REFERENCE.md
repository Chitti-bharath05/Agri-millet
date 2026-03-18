# AgriMillet - Quick Reference Guide

## Project Directory

```
d:\SIP\
├── agrimillet-backend/          # Node.js API Server
├── agrimillet-frontend/         # Flutter Mobile App
├── INSTALLATION_SETUP_GUIDE.md  # Step-by-step setup
├── agrimillet-project-overview.md
├── DELIVERABLES_SUMMARY.md      # What's been delivered
└── README.md                    # This file
```

---

## Quick Start (5 Minutes)

### Terminal 1: Start Backend
```bash
cd d:\SIP\agrimillet-backend
npm install
npm run dev
```
✅ Backend runs on `http://localhost:5000`

### Terminal 2: Start Frontend
```bash
cd d:\SIP\agrimillet-frontend
flutter pub get
flutter run
```
✅ App launches on emulator/device

---

## Test Credentials

### Buyer Account
```
Email: test.buyer@agrimillet.com
Password: TestPass123
Mobile: 9876543210
```

### Farmer Account
```
Email: test.farmer@agrimillet.com
Password: FarmerPass123
Mobile: 9876543211
Bank Account: 1234567890123456
IFSC: SBIN0001234
```

---

## Key Files Reference

### Backend

| File | Purpose |
|------|---------|
| `server.js` | Main entry point |
| `config/database.js` | MongoDB connection |
| `models/*.js` | Database schemas |
| `controllers/*.js` | Business logic |
| `routes/*.js` | API endpoints |
| `middleware/auth.js` | JWT verification |
| `seed.js` | Initialize data |

### Frontend

| File | Purpose |
|------|---------|
| `lib/main.dart` | App entry point |
| `lib/services/api_service.dart` | API client |
| `lib/providers/*.dart` | State management |
| `lib/screens/auth/*.dart` | Auth screens |
| `lib/screens/farmer/*.dart` | Farmer screens |
| `lib/screens/buyer/*.dart` | Buyer screens |
| `pubspec.yaml` | Dependencies |

---

## API Endpoints Quick Reference

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Crops
- `POST /api/crops/upload` - Upload crop (farmer)
- `GET /api/crops/marketplace` - List crops
- `GET /api/crops/my-crops` - Farmer's crops
- `GET /api/crops/:id` - Crop details
- `DELETE /api/crops/:id` - Delete crop

### Transactions
- `POST /api/transactions/create-order` - Create order
- `POST /api/transactions/verify-payment` - Verify payment
- `GET /api/transactions/my-transactions` - Transaction history
- `PUT /api/transactions/delivery-status` - Update delivery

### Chat
- `POST /api/chat/message` - Send message
- `GET /api/chat/history` - Get messages

---

## Common Tasks

### Add a New Dependency

**Backend:**
```bash
cd agrimillet-backend
npm install <package-name>
```

**Frontend:**
```bash
cd agrimillet-frontend
flutter pub add <package-name>
flutter pub get
```

### Connect to Different Backend

Edit `lib/services/api_service.dart`:
```dart
// Line ~11
static const String baseUrl = 'http://YOUR_IP:5000/api';
```

### Test API with Postman

1. Get token from login response
2. Add header: `Authorization: Bearer {token}`
3. Test any protected endpoint

### Build APK for Distribution

```bash
cd agrimillet-frontend
flutter build apk --release
# Find APK: build/app/outputs/apk/release/app-release.apk
```

---

## Troubleshooting Quick Fixes

| Error | Solution |
|-------|----------|
| "MongoDB connection failed" | Start MongoDB: `mongod` or MongoDB Atlas |
| "Port 5000 in use" | Kill process or change PORT in .env |
| "Flutter SDK not found" | Run `flutter doctor` and fix issues |
| "Emulator won't start" | Enable virtualization in BIOS |
| "App won't connect to API" | Check IP in api_service.dart matches backend |
| "npm packages fail" | `npm cache clean --force` and retry |

---

## Development Tips

### Hot Reload in Flutter
While running: Press `r` to reload, `R` for full restart

### Auto-reload Backend
Using `npm run dev` already has hot reload enabled

### Debug in VS Code
- Set breakpoints in code
- Run with debugger attached
- Inspect variables

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

### View MongoDB Data
```bash
mongosh
use agrimillet
db.users.find()
db.crops.find()
```

---

## Feature Checklist

### Core Features (✅ Built)
- [x] User Authentication
- [x] Farmer Registration
- [x] Buyer Registration
- [x] Crop Upload API
- [x] Marketplace API
- [x] Government Price API
- [x] Payment Gateway API
- [x] Delivery Tracking API
- [x] Chatbot API
- [x] JWT Security

### UI Screens (✅ Partially Done)
- [x] Splash Screen
- [x] Login Screen
- [x] Signup Screen
- [x] Farmer Home
- [x] Buyer Home
- [ ] Upload Crop Screen
- [ ] Crop Details Screen
- [ ] Payment Screen
- [ ] Tracking Screen
- [ ] Chat Screen
- [ ] Profile Screen

---

## Configuration Files

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrimillet
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
NODE_ENV=development
```

### Frontend `pubspec.yaml`
Manage dependencies here. After editing:
```bash
flutter pub get
```

---

## Testing

### Backend Tests
```bash
cd agrimillet-backend
npm test
```

### Frontend Tests
```bash
cd agrimillet-frontend
flutter test
```

---

## Database Schema

### Quick Schema Reference
```
User:
  - name, email, password, mobileNo
  - userType (farmer/buyer)
  - state, district
  - bankingDetails (for farmers)

Crop:
  - farmerId, milletType
  - quantity, harvestDate
  - market (state/national)
  - expectedPrice, governmentPrice
  - status (available/sold/removed)

Transaction:
  - cropId, farmerId, buyerId
  - amount, paymentStatus
  - deliveryStatus, gpsCordinates

GovernmentPrice:
  - milletType, state
  - pricePerKg, lastUpdated

Chat:
  - userId, messages[], language
```

---

## Deployment Checklist

### Before Production

Backend:
- [ ] Update `.env` with production values
- [ ] Enable HTTPS
- [ ] Setup database backups
- [ ] Configure rate limiting
- [ ] Setup error logging

Frontend:
- [ ] Update API base URL
- [ ] Update version number
- [ ] Optimize images
- [ ] Test on real device
- [ ] Sign APK/Bundle

---

## Useful Commands

```bash
# Backend
npm run dev              # Start dev server
npm test                 # Run tests
npm start                # Start production
node seed.js             # Seed data

# Frontend
flutter run              # Run app
flutter build apk        # Build APK
flutter test             # Run tests
flutter clean            # Clean build

# Database
mongod                   # Start MongoDB
mongosh                  # Connect to database
```

---

## Documentation Reference

| Document | Contains |
|----------|----------|
| INSTALLATION_SETUP_GUIDE.md | Setup instructions |
| agrimillet-project-overview.md | Architecture & design |
| DELIVERABLES_SUMMARY.md | What's been completed |
| backend/README.md | Backend docs & APIs |
| frontend/README.md | Frontend docs & features |
| This file | Quick reference |

---

## File Size Reference

- Backend with node_modules: ~200MB
- Frontend with dependencies: ~2GB
- MongoDB database: ~100MB (empty)

---

## Performance Tips

1. Use pagination for large lists
2. Cache images with CachedNetworkImage
3. Lazy load marketplace crops
4. Compress images before upload
5. Use connection pooling for DB
6. Implement request debouncing

---

## Security Reminders

- ✅ Never commit .env files
- ✅ Use HTTPS in production
- ✅ Hash passwords before storing
- ✅ Validate all inputs
- ✅ Use HTTPS for API calls
- ✅ Don't log sensitive data

---

## Next Steps After Setup

1. Run both backend and frontend
2. Create test accounts
3. Test login/logout
4. Browse marketplace
5. Try payment flow
6. Check delivery tracking
7. Test chatbot

---

## Contact Points

**Backend Issues:**
- Check `agrimillet-backend/server.js`
- Review `config/database.js`
- Check `.env` configuration

**Frontend Issues:**
- Check `lib/main.dart`
- Review `lib/services/api_service.dart`
- Check `api_service.dart` base URL

**API Integration Issues:**
- Check network connectivity
- Verify backend is running
- Check API base URL
- Review error responses in debugger

---

## Millet Types Supported

1. Finger Millet
2. Pearl Millet
3. Sorghum
4. Foxtail Millet
5. Kodo Millet
6. Barnyard Millet
7. Little Millet
8. Proso Millet

---

## Languages Supported

- English (en)
- Hindi (hi)
- Tamil (ta)
- Telugu (te)
- Kannada (kn)
- Marathi (mr)
- Gujarati (gu)
- Bengali (bn)

---

## Version Info

- **Backend Version**: 1.0.0
- **Frontend Version**: 1.0.0
- **Node.js Required**: 14+
- **Flutter Required**: 2.10+
- **MongoDB Required**: 4.4+
- **Dart Required**: 2.16+
- **Android SDK**: API 21+

---

**Quick Reference Version**: 1.0
**Last Updated**: March 2026
**Status**: Ready for Development

For detailed information, see the full documentation files mentioned above.
