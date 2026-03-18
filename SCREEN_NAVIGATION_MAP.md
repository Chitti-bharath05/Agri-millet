# AgriMillet UI Navigation Map

## Complete User Journey Maps

### 🌾 FARMER JOURNEY

```
SPLASH SCREEN (2 sec)
    ↓
LOGIN → SIGNUP (with banking details)
    ↓
FARMER HOME SCREEN
├─ Home Tab
│  ├─ [Upload Crop] → UPLOAD CROP SCREEN
│  │                  └─ Fill form → [Upload] → Back to Home
│  ├─ [My Crops] → MY CROPS TAB (shows crop list)
│  │              └─ [Tap Crop] → CROP DETAILS SCREEN
│  ├─ [Orders] → ORDERS TAB / TRANSACTION HISTORY
│  │            └─ [Track Order] → TRACKING SCREEN
│  └─ [Tracking] → Goes to TRACKING SCREEN
│
├─ My Crops Tab
│  └─ Crop List → [Tap to view] → CROP DETAILS SCREEN
│
├─ Orders Tab / Transactions Tab
│  └─ [Status Filter] → [Track Order] → TRACKING SCREEN
│     └─ [Receipt] → Shows order details dialog
│
├─ Chat Tab
│  └─ CHAT SCREEN
│     └─ [Select Language] → Change language
│        └─ [Send Message] → Bot responds
│
├─ Profile Icon (AppBar)
│  └─ PROFILE SCREEN
│     ├─ [Edit] → Edit mode
│     │   └─ [Save Changes] → Updates profile
│     └─ [Logout] → Confirms → Back to LOGIN
│
└─ Voice Assistant Icon (AppBar)
   └─ VOICE ASSISTANT SCREEN
      ├─ [Select Language] → Changes TTS language
      ├─ [Quick Topics] → Plays pre-recorded responses
      └─ [Replay] → Re-plays current message
```

---

### 🛍️ BUYER JOURNEY

```
SPLASH SCREEN (2 sec)
    ↓
LOGIN → SIGNUP (buyer details)
    ↓
BUYER HOME SCREEN
├─ Home Tab
│  ├─ [State Market] → MARKETPLACE (filtered by state)
│  └─ [National Market] → MARKETPLACE (all crops)
│
├─ Marketplace Tab
│  ├─ [Market Type Toggle] ← Switch between State/National
│  ├─ Crop List (with government price comparison)
│  └─ [View] Button → CROP DETAILS SCREEN
│     ├─ [View Details] → Full crop info + comparison
│     └─ [Purchase Crop] → PAYMENT SCREEN
│        ├─ [Select Quantity]
│        ├─ [Proceed to Payment] → Razorpay dialog
│        │  └─ Payment success → TRACKING SCREEN
│        └─ [Cancel] → Back to CROP DETAILS
│
├─ Purchases Tab
│  └─ TRANSACTION HISTORY SCREEN
│     ├─ [Filter Status] ← All/Completed/Pending/Failed
│     ├─ Transaction Cards
│     ├─ [Track Order] → TRACKING SCREEN
│     │  ├─ [Refresh Status] → Updates GPS data
│     │  └─ [View Location Updates] → Shows GPS history
│     └─ [Receipt] → Shows order receipt dialog
│        └─ [Download PDF] → (Future feature)
│
├─ Chat Tab
│  └─ CHAT SCREEN
│     ├─ [Select Language] → Changes bot language
│     └─ [Ask Questions] → Bot responds with farming info
│
├─ Profile Icon (AppBar)
│  └─ PROFILE SCREEN
│     ├─ [Edit] → Edit state/district
│     │   └─ [Save Changes] → Updates profile
│     └─ [Logout] → Confirms → Back to LOGIN
│
└─ Voice Assistant Icon (AppBar)
   └─ VOICE ASSISTANT SCREEN
      ├─ [Language Selector] → 7 language options
      ├─ [Quick Topics] → Get audio-spoken info about:
      │  ├─ 💰 Prices
      │  ├─ 🌾 Crops
      │  ├─ 💳 Payment
      │  └─ 🚚 Delivery
      └─ [Replay] → Repeats current message
```

---

