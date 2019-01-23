[![CircleCI](https://circleci.com/gh/klamping/react-webdriverio-tests/tree/master.svg?style=svg)](https://circleci.com/gh/klamping/react-webdriverio-tests/tree/master)

# DOM Test Fixture Automation

An experiment to automate manual testing of the [ReactDOM test fixtures](https://github.com/facebook/react/tree/master/fixtures/dom).

## Setup

This setup has only been tested in High Sierra OSX.

```bash
yarn install
cp .env.example .env
```

### Local testing

Run:

```bash
yarn test
```

By default, this tests Chrome locally.

### Local Server Testing

To define a local server to test again, pass in a 'baseUrl' setting:

```bash
yarn test --baseUrl=http://localhost:5000
```

### Remote testing

1. Create an account (a free trial is fine) on [Sauce Labs](https://saucelabs.com/).
2. Copy `.env.example` to `.env`.
3. Fill in your Sauce Labs username and key within `.env`

```bash
yarn test
```

By default, this tests 4 different browsers on the Sauce Labs platform.
