# Map RESTful API Service Tool

This is a prefabricate map RESTful API service tool. Refer to [map router](https://github.com/ginkgoch/koa-map-router) for build-in APIs.

## Install
```bash
yarn add ginkgoch-map-restful-cli
```

## Usage
```bash
Usage: bundle command [options]

This is a prefabricate map RESTful API service tool.

Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  serve [options]    Serve a mapping RESTful API services
  cluster [options]  Serve a mapping RESTful API services in cluster mode
```

### Serve a single process RESTful service
```bash
Usage: bundle serve [options]

Serve a mapping RESTful API services

Options:
  -p, --port <port>      The port of the service, default is 3000
  -c, --config <config>  The map configure file, default is a demo map
  -e, --plugins <pluginDir>  The plugin directory, must be in the project node modules scope
  -h, --help             output usage information
```

### Serve multiple process RESTful service
```bash
Usage: bundle cluster [options]

Serve a mapping RESTful API services in cluster mode

Options:
  -p, --port <port>      The port of the service, default is 3000
  -c, --config <config>  The map configure file, default is a demo map
  -n, --slaves <slave>   The count of slave, must be greater than 0, default is cpu core count
  -e, --plugins <pluginDir>  The plugin directory, must be in the project node modules scope
  -h, --help             output usage information
```

### Work with map configure file
WIP...

### Work with plugins
WIP...