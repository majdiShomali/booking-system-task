# 🚀 Full-Stack Booking System Task

This project is built with the powerful [T3 Stack](https://create.t3.gg/), providing a robust and scalable full-stack solution.

🔗 **Live Demo:** [Visit Booking System Task](https://booking-system-task.vercel.app/)
> **Note:** Real-time updates are not configured in the production environment..

---

## 💻 Tech Stack

![NextJS](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-red?style=for-the-badge)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 📥 Clone the Repository

```sh
git clone https://github.com/majdiShomali/booking-system-task.git
cd booking-system-task
code .
```

### 📦 Install Dependencies

```sh
npm install
```

### 🗄️ Set Up Database

#### 1️⃣ Define the Connection String

Create a `.env` file in the root directory and add the following:

```sh
DATABASE_URL="postgresql://postgres:1234@localhost:5432/booking-system-task"
NEXTAUTH_URL=http://localhost:3000
SOCKET_PORT=5555
NEXTAUTH_SECRET=your-secure-secret-key
NEXT_PUBLIC_URL = http://localhost:3000
NEXT_PUBLIC_SOCKET_PORT = 5555
NEXT_PUBLIC_HOST = localhost
```

#### 2️⃣ Push Database Schema

```sh
npx prisma db push
```

#### 3️⃣ Seed the Database

```sh
npx prisma db seed
```
##### Accounts
**Please use this account to add available times or create new ones.You can also create new pioneer accounts.** 

**Email**
```sh
saraahmad@gmail.com
```
**password**
```sh
Password@1234
```


### 🚀 Start the Development Server

```sh
npm run dev
```

Your application should now be running at `http://localhost:3000/` 🎉.

---


## 🧪 Running Tests

To run tests for different functionalities, follow the instructions below:

### 1. Test Booking Flow
To test the booking flow, run the following command:

```sh
npm test booking-flow.test.ts
```
### 2. Test Available Sessions
To test the available sessions for a specific day and specific pioneer, run the following command:
```sh
npm test available-sessions.test.ts
```


## 📜 License

This project is open-source and available under the [MIT License](LICENSE).


