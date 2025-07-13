# Akassnidi Karunanithi - Personal Portfolio

A professional and visually stunning personal portfolio web application built with Next.js 14 (App Router), Tailwind CSS, and TypeScript.

## Features

* **Home Page**: Professional photo and detailed introduction.
* **Career Page**: Showcases work experience, achievements, skills, certifications, and tools used.
* **Passion Works Page**: Highlights ongoing learning, side projects, technical events, and soft skills.
* **Availability Page**: Displays a weekly availability schedule.
* **Admin Panel (Protected)**:
    * Secure login with a predefined username and password.
    * Ability to edit content for Home, Career, and Passion Works pages dynamically.
    * Ability to manage and update the availability schedule.
    * Changes reflect immediately without requiring a rebuild.

## Technologies Used

* **Framework**: Next.js 14 (App Router)
* **Styling**: Tailwind CSS
* **Language**: TypeScript
* **Data Persistence**: `localforage` (for client-side storage, simulating dynamic updates)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd akassnidi-portfolio
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    (Note: `localforage` is added as a dependency in `package.json`)

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Admin Access

To access the Admin panel:

* Navigate to `/admin`
* **Username**: `SuperAdmin`
* **Password**: `PtksanAkash123`

## Deployment

This application is designed for easy deployment on Vercel.

1.  Push your code to a GitHub repository.
2.  Connect your GitHub repository to Vercel.
3.  Vercel will automatically detect the Next.js project and deploy it.

## Customization

* **Professional Photo**: Replace `public/akassnidi.jpg` with your actual professional photo.
* **Content**: All content for Home, Career, and Passion Works, as well as Availability, can be edited via the Admin panel.
* **Styling**: Modify `tailwind.config.ts` and `styles/globals.css` for further design customizations.
* **Fonts**: The project uses `Inter` and `Poppins` from Google Fonts. You can change these in `styles/globals.css` and `app/layout.tsx`.