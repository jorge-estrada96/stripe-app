## Stripe App

This project is a simple integration of Stripe's payment processing system using React and Material UI. It allows users to input payment details, create customers, and handle payments using the Stripe API.

Estimated developed time: **3.5 hours**

## Features

- Customer creation via Stripe API
- Payment method setup and payment confirmation
- Integration with Stripe's `react-stripe-js` library
- Toast notifications for success/error handling with Material UI's `Snackbar`
- TypeScript support for type safety

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/stripe-app.git
```

2. Navigate into the project directory:

```bash
cd stripe-app
```

3. Install the dependencies:

```bash
npm install
```

## Configuration

Before running the project, ensure that you have configured your Stripe keys correctly.

* Create a `.env` file in the root of the project with the following content:

```bash
REACT_APP_STRIPE_PUBLIC_KEY=your-public-key-here
```

## Running the application

To start the development server:

```
npm start
```

By default, the application will run on `http://localhost:8887`.

## Dependencies

This project uses the following dependencies:

* **React** : JavaScript library for building user interfaces
* **Material UI** : Component library for React
* **Stripe** : Payment processing integration
* **Axios** : HTTP client for API requests
* **React Router Dom** : Routing library for React applications

You can find all the dependencies in the `package.json` file.
