# Translatol

A tool to translate XLIFF files. It comes in two flavors a desktop application and a VSCode extension.

[![Testing](https://github.com/vtabary/translatol/actions/workflows/testing.yml/badge.svg)](https://github.com/vtabary/translatol/actions/workflows/testing.yml)

## Installation

All application releases are available on [the release page](https://github.com/vtabary/translatol/releases)

VSCode extension is available in the [Market Place](https://marketplace.visualstudio.com/items?itemName=PerfectMemory.translatol)
and can be installed with the following command in VSCode:

```vscode
ext install PerfectMemory.translatol
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Install

```shell
npm install

# or with yarn

yarn
```

### Desktop application

#### Launch

To start the application, you have to run 2 concurrent jobs

```shell
npm start
npm run electron

# or with yarn

yarn start
yarn electron
```

#### Build

```shell
npm run build
npm run dist

# or with yarn

yarn build
yarn dist
```

### VSCode extension

#### Build

```shell
npm run build:extension

# or with yarn

yarn build:extension
```

#### Pack VSIX file

```shell
npm run pack:extension

# or with yarn

yarn pack:extension
```

## License

[ISC](https://choosealicense.com/licenses/isc/)
