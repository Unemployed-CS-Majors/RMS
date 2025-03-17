import React from 'react';
import TableComponent from '../Table/TableComponent';
import WallComponent from '../Wall/WallComponent';
import DoorComponent from '../Door/DoorComponent';
import WindowComponent from '../Window/WindowComponent';
import {DrawingMode} from "../../../../../../constants/drawingModes";

/**
 * FloorPlanCanvas component for rendering the floor plan with interactive elements
 *
 * @param {Object} props - Component props
 * @param {Object} props.svgRef - Reference to the SVG element
 * @param {Object} props.svgDimensions - Dimensions of the SVG element
 * @param {boolean} props.editMode - Flag indicating if edit mode is enabled
 * @param {string} props.currentDrawingMode - The current drawing mode
 * @param {Array} props.tables - Array of table elements
 * @param {Array} props.walls - Array of wall elements
 * @param {Array} props.doors - Array of door elements
 * @param {Array} props.windows - Array of window elements
 * @param {Object} props.startPoint - Starting point for drawing walls
 * @param {boolean} props.isDragging - Flag indicating if an element is being dragged
 * @param {Object} props.draggedItem - The currently dragged item
 * @param {Function} props.addTable - Function to add a table
 * @param {Function} props.addDoor - Function to add a door
 * @param {Function} props.addWindow - Function to add a window
 * @param {Function} props.startDrawWall - Function to start drawing a wall
 * @param {Function} props.endDrawWall - Function to end drawing a wall
 * @param {Function} props.stopDragging - Function to stop dragging an element
 * @param {Function} props.dragElement - Function to drag an element
 * @param {Function} props.startDragElement - Function to start dragging an element
 * @param {Function} props.showElementDetails - Function to show details of an element
 * @param {Function} props.startResize - Function to start resizing an element
 * @returns {JSX.Element} The FloorPlanCanvas component
 */
const FloorPlanCanvas = ({
                             svgRef,
                             svgDimensions,
                             editMode,
                             currentDrawingMode,
                             tables,
                             walls,
                             doors,
                             windows,
                             startPoint,
                             isDragging,
                             draggedItem,
                             addTable,
                             addDoor,
                             addWindow,
                             startDrawWall,
                             endDrawWall,
                             stopDragging,
                             dragElement,
                             startDragElement,
                             showElementDetails,
                             startResize
                         }) => {
    // Helper function for getting cursor position
    function getCursorPosition(event) {
        const svg = svgRef.current;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
    }

    return (
        <svg
            ref={svgRef}
            width={svgDimensions.width}
            height={svgDimensions.height}
            onClick={(e) => {
                if (!editMode) return;

                // Don't propagate clicks from SVG to parent container
                e.stopPropagation();

                switch (currentDrawingMode) {
                    case DrawingMode.TABLE:
                        // This will now trigger the modal instead of directly adding a table
                        addTable(e);
                        break;
                    case DrawingMode.DOOR:
                        addDoor(e);
                        break;
                    case DrawingMode.WINDOW:
                        addWindow(e);
                        break;
                    default:
                        // Clicking on empty space clears the selection
                        break;
                }
            }}
            onMouseDown={(e) => {
                if (!editMode) return;

                if (currentDrawingMode === DrawingMode.WALL) {
                    startDrawWall(e);
                }
            }}
            onMouseUp={(e) => {
                if (!editMode) return;

                if (currentDrawingMode === DrawingMode.WALL) {
                    endDrawWall(e);
                }

                stopDragging();
            }}
            onMouseMove={(e) => {
                if (!editMode) return;

                if (startPoint && currentDrawingMode === DrawingMode.WALL) {
                    // Update temporary wall preview
                    const point = getCursorPosition(e);
                    const tmpWall = document.getElementById("temp-wall");
                    if (tmpWall) {
                        tmpWall.setAttribute("x2", point.x);
                        tmpWall.setAttribute("y2", point.y);
                    }
                } else {
                    dragElement(e);
                }
            }}
            onMouseLeave={() => {
                if (editMode) {
                    stopDragging();
                }
            }}
            style={{border: '1px solid #ccc'}}
        >
            {/* Walls */}
            {walls.map(wall => (
                <WallComponent
                    key={wall.id}
                    wall={wall}
                    editMode={editMode}
                    showElementDetails={showElementDetails}
                    startDragElement={startDragElement}
                    startResize={startResize}
                />
            ))}

            {/* Tables */}
            {tables.map(table => (
                <TableComponent
                    key={table.id}
                    table={table}
                    editMode={editMode}
                    currentDrawingMode={currentDrawingMode}
                    isDragging={isDragging}
                    draggedItem={draggedItem}
                    showElementDetails={showElementDetails}
                    startDragElement={startDragElement}
                    svgRef={svgRef}
                    isNew={table.isNew}
                />
            ))}

            {/* Doors */}
            {doors.map(door => (
                <DoorComponent
                    key={door.id}
                    door={door}
                    editMode={editMode}
                    showElementDetails={showElementDetails}
                    startDragElement={startDragElement}
                    startResize={startResize}
                />
            ))}

            {/* Windows */}
            {windows.map(window => (
                <WindowComponent
                    key={window.id}
                    window={window}
                    editMode={editMode}
                    showElementDetails={showElementDetails}
                    startDragElement={startDragElement}
                    startResize={startResize}
                />
            ))}

            {/* Temporary wall preview */}
            {startPoint && currentDrawingMode === DrawingMode.WALL && (
                <line
                    id="temp-wall"
                    x1={startPoint.x}
                    y1={startPoint.y}
                    x2={startPoint.x}
                    y2={startPoint.y}
                    stroke="black"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                />
            )}
        </svg>
    );
};

export default FloorPlanCanvas;