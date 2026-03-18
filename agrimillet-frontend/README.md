# AgriMillet Flutter Mobile Application

AgriMillet is a marketplace platform connecting farmers and buyers for buying and selling millets across India. This is the Flutter-based Android mobile application.

## Features

### Authentication
- User registration with farmer/buyer differentiation
- Email and mobile number verification
- Secure JWT-based authentication
- Token persistence across sessions
- Logout functionality

### Farmer Features
- Upload crop details (millet type, quantity, harvest date)
- Choose market type (state or national)
- Set expected price per kg
- View government-allocated prices for millets
- View and manage their uploaded crops
- Real-time GPS tracking of deliveries
- Update delivery status for buyers
- View transaction history and earnings

### Buyer Features
- Browse crops in state or national marketplace
- View government prices alongside farmer prices
- Search and filter crops by type and location
- View farmer details when interested in purchasing
- Contact farmers with secure phone number display
- Make purchases with integrated payment gateway
- Track real-time delivery with GPS
- Download transaction receipts
- View purchase history

### Common Features
- 2-second splash screen with app branding
- AI chatbot with natural language processing
- Voice assistant with text-to-speech and speech-to-recognition
- Multilingual support (Hindi, Tamil, Kannada, Telugu, Marathi, Gujarati, Bengali, etc.)
- Offline support where applicable
- Push notifications for orders and delivery updates

## Tech Stack

- **Framework**: Flutter (Dart)
- **State Management**: Provider
- **Database**: MongoDB (via backend API)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Razorpay
- **Maps**: Google Maps Flutter
- **Location**: Geolocator
- **Text-to-Speech**: Flutter TTS
- **Speech Recognition**: Speech to Text
- **Networking**: HTTP package
- **Local Storage**: Shared Preferences

## Project Structure

```
lib/
├── main.dart                    # App entry point
├── models/                      # Data models
│   ├── user.dart
│   ├── crop.dart
│   ├── transaction.dart
│   ├── government_price.dart
│   └── chat.dart
├── screens/                     # UI screens
│   ├── auth/
│   │   ├── splash_screen.dart
│   │   ├── login_screen.dart
│   │   └── signup_screen.dart
│   ├── farmer/
│   │   ├── farmer_home_screen.dart
│   │   ├── upload_crop_screen.dart
│   │   ├── my_crops_screen.dart
│   │   └── tracking_screen.dart
│   ├── buyer/
│   │   ├── buyer_home_screen.dart
│   │   ├── marketplace_screen.dart
│   │   └── checkout_screen.dart
│   └── common/
│       ├── home_screen.dart
│       ├── profile_screen.dart
│       ├── chat_screen.dart
│       └── settings_screen.dart
├── services/                    # API services
│   └── api_service.dart
├── providers/                   # State management
│   ├── auth_provider.dart
│   ├── crop_provider.dart
│   ├── transaction_provider.dart
│   └── chat_provider.dart
├── widgets/                     # Reusable widgets
│   ├── custom_app_bar.dart
│   ├── loading_indicator.dart
│   └── error_widget.dart
└── utils/                       # Utilities
    ├── constants.dart
    ├── validators.dart
    └── formatters.dart
```

## Getting Started

### Prerequisites
- Flutter SDK (latest version)
- Android Studio or VS Code with Flutter extension
- Android device or emulator (Android 5.0 and above)
- Dart SDK

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agrimillet-frontend
```

2. Install dependencies:
```bash
flutter pub get
```

3. Configure API endpoint in `lib/services/api_service.dart`:
```dart
static const String baseUrl = 'http://10.0.2.2:5000/api'; // For emulator
// Or use device IP for physical device
```

4. Run the application:
```bash
flutter run
```

Or for release build:
```bash
flutter run --release
```

## Configuration

### Environment Variables
Create a `.env` file in the project root:
```
API_BASE_URL=http://10.0.2.2:5000/api
RAZORPAY_KEY_ID=your_razorpay_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### API Configuration
Update `lib/services/api_service.dart` with:
- Backend API base URL
- Razorpay API keys
- Google Maps API key

### Millet Types Available
- Finger Millet
- Pearl Millet
- Sorghum
- Foxtail Millet
- Kodo Millet
- Barnyard Millet
- Little Millet
- Proso Millet

### Supported Languages
- English (en)
- Hindi (hi)
- Tamil (ta)
- Telugu (te)
- Kannada (kn)
- Marathi (mr)
- Gujarati (gu)
- Bengali (bn)

## Features Implementation Details

### Splash Screen
- 2-second display on app launch
- Shows AgriMillet logo and app name
- Auto-navigates to login or home based on authentication status

