# FIREBASE CONNECT4

This project showcases the multiplayer game, Connect 4, built with [Svelte](https://svelte.dev) and [Bulma](https://bulma.io/) on the frontend and powered by [Firebase](https://firebase.google.com/) on the backend.

This project contains two apps - frontend and backend. The svelte frontend app is at the root of the project (`/`). The Firebase functions app is contained within the functions directory (`/functions`).  

## Get started

Create a new project based on this repo:
```
npx degit https://github.com/c0dification/firebase-connect4.git firebase-connect4
```

Create a Firebase project with the [console](https://console.firebase.google.com/) (free tier is fine), enable a web app within the project, and locate the config object for the next step. This is an example config object: 
```
{
  apiKey: string,
  authDomain: string,
  databaseURL: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId: string
}
```

In order to deploy anything to Firebase, you will need to install the [Firebase command line tool](https://github.com/firebase/firebase-tools):

```
npm install -g firebase-tools
```

and then login from the command line:

```
firebase login
```

You are now all set to deploy to Firebase! 

## Install, Run & Deploy Svelte

```
cd firebase-connect4
npm install
```

Copy the Firebase config object to the `src/firebase.js` file's config constant. Save and run the 


```
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

To create an optimised version of the app for deployment:

```
npm run build
```

Then deploy it to Firebase Hosting:

```
firebase deploy --only hosting
```


## Install & Deploy Functions

```
cd firebase-connect4/functions
npm install
```

Then deploy functions to Firebase Functions:

```
firebase deploy --only functions
```

There is also a functions emulator that you can use to [run functions locally](https://firebase.google.com/docs/functions/local-emulator).

