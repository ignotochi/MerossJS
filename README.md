# Login

![ezcv logo](https://raw.githubusercontent.com/ignotochi/MerossJS/master/demos/images/merossJs_login.png)

# Home (en)

![ezcv logo](https://raw.githubusercontent.com/ignotochi/MerossJS/master/demos/images/merossJs_home.png)

# Home (ru) example

![ezcv logo](https://raw.githubusercontent.com/ignotochi/MerossJS/master/demos/images/marossJs_home_ru.png)

# Changelog - 1.0.2

This frontend development for the MerossApi now includes two significant enhancements:

[Added] **Multilingual Support:**
   - Added support for Italian, English, French, Spanish, German, Russian, and Chinese languages. Users can now seamlessly interact with the app in their preferred language.

[Added] **Session Polling Functionality:**
   - Introduced a polling feature to keep the session active. Users have the flexibility to enable or disable this function based on their preferences.

## Development server

To debug the project first of all you need to install al dependecies, foollow this steps:

- install nvm (https://github.com/coreybutler/nvm-windows), and than install and use nodejs v18 from nvm.

- Run  `nmp install`

- Run `nmp start` for a dev server

- Navigate to `http://localhost:4200/`.

- The application will automatically reload if you change any of the source files.

## Build
To build the application from this source code run from source code root directory:

``` json 
{
ng build --configuration production --base-href "/"
}
```
change "/" whit base ut you prefer.

Than a folder called dist will be created in roout directory whit copiled source. 
Move all files into you web server.

If accessed from localhost, no additional action is required. Otherwise, you can set up a reverse proxy for both containers and reach them in the way you prefer.

Inside the dist/assets folder, you will find a file named merossApi.conf.json:

``` json 
{
    "language" : "it",
    "port": "4449",
    "marossApiUrl": "localhost",
    "protocol": "https"
}

Modify it only if necessary, such as when the backend is exposed on an address other than localhost (default) or if you want to change the default language.

