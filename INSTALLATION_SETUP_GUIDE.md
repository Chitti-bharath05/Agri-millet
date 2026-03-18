# AgriMillet - Installation & Setup Guide

## Prerequisites

### For Backend Development
- Node.js 14.0 or higher
- MongoDB 4.4 or higher
- npm or yarn package manager
- Visual Studio Code or any text editor

### For Frontend Development
- Flutter SDK 2.10 or higher
- Dart SDK 2.16 or higher
- Android Studio 2020.3 or higher
- Android SDK 21 or higher
- Gradle 6.7 or higher

### General Requirements
- Git
- 2GB RAM minimum
- 2GB free disk space
- Internet connection

## Backend Setup

### Step 1: Install Node.js and MongoDB

**Windows:**
1. Download Node.js from https://nodejs.org/ (LTS version)
2. Run installer and follow instructions
3. Download MongoDB from https://www.mongodb.com/try/download/community
4. Install MongoDB Community Edition

**Mac:**
```bash
brew install node
brew install mongodb-community
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install nodejs npm mongodb
```

### Step 2: Clone and Navigate to Backend

```bash
cd d:\SIP
git clone <repository-url>
cd agrimillet-backend
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- razorpay
- multer

### Step 4: Configure Environment Variables

```bash
# Copy example to actual env file
cp .env.example .env

# Edit .env with your values
# Windows: Edit with Notepad or VS Code
# Mac/Linux: nano .env
```

**Example .env configuration:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrimillet
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long!
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
NODE_ENV=development
```

### Step 5: Setup MongoDB

**Local MongoDB:**
```bash
# Start MongoDB service
# Windows: mongod command in CMD

# Mac/Linux:
brew services start mongodb-community
# or
sudo systemctl start mongod
```

**Or use MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update MONGODB_URI in .env

### Step 6: Seed Government Prices

```bash
node seed.js
```

This will populate initial government price data in MongoDB.

### Step 7: Start the Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Expected output:
```
AgriMillet Backend Server running on port 5000
MongoDB connected: localhost
```

Visit http://localhost:5000/api/health to verify server is running.

---

## Frontend Setup

### Step 1: Install Flutter

**Windows:**
1. Download Flutter from https://flutter.dev/docs/get-started/install/windows
2. Extract to C:\src\flutter (or custom location)
3. Add to PATH: `C:\src\flutter\bin`
4. Run `flutter doctor` in terminal

**Mac:**
```bash
# Using Homebrew
brew install flutter

# Or download and setup manually
curl https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos.zip
unzip flutter_macos.zip
export PATH="$PATH:~/flutter/bin"
```

**Linux:**
```bash
sudo apt-get install clang cmake git ninja-build pkg-config libgtk-3-dev
# Download and extract Flutter
./flutter/bin/flutter config --android-sdk /path/to/android/sdk
```

### Step 2: Install Android Studio

1. Download from https://developer.android.com/studio
2. Follow installation guide
3. Install Android SDK Platform 30 or higher
4. Create Android Virtual Device (emulator) or connect physical device

### Step 3: Verify Flutter Installation

```bash
flutter doctor
```

All checks should show green checkmarks. Fix any issues before proceeding.

### Step 4: Clone and Navigate to Frontend

```bash
cd d:\SIP
cd agrimillet-frontend
```

### Step 5: Get Dependencies

```bash
flutter pub get
```

### Step 6: Configure API Endpoint

Edit `lib/services/api_service.dart`:

```dart
// For Android Emulator (default)
static const String baseUrl = 'http://10.0.2.2:5000/api';

// For Physical Device (replace with your machine's IP)
// static const String baseUrl = 'http://192.168.1.100:5000/api';

// For iOS Simulator
// static const String baseUrl = 'http://localhost:5000/api';
```

To find your machine IP:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

### Step 7: Start Android Emulator or Connect Device

**Android Emulator:**
```bash
# List available emulators
flutter emulators

# Launch emulator
flutter emulators --launch <emulator_name>

# Or use Android Studio to launch
```

**Physical Device:**
1. Enable USB Debugging
2. Connect via USB cable
3. Run `flutter devices` to verify connection

### Step 8: Run the Application

```bash
# Run with hot reload
flutter run

# Run in release mode
flutter run --release

# Run on specific device
flutter run -d <device_id>
```

First build may take 2-3 minutes. Subsequent runs are faster.

### Step 9: Build APK

**Debug APK:**
```bash
flutter build apk --debug
# Output: build/app/outputs/apk/debug/app-debug.apk
```

