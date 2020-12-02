# Loan Application App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build ace-lib-themes

Run `npm run build:themes` to compile all the supported theme scss files into css files. Refer to the package.json for additional options.

Note: It is necessary to install node-sass compiler before running the above command. use `npm i node-sass -g ` to install it globally.

## Build CUI template
Run `npm run gen:tmpl` generates the cui template for packaging. It compiles the SCSS files used for theming, performs the producton build and generates the `templates-details.json`. 

The generated CUI template artifacts will be available in the `./dist/loan-app-template/` directory. You will need to 'zip' this directory before uploading to agileapps platform.
>Note: You might need to remove the *.scss and *.ico files present inside `./dist/loan-app-template/` directory before zipping it, unless you have explicitly white-listed these file extensions in your tenant. Otherwise, your template installation would fail.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
