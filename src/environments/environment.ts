// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://firacard-express.herokuapp.com/v1',
  google: {
    clientId: '88594060065-qnjot70qi25793smlmotomvid5me30h9.apps.googleusercontent.com',
  },
  facebook: {
    appId: '313244885878489'
  },
  stripePublicKey: 'pk_test_51IcYm2BC0cB59uLZ5Qo5fc4JT8c70UBO0klCxZTjTsYEWJHGuZ0fb8U610QQ9bl6GGkFAouOD4sGHkrbM7VedsBU00jG4wq0jk',
  cloudinary: {apiKey: '247151848688876', cloudName: 'dx5bcp5ps', secret: ''}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
