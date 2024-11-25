# Car Store B4A2V3

## Overview

This API allows managing a car inventory system and placing orders. The API supports CRUD operations for `car`, `order` placements, inventory management, and revenue calculation using MongoDB.

## Features

- Modular architecture
- Global error handling
- Input validation
- Configurable via environment variables
- Prettier and ESLint for code formatting and linting

## Project Structure

```
├── dist
├── node_modules
├── src
│   ├── app
│   │   ├── config
│   │   │   └── index.ts
│   │   └── modules
│   │       ├── car
│   │       │   ├── car.controller.ts
│   │       │   ├── car.interface.ts
│   │       │   ├── car.model.ts
│   │       │   ├── car.route.ts
│   │       │   ├── car.service.ts
│   │       │   └── car.validation.ts
│   │       └── order
│   │           ├── order.controller.ts
│   │           ├── order.interface.ts
│   │           ├── order.model.ts
│   │           ├── order.route.ts
│   │           ├── order.service.ts
│   │           └── order.validation.ts
│   ├── app.ts
│   └── server.ts
├── tsconfig.json
├── vercel.json
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs
├── package-lock.json
└── package.json
```

## Prerequisites

- Node.js >= 18.x
- TypeScript >= 4.x
- Mongoose >= 8.x

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abir-islam-z/ph-2-l2-b-4.git
   ```
2. Navigate to the directory

   ```bash
   cd ph-2-l2-b-4
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

Create a `.env` file using the provided `.env.example`. Update variables with your configuration.

## Scripts

- `npm run start:dev` : Start the development server.
- `npm run build` : Build the project.
- `npm run start` : Run the production server.
- `npm run lint` : Run ESLint to check for linting issues.
- `npm run lint:fix` : Run ESLint with the `--fix` flag, which automatically fixes issues that can be fixed.
- `npm run format` : Format the codebase with Prettier.

## API Endpoints

- `/api/v1/cars`
  - `POST` : Create a new car.
  - `GET` : Get all cars . (optionally: searchTerm can be passed to search cars by category, brand, model)
  - `GET /:carId` : Get a car by ID.
  - `PUT /:carId` : Update a car by ID.
  - `DELETE /:carId` : Delete a car by ID.
- `/api/v1/order`
  - `POST` : Place a new order.
  - `GET /revenue` : Get total revenue.
