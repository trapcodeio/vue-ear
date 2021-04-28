import VueEar from "./dist";

let userEvents = new VueEar("user");
let sideBarEvents = new VueEar("sidebar");

sideBarEvents.on("hide", () => {
    // Hide Side Bar
    console.log("hey");
});

userEvents.on("logoutWasClicked", () => {
    // Hide Side bar
    sideBarEvents.emit("hide");
    // or talk to sidebar from anywhere in your app.
    userEvents.talkTo("sidebar", "hide");
});

// Triggers the user logoutWasClicked event
sideBarEvents.talkTo("user", "logoutWasClicked");
