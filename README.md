# Wanime 🍊

A modern, ad-free anime streaming web application built with Next.js 15 and Tailwind CSS, powered by the Consumet API.

![Wanime Preview](https://via.placeholder.com/800x400?text=Wanime+Preview)

## ✨ Features

- **Home Page**:

  - Displays the latest anime episode releases.
  - Clean and responsive grid layout.
  - Integrated search bar for quick access.

- **Search Functionality**:

  - Real-time search for anime titles.
  - Dedicated search results page with detailed cards.

- **Watch Page**:

  - **Embedded Video Player**: Watch episodes directly within the app (bypassing CORS issues via iframe).
  - **Anime Details**: Comprehensive info including synopsis, genres, status, and release date.
  - **Episode List**: Easy navigation between episodes.
  - **Auto-Play**: Automatically loads the latest episode if none is selected.

- **Recent Releases Page**:

  - Dedicated page for browsing all recent updates.
  - **Pagination**: Navigate through pages of recent releases.

- **UI/UX**:
  - **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.
  - **Dark/Light Mode**: Adapts to system preferences.
  - **Top Loading Bar**: Visual feedback during page navigation.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: [Consumet.org](https://docs.consumet.org/) (using `@consumet/extensions`)
- **Provider**: Hianime (formerly Zoro.to)
- **Video Player**: Custom Iframe Embed / React Player
- **Utilities**: `cheerio` (for scraping), `nextjs-toploader`

## 🚀 Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/wanime.git
    cd wanime
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

```
wanime/
├── app/
│   ├── components/    # Reusable UI components (SearchBar, VideoPlayer)
│   ├── recent/        # Recent releases page with pagination
│   ├── search/        # Search results page
│   ├── watch/[id]/    # Video player and anime details page
│   ├── globals.css    # Global styles & custom NProgress CSS
│   ├── layout.js      # Root layout with TopLoader
│   └── page.js        # Home page
├── lib/
│   └── consumet.js    # API wrapper for Hianime provider
└── public/
```

## ⚠️ Disclaimer

This project is for educational purposes only. It does not host any content but scrapes data from third-party providers. Please respect copyright laws in your country.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
