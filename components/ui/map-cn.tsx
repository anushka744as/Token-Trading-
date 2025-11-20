

// import {
//     createContext,
//     useCallback,
//     useContext,
//     useEffect,
//     useMemo,
//     useRef,
// } from "react";

// /** Map context properties */
// type MapContextProps = {
// // Address
// address?: string; /** Map marker address */
// };

// const MapContext = createContext<MapContextProps | null>(null);

// /** Default map configuration */
// const defaultOption = {
// zoom: 15, /** Default zoom level */
// lng: 116.404, /** Default longitude (Beijing Tiananmen Square) */
// lat: 39.915, /** Default latitude (Beijing Tiananmen Square) */
// address: "Chang'an Street, Dongcheng District, Beijing", /** Default address */
// };

// const loadScript = (src: string) => {
// return new Promise<void>((ok, fail) => {
//     const script = document.createElement("script");
//     script.onerror = (reason) => fail(reason);

//     if (~src.indexOf("{{callback}}")) {
//     const callbackFn = `loadscriptcallback_${(+new Date()).toString(36)}`;
//     (window as any)[callbackFn] = () => {
//         ok();
//         delete (window as any)[callbackFn];
//     };
//     src = src.replace("{{callback}}", callbackFn);
//     } else {
//     script.onload = () => ok();
//     }

//     script.src = src;
//     document.head.appendChild(script);
// });
// };

// const useMap = () => {
// const context = useContext(MapContext);

// if (!context) {
//     return {};
// }

// return context;
// };

// /**
//  * Map title component
//  * @param {string} className - Custom class name
//  */
// const MapTitle = ({ className }: React.ComponentProps<"div">) => {
// const { address } = useMap();
// if (!address) return null;
// return <span className={`text-lg font-bold ${className}`}>{address}</span>;
// };

// // Record Baidu Map SDK loading status
// let BMapGLLoadingPromise: Promise<void> | null = null;

// /**
//  * Baidu Map main component
//  * @param {string} ak - Baidu Map API key, defaults to 'OeTpXHgdUrRT2pPyAPRL7pog6GlMlQzl'
//  * @param {object} option - Map configuration options
//  * @param {number} option.zoom - Map zoom level
//  * @param {number} option.lng - Longitude coordinate
//  * @param {number} option.lat - Latitude coordinate
//  * @param {string} option.address - Marker address
//  * @param {string} className - Container custom class name
//  * @param {ReactNode} children - Child components, usually MapTitle
//  */
// const Map = ({
// ak,
// option,
// className,
// children,
// ...props
// }: React.ComponentProps<"div"> & {
// ak: string;
// option?: {
//     zoom: number;
//     lng: number;
//     lat: number;
//     address: string;
// };
// }) => {
// const mapRef = useRef<HTMLDivElement>(null);
// const currentRef = useRef(null);

// const _options = useMemo(() => {
//     return { ...defaultOption, ...option };
// }, [option]);

// const contextValue = useMemo<MapContextProps>(
//     () => ({
//     address: option?.address,
//     }),
//     [option?.address]
// );

// const initMap = useCallback(() => {
//     if (!mapRef.current) return;

//     let map = currentRef.current;

//     if (!map) {
//     // Create map instance
//     map = new (window as any).BMapGL.Map(mapRef.current);
//     currentRef.current = map;
//     }

//     // Clear overlays
//     if (map) {
//         map.clearOverlays();
//       }

//     // Set map center coordinates and map level
//     const center = new (window as any).BMapGL.Point(
//     _options?.lng,
//     _options?.lat
//     );
//     if (map){
//     map.centerAndZoom(center, _options?.zoom);
// }
//     // Add marker
//     const marker = new (window as any).BMapGL.Marker(center);
//     if (map){
//     map.addOverlay(marker);
// }
// }, [_options]);

// useEffect(() => {
//     // Check if Baidu Map API is loaded
//     if ((window as any).BMapGL) {
//     initMap();
//     } else if (BMapGLLoadingPromise) {
//     BMapGLLoadingPromise.then(initMap).then(() => {
//         BMapGLLoadingPromise = null;
//     });
//     } else {
//     BMapGLLoadingPromise = loadScript(
//         `//api.map.baidu.com/api?type=webgl&v=1.0&ak=${ak}&callback={{callback}}`
//     );