## Screen Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        SPLASH SCREEN                            │
│                     (Checks auth status)                        │
└────────────┬─────────────────────────────────────┬──────────────┘
             │                                     │
             ↓                                     ↓
        ┌─────────┐                          ┌──────────┐
        │  LOGIN  │                          │  SIGNUP  │
        │ SCREEN  │                          │ SCREEN   │
        └────┬────┘                          └──────┬───┘
             └──────────────────┬──────────────────┘
                                ↓
                    ┌───────────────────────┐
                    │   HOME SCREEN ROUTE   │
                    │  (Farmer/Buyer check) │
                    └───────────────────────┘
                    ↓                     ↓
        ┌───────────────────┐    ┌──────────────────┐
        │ FARMER HOME SCREEN│    │ BUYER HOME SCREEN│
        └───────────────────┘    └──────────────────┘
        ↓       ↓       ↓       ↓        ↓       ↓
    UPLOAD  PROFILE CHAT  TRX.   DETAILS PAYMENT
    CROP    SCREEN SCREEN HIST.  SCREEN SCREEN
             │               │     ↑      │
             └───────────────┴─────┴──────┘
                             ↓
                    ┌─────────────────┐
                    │ CROP DETAILS    │
                    │ SCREEN          │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ PAYMENT SCREEN  │ (Razorpay)
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ TRACKING        │
                    │ SCREEN          │
                    └─────────────────┘

┌──────────────────────────────────────────────────┐
│            ALWAYS ACCESSIBLE (AppBar)            │
├──────────────────────────────────────────────────┤
│ PROFILE SCREEN │ VOICE ASSISTANT SCREEN │ LOGOUT │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│        ACCESSIBLE FROM MULTIPLE SCREENS          │
├──────────────────────────────────────────────────┤
│ CHAT SCREEN │ TRANSACTION HISTORY │ TRACKING     │
└──────────────────────────────────────────────────┘
```

---

## Route Definition Template

```dart
// Add to main.dart routes map:

routes: {
  '/': (context) => const SplashScreen(),
  '/login': (context) => const LoginScreen(),
  '/signup': (context) => const SignupScreen(),
  '/home': (context) => const HomeScreen(),
  
  // Common routes
  '/profile': (context) => const ProfileScreen(),
  '/chat': (context) => const ChatScreen(),
  '/transaction-history': (context) => const TransactionHistoryScreen(),
  '/voice-assistant': (context) => const VoiceAssistantScreen(),
  
  // Farmer-specific routes
  '/upload-crop': (context) => const UploadCropScreen(),
  
  // Buyer/Common routes
  '/crop-details': (context) {
    final cropId = ModalRoute.of(context)!.settings.arguments as String;
    return CropDetailsScreen(cropId: cropId);
  },
  '/payment': (context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    return PaymentScreen(
      cropId: args['cropId'],
      quantity: args['quantity'],
      price: args['price'],
      farmerName: args['farmerName'],
      milletType: args['milletType'],
    );
  },
  '/tracking': (context) {
    final transactionId = ModalRoute.of(context)!.settings.arguments as String;
    return TrackingScreen(transactionId: transactionId);
  },
},
```

---

## Navigation Code Snippets

### From Crop List to Details
```dart
onTap: () {
  Navigator.of(context).pushNamed(
    '/crop-details',
    arguments: crop.id,
  );
},
```

### From Crop Details to Payment
```dart
onPressed: () {
  Navigator.of(context).pushNamed(
    '/payment',
    arguments: {
      'cropId': crop.id,
      'quantity': crop.quantity,
      'price': crop.expectedPrice,
      'farmerName': crop.farmerInfo.farmerName,
      'milletType': crop.milletType,
    },
  );
},
```

### From Transaction to Tracking
```dart
onPressed: () {
  Navigator.of(context).pushNamed(
    '/tracking',
    arguments: transaction.id,
  );
},
```

### Profile Access
```dart
// In AppBar actions:
IconButton(
  onPressed: () => Navigator.of(context).pushNamed('/profile'),
  icon: const Icon(Icons.person),
),
```

### Chat Access
```dart
onPressed: () => Navigator.of(context).pushNamed('/chat'),
```

### Voice Assistant Access
```dart
// In AppBar actions:
IconButton(
  onPressed: () => Navigator.of(context).pushNamed('/voice-assistant'),
  icon: const Icon(Icons.mic),
),
```

---

## Screen Load Flow

```
User Opens App
    ↓
