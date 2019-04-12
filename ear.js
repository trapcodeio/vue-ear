// @ts-check
function randomStr(length) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

let VueEarEvents = {};

class VueEar {

    /**
     * VueEar Constructor
     * @constructor
     * @return {null|VueEar}
     * @param {boolean|string} [$prefix]
     */
    constructor($prefix = true) {
        if (typeof Vue === 'undefined') {
            console.error('VueEar requires Vue to work!');
            return null;
        }
        if ($prefix === true) {
            this.prefix = randomStr(3) + ':';
        } else if (typeof $prefix === 'string') {
            this.prefix = $prefix + ':';
        }

        this.connection = new Vue({});
        return this;
    }

    /**
     * Get full name of event including prefix.
     * @param {string} event
     * @param [$addPrefix]
     */
    withPrefix(event, $addPrefix = true) {
        if (!$addPrefix) return event;
        return this.prefix + event;
    }

    /**
     * Listen to events.
     * @param {string} event - Name of event to listen to.
     * @param {function} run - Function to run when event talks.
     * @param {boolean} $addPrefix - Set false to disable adding of prefix
     * @return {VueEar}
     */
    listenFor(event, run, $addPrefix = true) {
        event = this.withPrefix(event, $addPrefix);
        // Store events for global access
        VueEarEvents[event] = this;
        this.connection.$on(event, run);
        return this;
    }

    /**
     * Talk to events
     * @param {string} event - Name of event to talk to.
     * @param {object} data - Data to send along with your speech
     * @param {boolean} [$addPrefix]
     * @return {VueEar}
     */
    say(event, data = {}, $addPrefix = true) {
        this.connection.$emit(this.withPrefix(event, $addPrefix), data);
        return this;
    }

    /**
     * Talk to global events
     * @param  {string} prefix
     * @param {string} say - Name of event to talk to.
     * @param {object} data - Data to send along with your speech
     * @return {VueEar}
     */
    talkTo(prefix, say, data = {}) {
        let key = prefix + ':' + say;
        if (VueEarEvents[key] instanceof VueEar) {
            VueEarEvents[key].say(say, data);
            return this;
        }
    }

    /**
     * Stop Listening to events
     * @param {string} event - Name of event to stop listening to
     * @param {boolean} [$addPrefix]
     * @return {VueEar}
     */
    stopListeningFor(event, $addPrefix = true) {
        this.connection.$off(this.withPrefix(event, $addPrefix));
        return this;
    }
}

VueEar.prototype.connection = null;
VueEar.prototype.prefix = '';

export default VueEar;