### Authentication Flow
1. User clicks signup/login
2. Enters credentials
3. Backend validates and returns JWT token
4. Token stored in SharedPreferences
5. API calls include Authorization header with token
6. Logout clears token from storage

### Farmer Workflow
1. Signup with farming details and bank/UPI information
2. Upload crop with details (type, quantity, harvest date, market, expected price)
3. App fetches and displays government price for comparison
4. Farmer can edit or remove crop listings
5. When buyer purchases, farmer gets notification
6. Farmer provides GPS coordinates for delivery tracking
7. After delivery completion, crop is automatically removed

### Buyer Workflow
1. Signup with location details
2. Browse state or national marketplace
3. Filter by millet type and price range
4. Click crop to view details and compare prices
5. Click "Contact Farmer" to see phone number
6. Click "Buy" to proceed to payment
7. Complete Razorpay payment
8. Receive transaction receipt
9. Track delivery in real-time with GPS
10. Get delivery notifications

### Payment Flow
1. Buyer initiates purchase
2. App creates payment order via backend
3. Razorpay payment gateway opens
4. Buyer completes payment
5. Payment verified via signature validation
6. Transaction marked as complete
7. Farmer notified of purchase
8. Crop marked as sold, quantity reduced
9. Both parties receive receipt

### Delivery Tracking
1. After payment, delivery status set to "pending"
2. Farmer updates status to "in-transit"
3. Farmer provides GPS coordinates at intervals
4. Buyer sees real-time location on map
5. When delivered, status changes to "delivered"
6. Crop automatically removed from marketplace
7. Both parties get delivery confirmation

### Chatbot & Voice Assistant
1. User can select language
2. Chatbot processes natural language queries
3. Provides answers about crops, prices, process
4. Voice assistant converts speech to text
5. Responses provided in selected language
6. Text-to-speech reads responses aloud

## Building for Android

### Debug Build
```bash
flutter build apk --debug
```

### Release Build
```bash
flutter build apk --release
```

### App Bundle (for Play Store)
```bash
flutter build appbundle --release
```

Generated APK/Bundle will be in:
- `build/app/outputs/apk/release/app-release.apk`
- `build/app/outputs/bundle/release/app-release.aab`

## API Integration

### Base URL
- Emulator: `http://10.0.2.2:5000/api`
- Physical Device: `http://<your-machine-ip>:5000/api`

### Sample API Calls

**Login**
```dart
await apiService.login(
  email: 'user@example.com',
  password: 'password123',
);
```

**Upload Crop**
```dart
await apiService.uploadCrop(
  milletType: 'Finger Millet',
  quantity: 100,
  harvestDate: DateTime.now(),
  market: 'state',
  expectedPrice: 45.0,
);
```

**Create Payment Order**
```dart
final orderData = await apiService.createPaymentOrder(
  cropId: 'crop-id',
  quantity: 50,
);
```

## Testing

### Unit Tests
```bash
flutter test
```

### Run specific test file
```bash
flutter test test/services/api_service_test.dart
```

### Integration Tests
```bash
flutter drive --target=test_driver/app.dart
```

## Troubleshooting

### Connection Issues
- Ensure backend server is running on port 5000
- Check API base URL in `api_service.dart`
- For emulator: use `10.0.2.2` to access local machine
- For physical device: use machine's local IP address

### Firebase/Push Notifications
- Configure Firebase in pubspec.yaml
- Add google-services.json to android/app/
- Initialize Firebase in main.dart

### GPS/Location Issues
- Check permissions in AndroidManifest.xml
- Grant location permissions at runtime
- Enable location services on device

### Payment Issues
- Verify Razorpay API keys
- Test with provided test credentials
- Check internet connectivity

## Performance Optimization

- Lazy load marketplace crops with pagination
- Cache images using CachedNetworkImage
- Implement offline mode for frequently accessed data
- Optimize map rendering for delivery tracking
- Use streams for real-time data updates

## Security

- JWT tokens stored securely
- Password hashed before transmission
- HTTPS enforced for API calls
- Sensitive data not logged
- User banking details encrypted on backend
- Mobile number shown only to authorized users

## Future Enhancements

- Video conferencing for farmer-buyer communication
- Auction system for price discovery
- Government subsidy integration
- Weather API integration for crop recommendations
- Crop insurance integration
- Supply chain analytics for farmers
- Social features (reviews, ratings)
- Recommendation engine based on user history

## Support

For issues or questions, contact:
- Email: support@agrimillet.com
- Documentation: https://agrimillet-docs.com

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please follow the contribution guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Disclaimer

This is a prototype/demo application. Before production deployment:
- Complete security audit
- Payment gateway compliance verification
- Data privacy regulations compliance (GDPR, local laws)
- Performance load testing
- User acceptance testing
