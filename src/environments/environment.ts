// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://firacard-express.herokuapp.com/v1',
  google: {
    clientId: '1078296083159-cafim0io06hqo4l97qb440r0c4frv5qn.apps.googleusercontent.com',
  },
  facebook: {
    appId: '313244885878489'
  },
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
