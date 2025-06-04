import { useEffect, useState } from "react";
type ScreenType = "xs" | "sm" | "md" | "lg"| "xl" | "2xl"
interface StateProps {
    width: number | undefined;
    height: number | undefined;
    meaning: ScreenType | undefined;
}

function getMean(width: number ): ScreenType | undefined {
    if(width < 0) return undefined;
    if (width <= 320) {
        return "xs";
    } else if (width <= 640) {
        return "sm";
    } else if (width <= 768) {
        return "md";
    } else if (width <= 1024) {
        return "lg";
    } else if (width <= 1440) {
        return "xl";
    } else {
        return "2xl";
    }
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<StateProps>({
        width: undefined,
        height: undefined,
        meaning: getMean(-1)
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            meaning: getMean(window.innerWidth)
        });
    };

    useEffect(() => {
        // Set initial window size
        handleResize();

        // Add event listener to update window size on resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return windowSize;
}