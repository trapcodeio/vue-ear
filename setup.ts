import {onBeforeUnmount, onMounted} from "vue";
import VueEar, {useEar} from "./index";

class VueEarSetup extends VueEar {
    listen(event: string, fn: any) {
        onMounted(() => {
            this.on(event, fn);
        });

        onBeforeUnmount(() => {
            this.off(event);
        });
    }
}

export function useVueEarSetup(name: string) {
    return useEar(name, VueEarSetup);
}
