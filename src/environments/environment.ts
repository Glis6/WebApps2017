// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBWS35_6PS5UW7aNoNzmXS01KikI5J4y5E",
    authDomain: "wow-website-app.firebaseapp.com",
    databaseURL: "https://wow-website-app.firebaseio.com",
    projectId: "wow-website-app",
    storageBucket: "wow-website-app.appspot.com",
    messagingSenderId: "710981845767"
  }
};
