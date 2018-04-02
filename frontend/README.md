# Frontend

## Instructions

Usage node version manager (nvm) is highly recommended. This project currently runs on Node 6.3.0.

```bash
npm install
npm install webpack babel-cli local-web-server --global
```

Do not edit the stylesheets in the *stylesheets folder* manually!

Only edit the items in the sass folder. Webpack will compile them into css after.

##  Running in development mode

```bash
npm start
```

## Compiling for production

```bash
webpack --config webpack.production.config.js
```

## Running it on production
```bash
ws -d dist -s index.html -p 8080
```

# full documentation coming soon!