SplashScreen (2 sec timer)
    ├─ if (AuthProvider.isAuthenticated)
    │   └─ Check user type
    │       ├─ if farmer → FarmerHomeScreen
    │       └─ if buyer → BuyerHomeScreen
    │
    └─ if (!AuthProvider.isAuthenticated)
        └─ LoginScreen

User Interaction
    ↓
Navigator.pushNamed() or Navigator.push()
    ↓
Screen loads with arguments
    └─ Provider data auto-populates via Consumer widgets
```

---

## Data Flow Between Screens

```
UPLOAD CROP SCREEN
    └─ CropProvider.uploadCrop()
        └─ Updates backend
            └─ Back to Home → MY CROPS TAB
                └─ CropProvider.fetchMyCrops()
                    └─ New crop appears in list

CROP DETAILS SCREEN
    └─ CropProvider.fetchCropDetails(cropId)
        └─ Shows crop info
            └─ User clicks Purchase
                └─ Pass args to PAYMENT SCREEN
                    └─ TransactionProvider.createPaymentOrder()
                        └─ Razorpay returns orderId
                            └─ TransactionProvider.verifyPayment()
                                └─ Navigate to TRACKING SCREEN
                                    └─ TransactionProvider.fetchTransactionDetails()

TRACKING SCREEN
    └─ Shows GPS coordinates
        └─ [Refresh] button
            └─ Fetches latest GPS data

TRANSACTION HISTORY
    └─ TransactionProvider.fetchMyTransactions()
        └─ Displays all transactions with filters
            └─ User clicks [Track] or [Receipt]
```

---

## State Management Across Screens

```
AuthProvider
    ├─ Shared across: All screens
    ├─ Data: user, token, isAuthenticated
    └─ Methods: login, signup, logout, updateProfile

CropProvider
    ├─ Shared across: Home, Upload, Details
    ├─ Data: crops, myCrops, selectedCrop, governmentPrice
    └─ Methods: upload, fetch, search, getDetails

TransactionProvider
    ├─ Shared across: Payment, Tracking, History
    ├─ Data: transactions, selectedTransaction
    └─ Methods: createOrder, verify, fetch, track

ChatProvider
    ├─ Shared across: Chat, Voice Assistant
    ├─ Data: messages, selectedLanguage
    └─ Methods: sendMessage, fetchHistory, setLanguage
```

---

## Screen Completion Checklist

### Upload Crop Screen
- [x] Form validation
- [x] Image picker integration
- [x] Government price fetcher
- [x] Submit with loading state
- [ ] Connect upload button from home

### Crop Details Screen
- [x] Image carousel
- [x] Price comparison logic
- [x] Farmer info display
- [x] Purchase button
- [ ] Navigate from crop list
- [ ] Navigate to payment

### Payment Screen
- [x] Order summary
- [x] Quantity selector
- [x] Price breakdown
- [x] Razorpay integration
- [ ] Pass crop data properly
- [ ] Handle payment response

### Tracking Screen
- [x] Status timeline
- [x] GPS coordinate display
- [x] Refresh functionality
- [x] Farmer info
- [ ] Connect from transaction history

### Chat Screen
- [x] Message list
- [x] Language selector
- [x] Send functionality
- [x] Bot responses
- [ ] Connect from home tab

### Profile Screen
- [x] Display user info
- [x] Edit mode with save
- [x] Banking info (farmers)
- [x] Logout with confirmation
- [ ] Add to AppBar

### Transaction History Screen
- [x] Transaction list
- [x] Status filter
- [x] Receipt dialog
- [x] Track button
- [ ] Connect from home/purchases tab

### Voice Assistant Screen
- [x] TTS integration
- [x] Language support
- [x] Quick topic buttons
- [x] Replay functionality
- [ ] Add to AppBar

---

## Next: Route & Navigation Integration (Task #9)

Estimated time: 1-2 hours

1. Add all routes to main.dart (8 new routes)
2. Update farmer_home_screen.dart navigation (4 buttons)
3. Update buyer_home_screen.dart navigation (3 buttons + crop details)
4. Add AppBar actions for profile & voice (2 icons)
5. Test complete flows for both user types
6. Fix any navigation issues with argument passing
