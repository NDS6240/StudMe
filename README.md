# 📚 StudMe – Academic Study Platform

StudMe is a modern web app that helps students stay organized by:

- ✅ Managing academic tasks
- ✅ Uploading and browsing study summaries
- ✅ Creating and chatting in study rooms
- ✅ Customizing their academic profile

---

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password)
- 📝 Firestore database for tasks, forums, and summaries
- 💬 Real-time chat using Firestore listeners
- 🎨 Responsive UI with smooth animations (Framer Motion)
- 📦 Built with React + Vite + CSS Modules

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/studme.git
cd studme
npm install
```

---

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project.
3. Click on **"Web App"** and copy the config values.
4. Enable **Email/Password** sign-in under **Authentication > Sign-in Method**
5. In **Firestore Database**, add the following collections:
   - `tasks`
   - `forums` (each forum will contain a subcollection called `posts`)
   - `summaries`
   - `users`

---

## 📁 Environment Variables

Create a `.env` file in the **root** of the project (next to `vite.config.js`) with this content:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

🛑 Do **not** place `.env` inside `/src`! It must be in the project root.

Make sure to add `.env` to `.gitignore`:

```
.env
```

---

## 💡 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
```

---

## 👨‍💻 Developer Notes

- Do not expose your Firebase keys publicly.
- If you change Firebase credentials, restart the dev server.
- Make sure `.env` is correctly loaded by checking:
  ```js
  console.log(import.meta.env.VITE_FIREBASE_API_KEY);
  ```

---

## 🧠 Future Improvements

- Add file uploads to summaries
- Improve user roles and permissions
- Add notifications and reminders

---

## 📸 Screenshots

Coming soon...

---

## 🏷️ License

MIT License © 2025
