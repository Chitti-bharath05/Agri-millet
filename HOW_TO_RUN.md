# How to Run AgriMillet - Backend & Frontend

## Prerequisites ✅
- Flutter installed
- Node.js installed
- Android Studio installed
- Dart installed
- All environment variables configured

---

## 🚀 BACKEND - Node.js Server

### Step 1: Navigate to Backend Directory
```powershell
cd D:\SIP\agrimillet-backend
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Create Environment File (if not exists)
Create a file named `.env` in the backend root with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrimillet
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Step 4: Start Backend Server
```powershell
npm start
```

Or for development with auto-reload:
```powershell
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
Connected to MongoDB
```

---

## 📱 FRONTEND - Flutter App

### Step 1: Navigate to Frontend Directory
```powershell
cd D:\SIP\agrimillet-frontend
```

### Step 2: Get Flutter Dependencies
```powershell
flutter pub get
```

### Step 3: Check Available Devices
```powershell
flutter devices
```

**You should see:**
- Android emulator (if running)
- Chrome (web)
- Windows (desktop)

### Step 4: Run on Android Emulator

**Option A: Start Emulator from Android Studio**
1. Open Android Studio
2. Click "AVD Manager" (top right)
3. Click green play button to start emulator
4. Wait for it to fully load

**Option B: Start Emulator from Command Line**
```powershell
$env:ANDROID_HOME\emulator\emulator -avd Pixel_5_API_30
```
(Replace `Pixel_5_API_30` with your emulator name)

### Step 5: Run Flutter App
```powershell
flutter run
```

Or specify the device:
```powershell
flutter run -d emulator-5554
```

**Expected Output:**
```
Flutter app starting...
Opening lib/main.dart on Android Device in debug mode...
Syncing files to device...
✓ Build successful
App launched successfully!
```

---

## 📋 Quick Start Commands (Copy & Paste)

### Terminal 1 - Start Backend
```powershell
cd D:\SIP\agrimillet-backend
npm install
npm start
```

### Terminal 2 - Start Frontend
```powershell
cd D:\SIP\agrimillet-frontend
flutter pub get
flutter run
```

---

## ✅ Verify Everything is Working

### Backend Check
- Open browser: `http://localhost:5000`
- Should show API response or "API is running"

### Frontend Check
- App should load on emulator
- SplashScreen shows for 2 seconds
- Login screen appears
- Can navigate between screens

---

## 🔗 Testing the Full Integration

### Login Test
1. **Test User (Farmer)**
   - Email: `farmer@test.com`
   - Password: `password123`

2. **Test User (Buyer)**
   - Email: `buyer@test.com`
   - Password: `password123`

### Test Farmer Flow
1. Login as farmer
2. Click "Upload Crop" button
3. Fill form and upload
4. View crops in "My Crops" tab
5. Check "Orders" tab
6. Click "Profile" icon

### Test Buyer Flow
1. Login as buyer
2. Browse marketplace
3. Click "View" on any crop
4. Review crop details
5. Click "Purchase"
6. Complete payment flow
7. Check "Purchases" tab

---

## 🛠️ Troubleshooting

### Backend Won't Start
```powershell
# Clear node modules and reinstall
rm -r node_modules
npm install
npm start
```

### Flutter Pub Get Fails
```powershell
flutter clean
flutter pub get
```

### Emulator Not Showing
```powershell
# List available devices
flutter devices

# Kill running emulator
adb kill-server
adb start-server
```

### Port 5000 Already in Use (Backend)
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill process (replace PID)
Stop-Process -Id <PID> -Force
```

### App Crashes on Startup
1. Check backend is running on port 5000
2. Check `.env` file exists in backend
3. Check MongoDB is running (if using local MongoDB)
4. Run: `flutter clean && flutter pub get && flutter run`

---

## 📊 Expected Architecture

```
┌─────────────────────────────────────────┐
│     Flutter Mobile App (Port: Device)   │
│  - Runs on Android Emulator             │
│  - Calls API endpoints                  │
└─────────────────┬───────────────────────┘
                  │
                  │ HTTP Requests
                  ↓
┌─────────────────────────────────────────┐
│    Node.js Backend (Port: 5000)         │
│  - REST API endpoints                   │
│  - Business logic                       │
│  - Database operations                  │
└─────────────────┬───────────────────────┘
                  │
                  │ Database Queries
                  ↓
┌─────────────────────────────────────────┐
│        MongoDB Database                 │
│  - User data                            │
│  - Crop listings                        │
│  - Transactions                         │
│  - Chat messages                        │
└─────────────────────────────────────────┘
```

---

## 🎯 Summary

| Component | Command | Port | Status |
|-----------|---------|------|--------|
| Backend | `npm start` | 5000 | ✅ Running |
| Frontend | `flutter run` | Device | ✅ Running |
| MongoDB | Auto/Manual | 27017 | ✅ Connected |

**Total Startup Time:** ~2-3 minutes

---

## 💡 Tips

- Keep backend terminal open while testing
- Use `flutter run` with `-v` flag for verbose logs: `flutter run -v`
- For hot reload during development: Press `r` in flutter terminal
- To restart app without rebuilding: Press `R` in flutter terminal
- Check `logcat` for Android errors: `adb logcat`

---

## 🚀 You're All Set!

Backend and frontend are now ready to run. Follow the steps above and you'll have the full AgriMillet application running! 

**Questions?** Check the logs - they usually tell you what's wrong.

Good luck! 🎉
