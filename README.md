# Login

![ezcv logo](https://raw.githubusercontent.com/ignotochi/MerossJS/master/demos/images/merossJs_login.png)

# Home (en)

![ezcv logo](https://raw.githubusercontent.com/ignotochi/MerossJS/master/demos/images/merossJs_home.png)

# Home (ru) example

![ezcv logo](https://raw.githubusercontent.com/ignotochi/MerossJS/master/demos/images/marossJs_home_ru.png)

## What is MerossJS?

**MerossJS** is a frontend developed in Angular for **MerossAPI** ([GitHub Repository](https://github.com/ignotochi/MerossApi.git)) to manage all your devices. You can find the source code to make improvements and debug the project. To do this, you need to download and execute MerossAPI with a Python interpreter and then compile and expose this project.

## See MerossJsBundle

If you don't want to install MerossAPI and MerossJS separately and just want to use it, check out **MerossJsBundle** ([GitHub Repository](https://github.com/ignotochi/MerossJsBundle.git)). 

It's an all-in-one solution with Docker. 

A bash script clones all required repositories (MerossApi & MerossJS), compiles them, and publishes both on two Docker containers. 

You can access the app at http://localhost:8389.

## Changelog - 1.0.2

[Added] **Multilingual Support:**
   - Added support for Italian, English, French, Spanish, German, Russian, and Chinese languages. Users can now seamlessly interact with the app in their preferred language.

[Added] **Session Polling Functionality:**
   - Introduced a polling feature to keep the session active. Users have the flexibility to enable or disable this function based on their preferences.

## Development Server

To debug this project, you need to install all dependencies. Follow these steps:

- Install NVM ([GitHub Repository](https://github.com/coreybutler/nvm-windows)), and then install and use Node.js v18 from NVM.

- Run `nvm install 18`
  
- Run `nvm use 18`
  
- Run `npm install`.

- Run `npm start` for a dev server.

- Navigate to `http://localhost:4200/`.

- The application will automatically reload if you change any of the source files.

## Build

To build the application from this source code, **needed only if you whant to publish this project on your web server**, run the following command from the root directory:

``` bash 
ng build --configuration production --base-href "/"
```
Change "/" with the base URL you prefer.

A folder called dist will be created in the root directory with compiled source files. Move all files into your web server.

If accessed from localhost, no additional action is required.

Inside the dist/assets folder, you will find a file named merossApi.conf.json:

``` json 
{
    "language" : "it", (default language used by frontend)
    "port": "4449", (port of MerossApi server)
    "marossApiUrl": "localhost", (url of MerossAPI server)
    "protocol": "https" (protocol of MerossAPI server)
}

Modify it only if necessary, such as when the backend is exposed on an address other than localhost (default) or if you want to change the default language.

Feel free to adjust any part according to your preferences!