**Release APK:**
```bash
flutter build apk --release
# Output: build/app/outputs/apk/release/app-release.apk
```

**App Bundle (for Play Store):**
```bash
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
```

---

## Full Stack Setup (Backend + Frontend)

### Terminal 1: Start Backend
```bash
cd d:\SIP\agrimillet-backend
npm run dev
# Backend running on http://localhost:5000
```

### Terminal 2: Start Frontend
```bash
cd d:\SIP\agrimillet-frontend
flutter run
# App running on Android emulator/device
```

---

## Troubleshooting

### Backend Issues

**Error: MongoDB connection failed**
```
Solution: 
- Ensure MongoDB is running (mongod service)
- Check MONGODB_URI in .env
- Try MongoDB Atlas cloud option
```

**Error: Port 5000 already in use**
```
Solution:
- Change PORT in .env to different port (e.g., 5001)
- Or kill process using port 5000
```

**Error: npm package installation fails**
```
Solution:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

**Error: Flutter SDK not found**
```
Solution:
- Check flutter doctor output
- Ensure Flutter is added to PATH
- Restart terminal/IDE after setting PATH
```

**Error: Android SDK not found**
```
Solution:
- Install Android SDK through Android Studio
- Set ANDROID_SDK_ROOT environment variable
- Run: flutter config --android-sdk /path/to/sdk
```

**Error: Emulator won't start**
```
Solution:
- Ensure virtualization is enabled in BIOS
- Try: emulator -avd <avd_name> -no-snapshot-load
- Check available disk space
```

**Error: App won't connect to backend**
```
Solution:
- Ensure backend is running (http://localhost:5000/api/health)
- Check API_BASE_URL in api_service.dart
- For emulator: use 10.0.2.2, not localhost
- For device: use your machine's IP address
- Disable firewall temporarily to test
```

**Error: Dependencies not resolving**
```
Solution:
flutter clean
flutter pub get
flutter pub upgrade
```

---

## Development Workflow

### Making Changes to Backend

1. Edit code in `agrimillet-backend/`
2. Backend auto-reloads with `npm run dev`
3. Test with Postman or curl
4. Check logs in terminal

### Making Changes to Frontend

1. Edit code in `agrimillet-frontend/lib/`
2. Flutter hot reload: Press `r` in terminal
3. Full rebuild: Press `R` in terminal
4. Test on emulator/device

### Testing

**Backend Tests:**
```bash
npm test
```

**Frontend Tests:**
```bash
flutter test
```

---

## Production Checklist

### Before Deploying Backend
- [ ] All environment variables configured
- [ ] MongoDB production instance setup
- [ ] Razorpay production keys obtained
- [ ] HTTPS enabled
- [ ] CORS configured for frontend domain
- [ ] Error logging enabled
- [ ] Rate limiting configured
- [ ] Database backups automated
- [ ] All tests passing

### Before Deploying Frontend
- [ ] API base URL points to production server
- [ ] All images optimized
- [ ] No hardcoded test credentials
- [ ] App signing configured
- [ ] Version number updated
- [ ] Release notes prepared
- [ ] Privacy policy reviewed
- [ ] Terms of service reviewed

---

## Useful Commands Reference

### Backend
```bash
npm install <package>    # Add new package
npm run dev              # Start development server
npm test                 # Run tests
npm start                # Start production server
node seed.js             # Seed government prices
```

### Frontend
```bash
flutter pub get          # Install dependencies
flutter run              # Run app
flutter build apk        # Build release APK
flutter clean            # Clean build artifacts
flutter doctor           # Check setup
flutter format lib/      # Format code
flutter analyze          # Analyze code
```

---

## Next Steps After Setup

1. **Test Authentication**
   - Create test farmer account
   - Create test buyer account
   - Verify login/logout works

2. **Test Core Features**
   - Farmer uploads crop
   - Buyer views marketplace
   - Complete payment transaction

3. **Test Edge Cases**
   - Invalid inputs
   - Network failures
   - Payment failures

4. **Performance Testing**
   - Marketplace load with 100+ crops
   - Multiple concurrent users
   - Large file uploads

---

## Support Resources

- **Flutter Documentation**: https://flutter.dev/docs
- **Node.js Documentation**: https://nodejs.org/docs
- **MongoDB Documentation**: https://docs.mongodb.com
- **Stack Overflow Tags**: #flutter, #nodejs, #mongodb
- **Community Forums**: https://github.com/flutter/flutter/discussions

---

**Installation Guide Version**: 1.0
**Last Updated**: March 2026
