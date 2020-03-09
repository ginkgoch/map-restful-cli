# Project Template for Map Command Line

This is minimalist map command line project template.

## Build

One off build.
```bash
yarn build
```

Build and watching (used for development).
```bash
yarn build --watch
```

## Usage
```bash
yarn start random-point -f wkt
```

## Customize commands
Customize the command is easy with few steps.

1. Copy `src/commands/randomPoint.js` to a new file <newCommand.js>
2. Replace the `usage`, `desc` parameters etc.
3. Implement `action` with customized action. The options are stored in the `cmd` parameter
4. Export this new module in `src/commands/index.js`

## Built-in Features
Following items are prepared.
* Basic project layout
* `Webpack` integrated
* `Jest` integrated
* `Babel` for ES6 configured
* `Commander` integrated
* `Ginkgoch map library` integrated
* Build and test script are added
* Node.js es6 support
* A demo command to generate random point for a specific output format