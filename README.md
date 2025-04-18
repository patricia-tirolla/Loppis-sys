# Loppis-sys
This project is a lightweight, small-scale web application designed to help users manage and interact with various aspects of their flea markets. Built using technologies like **SQLite** and **React**, the application provides a simple interface for users to perform essential actions such as adding products, tracking orders, viewing reports, etc.. 
Its primary purpose is to offer an easy-to-use tool that’s both fast and secure, without the complexity of a full-fledged user authentication system or large database management.

## Instructions

The application is split into two parts: **backEnd** and **frontEnd**.  
Before running the project, make sure you have **Node.js** installed on your machine.

### BackEnd Setup

1. Navigate to the backend project folder.
2. Run `npm install` to install all dependencies.
3. Run the command `npm run create-password <password>` to create your password (replace `<password>` with your passphrase.).
4. Set a `JWT_SECRET` environment variable, then start the server with `npm start`.
> [!TIP] 
> You can set `JWT_SECRET` and run the server in a single command.
> Example: `JWT_SECRET=secret npm start`
5. The API should be running on PORT 3001. You can also check the api-docs at address `http://localhost:3001/api-docs/`

### FrontEnd Setup

1. Navigate to the frontend project folder.
2. Run `npm install` to install all dependencies.
3. Start the application with `npm start`.
4. The app should be running on PORT 3000.
5. The application login password created on [BackEnd Setup](#backend-setup) must be used to login on frontend.

The frontend will connect to the backend automatically if both are running on their default ports.

## Accessibility

- Added `tabIndex` and handled `onKeyDown` to support keyboard navigation. This enables activation via **Enter** or **Space**, and makes the row accessible to screen readers — since `<tr>` elements aren’t focusable or interactive by default.
- Included `<caption>` elements in all tables to clearly describe their contents.  
- Used semantic HTML to improve screen reader compatibility.  
- Applied accessible font styling: increased base size, chose a dyslexia-friendly font family, and focused on readability.  
- Ensured strong contrast between backgrounds and text or interactive elements.
- Multiple paragraphs is helpful for users with cognitive disabilities or attention disorders like ADHD. Users with low vision or dyslexia also benefit from more white space on the page. It helps reduce visual fatigue. Some assistive tech even allows jumping by paragraph.

> [!NOTE]
> Lighthouse score is **100** for both **Accessibility** and **SEO**.

## Tracking & Privacy

The project uses **Google Analytics** to collect anonymized usage data, such as page views and user interactions, to better understand how users navigate the application and identify areas for improvement.
Since it's a small project with limited traffic, tracking helps uncover potential performance issues and improve the overall experience.

To protect users’ privacy, **IP anonymization** is enabled and no personally identifiable information (PII) is collected. Additionally, all data is aggregated, not linked to individuals, and the tracking respects browser **“Do Not Track”** settings where supported.

> [!NOTE]
> Users who wish to opt out of Google Analytics tracking can install the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).

## Threats and Vulnerabilities

- I am using **SQLite** locally on my machine, which means that if something happens to my computer, it could affect the functionality of the project.

- The database structure has to be managed manually. I tried to use a migration tool (db-migrate), but it doesn't work with ESM modules. The documentation doesn't offer a support for ESM.

- Initially, the application was available to anyone without authentication. To mitigate this, I implemented a **unique password**, which is stored in the database. Only users with this password can log in.  
  **Bcrypt** is used to hash the password so that only the hash is stored in the database. Additionally, a **JWT (JSON Web Token)** is generated upon login for secure sessions.




