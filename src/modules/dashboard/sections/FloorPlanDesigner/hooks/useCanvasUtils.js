import {useRef, useState} from 'react';

/**
 * Custom hook for managing canvas utilities in the floor plan designer
 *
 * @returns {Object} The canvas utilities
 * @returns {Object} svgRef - Reference to the SVG element
 * @returns {Object} svgDimensions - Dimensions of the SVG element
 * @returns {boolean} controlPanelOpen - Flag indicating if the control panel is open
 * @returns {Function} setControlPanelOpen - Function to set the control panel open state
 * @returns {Function} getCursorPosition - Function to get the cursor position relative to the SVG
 * @returns {Function} handleBackgroundClick - Function to handle clicks on the background
 */
export const useCanvasUtils = () => {
    const svgRef = useRef(null);
    const [svgDimensions] = useState({width: 800, height: 600});
    const [controlPanelOpen, setControlPanelOpen] = useState(true);

    /**
     * Get cursor position relative to the SVG element
     *
     * @param {Object} event - The event object
     * @returns {Object} The cursor position with x and y coordinates
     */
    const getCursorPosition = (event) => {
        const svg = svgRef.current;
        if (!svg) return {x: 0, y: 0};

        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
    };

    /**
     * Handle clicks on the background to close the control panel
     *
     * @param {Object} e - The event object
     * @param {Function} setSelectedElement - Function to set the selected element
     * @param {Function} setElementDetailsPosition - Function to set the element details position
     */
    const handleBackgroundClick = (e, setSelectedElement, setElementDetailsPosition) => {
        // Only handle if clicking directly on the floor-plan-designer div
        if (e.target.className === 'floor-plan-designer') {
            setControlPanelOpen(false);
            // Also clear any selected element
            setSelectedElement(null);
            setElementDetailsPosition(null);
        }
    };

    return {
        svgRef,
        svgDimensions,
        controlPanelOpen,
        setControlPanelOpen,
        getCursorPosition,
        handleBackgroundClick
    };
};