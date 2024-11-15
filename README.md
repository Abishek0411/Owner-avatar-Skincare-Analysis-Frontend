# Acne Recognition and Skincare Recommendation System - Frontend

This repository contains the front-end mobile app for the Acne Recognition and Skincare Recommendation System. The app allows users to capture their facial images, receive skincare recommendations, and view personalized analysis results.

## Features
- **Image Capture**: Capture real-time images of the user’s face.
- **Skin Analysis**: Send images to the backend for skin tone, type, and acne severity analysis.
- **Personalized Recommendations**: Display skincare products tailored to the user's skin characteristics.

## Tech Stack
- **React Native**: Framework for building cross-platform mobile applications.
- **TypeScript**: Type-safe language for scalable app development.
- **REST API**: Communicates with the Flask backend to send images and retrieve recommendations.
- **EfficientNet (Transfer Learning)**: Used on the backend for skin type and acne classification.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd Acne-Recognition-Frontend

2. **Install Dependencies**:
   ```bash
   npm install

3. **Run the App**:
   ```bash
   npm start
- To run on Android, use npm run android.
- To run on iOS, use npm run ios (macOS only).

## App Screens
- Home Screen: Initiates the image capture process (both through mobile cam as well as Raspberry pi's cam).
- Analysis Screen: Displays analysis results and recommended products.
- Recommendations Screen: Shows a list of skincare products tailored to the user’s skin type and tone.

## Future Enhancements
- Add a history feature for users to track past skin analysis results.
- Implement in-app purchasing options for recommended products.

## Backend Link
Check out the Backend Repository for the server and machine learning models that power this application:
https://github.com/Abishek0411/Skincare-Analysis-AI-Server
