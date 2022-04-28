# firebase-auth-https-endpoint

https://github.com/coding-to-music/firebase-auth-https-endpoint

https://firebase-auth-https-endpoint.vercel.app

https://firebase-auth-https-endpoint.herokuapp.com

by Google Firebase https://github.com/firebase/functions-samples

https://github.com/firebase/functions-samples/tree/main/authorized-https-endpoint

# Authorized HTTPS Endpoint

This samples shows how to restrict an HTTPS Function to only the Firebase users of your app.

Only users who pass a valid Firebase ID token as a Bearer token in the `Authorization` header of the HTTP request or in a `__session` cookie are authorized to use the function.

Checking the ID token is done with an ExpressJs middleware that also passes the decoded ID token in the Express request object.

Once authorized the function respond with `Hello <username>`.

This sample comes with a simple web-based UI whose code is in [public](public) directory that lets you sign-in Firebase and initiates an authorized XHR to the Function.

## Setting up the sample

1.  Create a Firebase Project using the [Firebase Console](https://console.firebase.google.com).
1.  Enable the **Google** Provider in the **Auth** section.
1.  Clone or download this repo and open the `authorized-https-endpoint` directory.
1.  You must have the Firebase CLI installed. If you don't have it install it with `npm install -g firebase-tools` and then configure it with `firebase login` I needed `firebase login --no-localhost`
1.  Configure the CLI locally by using `firebase use --add` and select your project in the list. You can view the projects with `firebase projects:list`
1.  Install dependencies locally by running: `cd functions; npm install; cd -`

## Deploy and test

This sample comes with a web-based UI for testing the function.
To test locally do:

1.  Start serving your project locally using `firebase serve --only hosting,functions`
1.  Open the app in a browser at `http://localhost:5000`.
1.  Sign in the web app in the browser using Google Sign-In and two authenticated requests will be performed from the client and the result will be displayed on the page, normally "Hello <user displayname>".

To deploy and test on prod do:

1.  Deploy your project using `firebase deploy`
1.  Open the app using `firebase open hosting:site`, this will open a browser.
1.  Sign in the web app in the browser using Google Sign-In and two authenticated requests will be performed from the client and the result will be displayed on the page, normally "Hello <user displayname>".

## Contributing

We'd love that you contribute to the project. Before doing so please read our [Contributor guide](../CONTRIBUTING.md).

## License

© Google, 2017. Licensed under an [Apache-2](../LICENSE) license.

## Environment Values

```java
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,

	const url = process.env.REACT_APP_API_URL + "/songs"

    await mongoose.connect(process.env.MONGODB_URI, connectionParams);

```

## Firebase setup

/client/src/firebase.js

```java
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
export default storage;
```

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/firebase-auth-https-endpoint.git
git push -u origin main
```

## Heroku

```java
heroku create firebase-auth-https-endpoint
```

## Heroku MongoDB Environment Variables

```java
heroku config:set

heroku config:set JWT_SECRET="secret"

heroku config:set PUBLIC_URL="https://firebase-auth-https-endpoint.herokuapp.com"
```

## Push to Heroku

```java
git push heroku

# or

npm run deploy
```
