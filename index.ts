import mitt, { Emitter } from "mitt";

function randomStr(length: number) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const VueEars: Record<string, VueEar> = {};

class VueEar {
    name: string;
    private bus: Emitter;

    /**
     * VueEar Constructor
     * @constructor
     * @return {null|VueEar}
     * @param name
     */
    constructor(name?: string) {
        if (!name) name = randomStr(10);

        // Set Name
        this.name = name ? name : randomStr(10);
        // Set bus
        this.bus = mitt();

        // Store in ears if not exists
        if (VueEars.hasOwnProperty(name)) {
            throw new Error(`VueEar "${name}" already exists`);
        }

        // Add To VueEars
        VueEars[name] = this;

        // Return instance.
        return this;
    }

    /**
     * Get full name of event including name.
     * @param {string} event
     */
    id(event: string) {
        return this.name + ":" + event;
    }

    /**
     * Listen to events.
     * @param {string} event - Name of event to listen to.
     * @param {function} run - Function to run when event talks.
     * @return {VueEar}
     */
    on(event: string, run: (...args: any[]) => any | void) {
        // Get Event Name && start listening for event
        this.bus.on(this.id(event), run);

        return this;
    }

    /**
     * Talk to events
     * @param {string} event - Name of event to talk to.
     * @param {object} data - Data to send along with your speech
     * @param {boolean} [$addName]
     * @return {VueEar}
     */
    emit(event: string, data: Record<string, any> = {}) {
        this.bus.emit(this.id(event), data);
        return this;
    }

    /**
     * Talk to global events
     * @param  {string} ear
     * @param {string} event - Name of event to talk to.
     * @param {object} data - Data to send along with your speech
     * @return {VueEar}
     */
    talkTo(ear: string, event: string, data = {}) {
        if (VueEars[ear] instanceof VueEar) {
            VueEars[ear].emit(event, data);
            return this;
        }
    }

    /**
     * Stop Listening to events
     * @param {string} event - Name of event to stop listening to
     * @param run
     * @return {VueEar}
     */
    off(event: string, run?: (...args: any[]) => any | void) {
        this.bus.off(this.id(event), run ? run : () => false);
        return this;
    }

    destroy() {
        this.bus.off("*", () => false);
        delete VueEars[this.name];
        // Return null
        return null;
    }
}

/**
 * Use existing ear or create new
 * @param ear
 * @param $class
 */
export function useEar<T extends typeof VueEar>(ear: string, $class: T) {
    if (VueEars[ear] instanceof VueEar) {
        return VueEars[ear] as InstanceType<T>;
    } else {
        return new ($class ? $class : VueEar)(ear) as InstanceType<T>;
    }
}

/**
 * Use existing ear or create new
 * @param ear
 */
export function useVueEar(ear: string) {
    return useEar(ear, VueEar);
}

export default VueEar;
