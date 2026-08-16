export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type MetaEventParams = Record<string, string | number | string[]>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaEvent(eventName: string, params?: MetaEventParams) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params);
}
