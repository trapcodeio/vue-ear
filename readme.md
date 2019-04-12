## Vue Ear

A library that makes vue events fun to use.
Talk to any component from any component

#### Install Using Npm
```
npm install vue-ear
```

#### Install Using Yarn
```
yarn add install vue-ear
```

####
This doc is incomplete for now..

#### Example
```javascript
import VueEar from "vue-ear";

let userEvents = new VueEar('user');
let sideBarEvents = new VueEar('sidebar');

sideBarEvents.listenFor('hide', ()=>{
    // Hide Side Bar
})

userEvents.listenFor('logoutWasClicked', ()=>{
    // Hide Side bar
    sideBarEvents.say('hide');
    // or talk to sidebar from anywhere in your app.
    userEvents.talkTo('sidebar', 'hide');
})

// Triggers the user logoutWasClicked event
sideBarEvents.talkTo('user', 'logoutWasClicked');
```