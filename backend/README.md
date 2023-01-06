# Email Guesser Backend

This project is an HTTP micro service using Node.js and express with a single end point to derive email address for a person, given their full name and company domain. We can assume that all email addresses of one company follow the same format. That is, if we know the full name and email address of one person in the company, we should be able to derive the email addresses of other employees given their full name.

## Getting Started

```bash
npm install
npm start
```

The server runs on port 5454.

There are only one route:

- http://localhost:5454/api/guess-email/ - submit guess email request

## Development

This project has unit and integration tests and server a production build.

### `Tests`

```bash
npm run test
```

Launches the test runner in the interactive watch mode.\

### `Build`

```bash
npm run build
```

Builds the app for production to the `.dist` folder.\

### Debugging

This project uses https://www.npmjs.com/package/debug for development logging. To start `nodemon` and enable logging:

```bash
npm run debug
```
