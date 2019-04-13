// @ts-check
function randomStr(length) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

let VueEars = {};

class VueEar {

    /**
     * VueEar Constructor
     * @constructor
     * @return {null|VueEar}
     * @param {boolean|string} [$name]
     * @param Vue
     */
    constructor($name = true, Vue = undefined) {
        if (Vue === undefined) {
            if (typeof window['Vue'] === 'undefined') {
                console.error('VueEar requires Vue to work!');
                return null;
            } else {
                Vue = window['Vue'];
            }
        }

        if ($name === true) {
            $name = randomStr(3);
        }

        if (typeof $name === 'string') {
            // Store name for global access
            VueEars[$name] = this;
            this.name = $name + ':';
        }

        this.connection = new Vue({});
        return this;
    }

    /**
     * Get full name of event including name.
     * @param {string} event
     * @param [$addName]
     */
    withName(event, $addName = true) {
        if (!$addName) return event;
        return this.name + event;
    }

    /**
     * Listen to events.
     * @param {string} event - Name of event to listen to.
     * @param {function} run - Function to run when event talks.
     * @param {boolean} $addName - Set false to disable adding of name
     * @return {VueEar}
     */
    listenFor(event, run, $addName = true) {
        event = this.withName(event, $addName);
        this.connection.$on(event, run);
        return this;
    }

    /**
     * Talk to events
     * @param {string} event - Name of event to talk to.
     * @param {object} data - Data to send along with your speech
     * @param {boolean} [$addName]
     * @return {VueEar}
     */
    say(event, data = {}, $addName = true) {
        this.connection.$emit(this.withName(event, $addName), data);
        return this;
    }

    /**
     * Talk to global events
     * @param  {string} ear
     * @param {string} say - Name of event to talk to.
     * @param {object} data - Data to send along with your speech
     * @return {VueEar}
     */
    talkTo(ear, say, data = {}) {
        if (VueEars[ear] instanceof VueEar) {
            VueEars[ear].say(say, data);
            return this;
        }
    }

    /**
     * Stop Listening to events
     * @param {string} event - Name of event to stop listening to
     * @param {boolean} [$addName]
     * @return {VueEar}
     */
    stopListeningFor(event, $addName = true) {
        this.connection.$off(this.withName(event, $addName));
        return this;
    }
}

VueEar.prototype.connection = null;
VueEar.prototype.name = '';

export default VueEar;