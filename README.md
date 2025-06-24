# JAGGAER Frontend Developer Assignment

## Table of Contents

- [Assignment Overview](#assignment-overview)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Design](#design)
- [Submission Instructions](#submission-instructions)
- [Questions?](#questions)

Welcome! This assignment will help us evaluate your frontend skills and give you insight into the kind of work we do at JAGGAER.

**You will build a React frontend for a simple e-commerce app using the provided backend.**

---

## Assignment Overview

You are to implement a frontend application that allows users to:

- Browse a list of products
- View product details
- Add products to a shopping cart
- View and manage the cart

You must use **React** and **Material-UI** (MUI) components, and follow the provided [design files](./design/) in the `design` folder.

**For data fetching, we recommend using [Apollo Client](https://www.apollographql.com/docs/react/) and GraphQL, as the backend exposes a GraphQL API. However, you may use any method or library you prefer to interact with the backend.**

---

## Requirements

### Mandatory

- Use **React** and [Material-UI](https://mui.com/) for all UI components.
- Implement the following pages:
  - **Products List**: Display all products.
  - **Product Details**: Show details for a selected product.
  - **Cart**: Show cart contents and allow item removal.
- Use the provided backend (see `/backend` folder) for all data (products, cart, etc).
- Implement **Add to Cart** functionality via the backend API.
- Implement navigation:
  - Clicking **SHOW DETAILS** opens the product details page.
  - Clicking the cart icon opens the cart page.
- Use as many standard Material UI components as possible.
- Customize Material UI to match the design.
- Write clean, maintainable HTML, CSS, and JS code.

### Optional / Nice to Have

- **Header Bar**:
  - By default, show only a grey bottom border.
  - If content overflows vertically, keep the header fixed and allow content to scroll underneath.
  - Add a drop shadow to the header when scrolling.
- **Add to Cart Button in Details**:
  - Show the button next to the image by default.
  - If that section is not visible, show the button in the header bar.
- **Cart Animation**:
  - Animate the cart icon/number when an item is added.
  - Be creative and make the UI visually appealing.
- **Responsive Design**: Ensure the app works well on different screen sizes.

---

## Getting Started

### 1. Backend

- The backend is in the `/backend` folder.
- See `/backend/README.md` for setup and API documentation.
- Start the backend before running your frontend.

### 2. Frontend

- All frontend code should go in the `/frontend` folder.
- **You must create your own configuration files** for Babel, Webpack, and ESLint.
  - We will evaluate your ability to set up a modern React project from scratch.
- Install any dependencies you need.
- Start the frontend dev server as you see fit (e.g. with Webpack Dev Server or Vite).
- The app should run at [http://localhost:8080](http://localhost:8080) by default, or document your chosen port.

---

## Design

- **Design files**: Provided as PDFs in the [`design`](./design/) folder at the project root. Please use these as your primary reference for layout, colors, and UI details.
---

## Submission Instructions

You can submit your solution in one of the following ways:

### 1. GitHub Repository (Preferred)
- Push your code to a **private GitHub repository**.
- Add `bkuzmanovic@jaggaer.com` (or the person who sent you the assignment) as a collaborator.
- Send us the repository link by email.

### 2. Archive & Email
- Archive your solution (e.g. ZIP, TAR) and name it:  
  `lastname_firstname_frontend_test.zip`
- Upload the archive to your private cloud storage (Google Drive, Dropbox, etc).
- Share the download link with us by email.

### 3. Deployment (Bonus)
- Deploy your frontend (and optionally backend) to a platform such as **Heroku**, **Vercel**, **Netlify**, or similar.
- Include the live demo link in your email or repository README.

**In all cases, email us:**
- **Subject**: `Frontend Test Result firstname lastname`
- **To**: The person who sent you the assignment
- **Body**:
  - The GitHub repo link, download link, and/or deployed app link
  - Any notes or explanations about your solution

---

## Questions?

If you have any questions, email us with the subject "Frontend Task Question" at [bkuzmanovic@jaggaer.com](mailto:bkuzmanovic@jaggaer.com).

---

Good luck! We look forward to seeing your solution.

