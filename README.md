# Smart Home Controller Application

This application is an add-on to a smart home controlled by the Tuya or 
Mijia IoT platform. 

Currently implemented features: 
- send telegram bot message when power is off or on 
- error logging for failed Telegram notifications with 3 retry attempts
- visual logs tab for monitoring power events and errors 

The primary feature is to detect grid power-off events. 
There are no reliable devices on the market that can cope with this. 
A mobile phone with the app installed should be plugged into a power outlet. If grid power goes down, the application sends a message via a Telegram bot.


## TODO list

Automatically send a request to the Tuya API to shut down the power switch when power is off. Such behavior is required when your home is powered by solar panels and grid power. If grid power is not available, you want to switch off some power-consuming devices.


## Development notes

In order to run the application use `npx expo start --tunnel`

## Build Android APK locally (no EAS)

This project is an Expo app. To build **locally**, we generate the native Android project and use Gradle.

### Prerequisites (Windows)
1. Install **Android Studio** (includes Android SDK + platform tools).
2. Install **JDK 17** (recommended for modern React Native / Expo SDKs).
3. Set environment variables:
    - `ANDROID_HOME` = path to your Android SDK, e.g. `C:\Users\<YOUR_USER>\AppData\Local\Android\Sdk`
    - Add to `PATH`:
        - `%ANDROID_HOME%\platform-tools`
        - `%ANDROID_HOME%\emulator` (optional)
4. Install JS deps:
   ```bash
   npm install
   ```

### 1) Generate the native Android project (first time, or after native config changes)
`bash npx expo prebuild -p android`

This creates an `android/` folder (native Gradle project).

### 2) Build an APK

#### Debug APK (quickest; installable on devices with USB debugging)
```
cd android 
gradlew.bat assembleDebug
```

APK output:
`npx expo run:android`
- `android\app\build\outputs\apk\release\app-release.apk`
  

### Release signing (required for a real “release” APK)
Gradle can only produce a properly signed release APK if you configure a release keystore.

High-level steps:
1. Create a keystore file (keep it private).
2. Configure signing in `android/app/build.gradle` (release signing config).
3. Provide values via `~/.gradle/gradle.properties` (recommended) using placeholders like:
    - `MYAPP_UPLOAD_STORE_FILE=<path-to-keystore>`
    - `MYAPP_UPLOAD_STORE_PASSWORD=<...>`
    - `MYAPP_UPLOAD_KEY_ALIAS=<...>`
    - `MYAPP_UPLOAD_KEY_PASSWORD=<...>`

Then rebuild:
`bash cd android gradlew.bat assembleRelease`

### Notes
- Re-running `npx expo prebuild -p android` can overwrite native changes; commit your work before doing it.
- If Gradle/JDK errors appear, verify you are using **JDK 17** and that Android SDK paths are correct.
