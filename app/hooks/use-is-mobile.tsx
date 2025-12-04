import { useMediaQuery } from "./use-media-query";

export function useIsMobile() {
    return useMediaQuery("(max-width: 1023px)");
}
