# 📚 StudMe – Academic Study Platform

**StudMe** is a modern academic platform that helps students and admins manage learning collaboratively:

- ✅ Managing academic tasks
- ✅ Uploading and browsing study summaries
- ✅ Creating and chatting in study rooms
- ✅ Tracking user statistics via admin dashboard
- ✅ Customizing academic profile with personal details

---

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password)
- 📝 Firestore database for tasks, forums, summaries & users
- 📊 Admin dashboard with analytics and permission control
- 💬 Real-time forum-based discussions
- 🎨 Responsive UI with smooth animations (Framer Motion)
- ⚛️ Built with React + Vite + CSS Modules

---

## 🛠️ Installation

```bash
git clone https://github.com/NDS6240/StudMe
cd StudMe
npm install
```

---

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project.
3. Click on **"Web App"** and copy the config values.
4. Enable **Email/Password** sign-in under **Authentication > Sign-in Method**
5. In **Firestore Database**, add the following collections:
   - `users`
   - `summaries`
   - `forums`
   - `tasks`

---

## 📁 Environment Variables

Create a `.env` file in the **root** of the project:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

👉 Make sure `.env` is added to `.gitignore`:
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

- All data operations are performed via Firebase (client-side)
- Admin permissions are enforced via `isAdmin` field in `users`
- For testing, manually set `isAdmin: true` in Firestore for a user
- Charts are rendered using `recharts`

---

## 🧠 Future Improvements

- ⬆️ File uploads in summaries (PDF, DOCX)
- 📩 Notifications and reminders
- 🛡️ Better role-based access control
- 🔔 Real-time admin alerts

---

## 📸 Screenshots

Coming soon...

---

## 🏷️ License

MIT License © 2025

**All rights reserved to Noam D. Staif**
