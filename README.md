# API3 Ecosystem with Nuxt3

## Production deployment

https://ecosystem.api3.org/

## Staging deployment

https://staging.d1ecxl0h41jkn0.amplifyapp.com/

## Frontend showcase mode

This branch runs as a frontend-only showcase. No private `.env`, MongoDB, AWS/S3, Brevo, GitHub app, or SIWE backend secrets are required for local review.

```bash
COREPACK_ENABLE_AUTO_PIN=0 yarn install --frozen-lockfile --ignore-engines
COREPACK_ENABLE_AUTO_PIN=0 yarn dev
```

The add-dapp flow uses a demo wallet and no-op submission response. Articles and OEV data are served from local showcase fixtures.

## Setup with docker

### Prepare docker image

```bash
# docker
docker build . -t api3-ecosystem-image

```

### Run docker image

```bash
# docker
docker run --env-file ./.env  -p  3000:3000 -p  80:80 api3-ecosystem-image

```

### Local setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

```

### Development Server

Start the development server on `http://localhost:3000`

```bash
yarn dev
```

### Production build

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
