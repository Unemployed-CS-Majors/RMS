# RMS

/public
│
├── /assets               # Static assets such as images, fonts, and icons
│   ├── /images           # Image files
│   ├── /fonts            # Font files
│   └── /icons            # Icon files
│
├── /css                  # CSS stylesheets
│   ├── /components       # CSS for specific components (buttons, cards, etc.)
│   ├── /pages            # Page-specific CSS files
│   └── main.css          # Global styles, reset styles, etc.
│
├── /js                   # JavaScript files
│   ├── /api              # API-related files
│   │   └── retsApi.js    # Logic for interacting with RETS API
│   ├── /utils            # Utility functions like DOM manipulation, event handlers
│   ├── /components       # JS for specific components (modals, sliders, etc.)
│   └── main.js           # Main JS file for initializing the app
│
├── /html                 # HTML pages
│   ├── index.html        # Main entry point
│   └── about.html        # Example additional page
│
├── /data                 # Local data storage (e.g., JSON or temporary data)
    └── properties.json   # Example data fetched from RETS API