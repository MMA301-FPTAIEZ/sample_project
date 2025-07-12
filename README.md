# React Native Sample Project Template

This is a template React Native project using Expo that you can use as a starting point for new mobile applications. It comes pre-configured with essential navigation libraries and a basic project structure.

## 📱 What's Included

This template includes:

- **Expo SDK 46** - Cross-platform development framework
- **React Navigation v7** - Complete navigation solution
  - Bottom tabs navigation
  - Stack navigation
  - Native stack navigation
- **React Native Async Storage** - Local data persistence
- **React Native Gesture Handler** - Touch and gesture handling
- **React Native Safe Area Context** - Safe area handling for modern devices
- **React Native Screens** - Performance optimization for navigation

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone or download this template:**

   ```bash
   git clone <repository-url>
   cd sample_project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```

### Running on Different Platforms

- **iOS Simulator:** `npm run ios` or press `i` in the terminal
- **Android Emulator:** `npm run android` or press `a` in the terminal
- **Web Browser:** `npm run web` or press `w` in the terminal
- **Physical Device:** Scan the QR code with Expo Go app

## 📁 Project Structure

```
sample_project/
├── App.js                 # Main app component with navigation setup
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── babel.config.js       # Babel configuration
├── assets/               # Static assets (images, icons)
│   ├── favicon.png
│   └── icon.png
└── src/
    ├── components/       # Reusable UI components
    └── screens/          # Screen components
        ├── HomePage.jsx  # Sample home screen
        └── navigators/
            └── RootNavigator.js  # Main navigation configuration
```

## 🛠️ Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## 🔧 Customization for New Projects

When starting a new project with this template:

1. **Update project metadata:**

   - Change the `name` in `package.json`
   - Update `app.json` with your app details
   - Replace icons and splash screen in `assets/`

2. **Modify the navigation structure:**

   - Edit `src/screens/navigators/RootNavigator.js`
   - Add new screens in `src/screens/`
   - Update navigation flow as needed

3. **Add your components:**

   - Create reusable components in `src/components/`
   - Follow the existing project structure

4. **Install additional dependencies:**
   ```bash
   npm install <package-name>
   expo install <expo-package>
   ```

## 📚 Key Features Explained

### Navigation Setup

The app uses React Navigation with a pre-configured navigation container. The `RootNavigator.js` handles the main navigation flow.

### Expo Configuration

The `app.json` file contains Expo-specific configuration. Update this file with your app's metadata, icons, and platform-specific settings.

### Code Style

The project includes Prettier configuration for consistent code formatting with the following settings:

- Semi-colons enabled
- Single quotes for strings
- 2-space indentation
- 200 character line width

## 🔗 Useful Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [React Native Documentation](https://reactnative.dev/)

## 📝 Notes

This template is designed to give you a solid foundation for React Native development with modern best practices and commonly used libraries already configured.
