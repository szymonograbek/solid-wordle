First project/sandbox with SolidJS

## Usage

```bash
$ npm install # or pnpm install or yarn install
```

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## TODO
[ ] Load words dynamically (EN /PL)

[ ] Refactor <Word /> component

[ ] Add keyboard view under the guesses

[ ] Fix displaying multiple occurances of a letter (i.e. if a word contains one R and the user types a word with two Rs then both will be highlighted)

[ ] (Optional) Display word meaning with dictionary API