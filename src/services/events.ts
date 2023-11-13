export type CustomEvents = keyof CustomEventDetail

export type CustomEventDetail = {
    "logout": undefined
}

export const dispatchCustomEvent = <T extends CustomEvents>(type: T, data: CustomEventDetail[T]) => {
    window.dispatchEvent(new CustomEvent(type, data))
}

export const registerCustomEvent = <T extends CustomEvents>(type: T, cb: (e: CustomEvent<CustomEventDetail[T]>) => void) => {
    window.addEventListener(type, cb as EventListener);
}

export const removeCustomEvent = <T extends CustomEvents>(type: T, cb: (e: CustomEvent<CustomEventDetail[T]>) => void) => {
    window.removeEventListener(type, cb as EventListener);
}