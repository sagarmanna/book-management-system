# Book Management System

A clean React-based CRUD assignment project where users can view, add, update, delete, search, and filter books using API integration.

## Live Demo

Add your deployed Vercel/Netlify URL here.

## GitHub Repository

Add your GitHub repository URL here.

## Features

- View all books
- Add a new book
- Edit existing book details
- Delete a book
- Search books by title or author
- Filter books by genre
- API integration using Axios
- Loading and error handling
- Responsive UI
- Toast notifications
- Clean component structure

## Tech Stack

- React.js
- Vite
- Axios
- JSON Server / MockAPI
- Framer Motion
- React Hot Toast
- Lucide React
- CSS3

## Book Fields

Each book contains:

- Title
- Author
- Genre
- Publication Year

## Folder Structure

```bash
src/
|-- components/
|   |-- BookCard.jsx
|   |-- BookForm.jsx
|   `-- SearchAndFilter.jsx
|
|-- services/
|   `-- bookApi.js
|
|-- App.jsx
|-- main.jsx
`-- styles.css
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-management-system.git
cd book-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the root folder and add:

```env
VITE_API_URL=https://6a1479406c7db8aac054996b.mockapi.io/api/v1/books
```

For MockAPI, replace it with your hosted API endpoint:

```env
VITE_API_URL=https://6a1479406c7db8aac054996b.mockapi.io/api/v1/books
```

### 4. Run JSON Server locally

```bash
npm run server
```

The local API will run at:

```bash
http://localhost:5000/books
```

### 5. Run React app

Open a new terminal and run:

```bash
npm run dev
```

The app will run at:

```bash
http://localhost:5173
```

## Deployment

### Frontend Deployment

Deploy the React app on Vercel or Netlify.

Build settings:

```bash
Build command: npm run build
Output directory: dist
```

### API Deployment

For a fully functional deployed app, use a hosted API such as MockAPI. A local JSON Server URL only works on your computer, so the deployed app must use a hosted `VITE_API_URL`.

Recommended MockAPI fields:

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self Help",
  "publicationYear": 2018
}
```

After creating your MockAPI endpoint, add it in Vercel environment variables:

```env
VITE_API_URL=https://6a1479406c7db8aac054996b.mockapi.io/api/v1/books
```

Then redeploy the project.

### Submission Checklist

- Add the live deployed frontend URL above.
- Add the GitHub repository URL above.
- Confirm the deployed environment variable `VITE_API_URL` points to a hosted API.
- Test add, edit, delete, search, and genre filter on the deployed URL.

## Assignment Coverage

This project covers all assignment requirements:

- React-based Book Management System
- CRUD operations through API
- Book list with title, author, genre, and publication year
- Add, edit, and delete functionality
- Search by title or author
- Genre filtering
- Loading state
- Error state
- Clean and maintainable component structure
- Deployment-ready setup
