# Virtual Campus Connect
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://virtual-campus-connect.vercel.app/)

**Virtual Campus Connect** is a comprehensive web application designed to bring students, faculty, and campus resources together virtually. It offers a collaborative platform for academics, events, student interaction, and resource sharing.

---

## 🚀 Features & Modules

### 1. **Notes**
- Upload and view notes and study materials.
- Organized for easy access and download.

### 2. **Event Year-wise**
- Upload and view events based on academic year.
- Track seminars, workshops, and campus activities.

### 3. **StudentMart**
- Buy/sell second-hand products among students.
- Accommodation listing for campus housing or roommates.
- A platform to make student-to-student transactions seamless.

### 4. **Chatroom**
- Leave messages and interact with other students.
- Helps in seeking guidance, sharing tips, or asking for help within the campus community.

### 5. **Email Authentication**
- Sign up/login via email OTP verification.
- Secure and easy authentication mechanism using Appwrite Auth.

---

## 🧰 Technologies & Libraries Used

- **Frontend:** React.js, React Router DOM, React Icons, React Slick (carousel)
- **Backend & Database:** [Appwrite](https://appwrite.io) – Authentication, Database, Storage, Serverless Functions
- **Email Integration:** `@emailjs/browser` for notifications and messaging
- **PDF & Notes Handling:** `react-pdf`, `@react-pdf-viewer/core`, `@react-pdf-viewer/default-layout`, `jspdf`, `html2canvas`
- **Styling & Icons:** `@fortawesome/react-fontawesome`, `react-icons`, `slick-carousel`
- **Validation:** `ajv`
- **Testing:** `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/virtual-campus-connect.git
Navigate into the project directory:
  cd virtual-campus-connect
Install dependencies:
  npm install
Configure Appwrite:
  Create an Appwrite account and a new project.
  Add your frontend URL in the Appwrite console.
Create collections for:
  Notes
  Events
  Products/Accommodation
  Chat messages
  Users/Authentication
Configure environment variables for your Appwrite endpoint and project ID in your React app.

Start the development server:
npm start
🌐 Live Demo
Experience the live project here:
Virtual Campus Connect (https://virtual-campus-connect.vercel.app/)