//     BMapGLLoadingPromise.then(initMap).then(() => {
//         BMapGLLoadingPromise = null;
//     });
//     }
// }, [ak, initMap]);

// useEffect(() => {
//     return () => {
//     if (currentRef.current) {
//         currentRef.current = null;
//     }
//     };
// }, []);

// return (
//     <MapContext.Provider value={contextValue}>
//     <div
//         ref={mapRef}
//         className={`w-full aspect-[16/9] ${className}`}
//         {...props}
//     ></div>
//     {children}
//     </MapContext.Provider>
// );
// };

// export { Map, MapTitle };
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from "react";

// ------------------------------
// TYPES & CONTEXT
// ------------------------------
type MapContextProps = {
    address?: string;
};

const MapContext = createContext<MapContextProps | null>(null);

const defaultOption = {
    zoom: 15,
    lng: 116.404,
    lat: 39.915,
    address: "Chang'an Street, Dongcheng District, Beijing",
};

// ------------------------------
// LOAD SCRIPT ONLY IN BROWSER
// ------------------------------
const loadScript = (src: string) => {
    if (typeof window === "undefined") return Promise.resolve(); // SSR guard

    return new Promise<void>((ok, fail) => {
        const script = document.createElement("script");
        script.onerror = (reason) => fail(reason);

        if (~src.indexOf("{{callback}}")) {
            const callbackFn = `loadscriptcallback_${Date.now().toString(36)}`;
            (window as any)[callbackFn] = () => {
                ok();
                delete (window as any)[callbackFn];
            };
            src = src.replace("{{callback}}", callbackFn);
        } else {
            script.onload = () => ok();
        }

        script.src = src;
        document.head.appendChild(script);
    });
};

// ------------------------------
// CONTEXT HOOK
// ------------------------------
const useMap = () => useContext(MapContext) ?? {};

// ------------------------------
// MAP TITLE
// ------------------------------
export const MapTitle = ({ className }: React.ComponentProps<"div">) => {
    const { address } = useMap();
    if (!address) return null;
    return <span className={`text-lg font-bold ${className}`}>{address}</span>;
};

// ------------------------------
// MAP COMPONENT
// ------------------------------
let BMapGLLoadingPromise: Promise<void> | null = null;

export const Map = ({
    ak,
    option,
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    ak: string;
    option?: {
        zoom: number;
        lng: number;
        lat: number;
        address: string;
    };
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const currentRef = useRef<any>(null);

    const _options = useMemo(() => {
        return { ...defaultOption, ...option };
    }, [option]);

    const contextValue = useMemo<MapContextProps>(
        () => ({
            address: option?.address,
        }),
        [option?.address]
    );

    const initMap = useCallback(() => {
        if (typeof window === "undefined") return; // SSR guard
        if (!mapRef.current) return;

        let map = currentRef.current;

        if (!map && (window as any).BMapGL) {
            map = new (window as any).BMapGL.Map(mapRef.current);
            currentRef.current = map;
        }

        if (!map) return;

        // Safe null checks
        try {
            map?.clearOverlays?.();
        } catch {}

        const center = new (window as any).BMapGL.Point(
            _options.lng,
            _options.lat
        );

        try {
            map?.centerAndZoom?.(center, _options.zoom);
        } catch {}

        const marker = new (window as any).BMapGL.Marker(center);
        try {
            map?.addOverlay?.(marker);
        } catch {}
    }, [_options]);

    // ------------------------------
    // INIT SCRIPT + MAP
    // ------------------------------
    useEffect(() => {
        if (typeof window === "undefined") return; // SSR guard

        if ((window as any).BMapGL) {
            initMap();
        } else {
            if (!BMapGLLoadingPromise) {
                BMapGLLoadingPromise = loadScript(
                    `//api.map.baidu.com/api?type=webgl&v=1.0&ak=${ak}&callback={{callback}}`
                );
            }

            BMapGLLoadingPromise.then(() => {
                initMap();
                BMapGLLoadingPromise = null;
            });
        }
    }, [ak, initMap]);

    // Cleanup
    useEffect(() => {
        return () => {
            currentRef.current = null;
        };
    }, []);

    return (
        <MapContext.Provider value={contextValue}>
            <div
                ref={mapRef}
                className={`w-full aspect-[16/9] ${className}`}
                {...props}
            ></div>
            {children}
        </MapContext.Provider>
    );
};