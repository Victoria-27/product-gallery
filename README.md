# Product Gallery Application

A modern, responsive product gallery application built with React, TypeScript, and Redux Toolkit.

## Features

- 🔍 Real-time search functionality
- 🏷️ Category and price filtering
- 📱 Fully responsive design
- 🎯 Type-safe with TypeScript
- 🔄 Redux state management
- ⚡ Optimized performance
- 🧪 Comprehensive testing
- 💅 Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Victoria-27/product-gallery.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── api/              # API calls and configurations
├── components/       # React components
├── hooks/           # Custom React hooks
├── pages/           # React pages
├── store/           # Redux store and slices
├── types/           # TypeScript definitions
└
```


## Performance Optimizations

- Redux state management for efficient updates
- Implement virtual scrolling for large product lists

## Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## State Management

Redux Toolkit is used for state management with the following features:
- Centralized product state
- Async thunks for API calls
- Optimized filtering logic
- Type-safe actions and reducers

## Error Handling

- API error handling
- Loading states

# Component Overview

## ProductGallery

- Main container component
- Manages product fetching and filtering
- Handles layout and responsive design

## FilterSection

- Contains all filtering controls
- Manages search input and category selection
- Handles price range filtering

## ProductCard

- Displays individual product information
- Handles hover effects and click interactions
- Shows product image, title, price, and rating

## ProductModal

- Shows detailed product information
- Handles image gallery and description
- Manages user interactions and animations