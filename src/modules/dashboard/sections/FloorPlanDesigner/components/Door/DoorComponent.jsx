import React from 'react';
import styles from './DoorComponent.module.css';

/**
 * DoorComponent for rendering a door element in the floor plan
 *
 * @param {Object} props - Component props
 * @param {Object} props.door - Door data
 * @param {number} props.door.x - X-coordinate of the door
 * @param {number} props.door.y - Y-coordinate of the door
 * @param {number} props.door.width - Width of the door
 * @param {number} props.door.height - Height of the door
 * @param {number} [props.door.rotation=0] - Rotation angle of the door
 * @param {number} props.door.intId - Internal ID of the door
 * @param {boolean} props.editMode - Flag indicating if edit mode is enabled
 * @param {Function} props.showElementDetails - Function to show details of the door element
 * @param {Function} props.startDragElement - Function to start dragging the door element
 * @param {Function} props.startResize - Function to start resizing the door element
 * @returns {JSX.Element} The DoorComponent
 */
const DoorComponent = ({
                           door,
                           editMode,
                           showElementDetails,
                           startDragElement,
                           startResize
                       }) => {
    // Calculate center of the door for rotation transform
    const centerX = door.x + door.width / 2;
    const centerY = door.y + door.height / 2;
    const rotation = door.rotation || 0;

    let pathD;

    // Draw the arc on the "top" side based on door's rotation
    if (rotation === 0) {
        pathD = `M ${door.x} ${door.y} A ${door.width} ${door.width} 0 0 1 ${door.x + door.width} ${door.y}`;
    } else if (rotation === 90) {
        pathD = `M ${door.x} ${door.y} A ${door.height} ${door.height} 0 0 1 ${door.x} ${door.y + door.height}`;
    } else if (rotation === 180) {
        pathD = `M ${door.x + door.width} ${door.y + door.height} A ${door.width} ${door.width} 0 0 1 ${door.x} ${door.y + door.height}`;
    } else if (rotation === 270) {
        pathD = `M ${door.x + door.width} ${door.y + door.height} A ${door.height} ${door.height} 0 0 1 ${door.x + door.width} ${door.y}`;
    }

    return (
        <g key={door.id}>
            <rect
                x={door.x}
                y={door.y}
                width={door.width}
                height={door.height}
                className={`${styles.door} ${styles.doorNewAnimation}`}
                transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            />
            <path
                d={pathD}
                className={styles.doorArc}
                transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            />
            <text
                x={door.x + door.width / 2}
                y={door.y + door.height + 15}
                className={styles.tableId}
            >
                D#{door.intId}
            </text>
            <rect
                x={door.x}
                y={door.y}
                width={door.width}
                height={door.height}
                fill="transparent"
                onClick={(e) => editMode && showElementDetails(door, 'door', e)}
                onMouseDown={(e) => editMode && startDragElement(door, e, 'door')}
                transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            />

            {editMode && (
                <rect
                    x={door.x + door.width - 10}
                    y={door.y + door.height - 10}
                    width="10"
                    height="10"
                    className={styles.resizeHandle}
                    transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                    onMouseDown={(e) => startResize(door, e, 'door')}
                />
            )}
        </g>
    );
};

export default DoorComponent;