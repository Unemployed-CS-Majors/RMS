import React from 'react';
import styles from './WallComponent.module.css';

/**
 * WallComponent for rendering a wall element in the floor plan
 *
 * @param {Object} props - Component props
 * @param {Object} props.wall - Wall data
 * @param {number} props.wall.id - Unique identifier for the wall
 * @param {number} props.wall.intId - Internal ID of the wall
 * @param {number} props.wall.x1 - X-coordinate of the wall's starting point
 * @param {number} props.wall.y1 - Y-coordinate of the wall's starting point
 * @param {number} props.wall.x2 - X-coordinate of the wall's ending point
 * @param {number} props.wall.y2 - Y-coordinate of the wall's ending point
 * @param {boolean} props.editMode - Flag indicating if edit mode is enabled
 * @param {Function} props.showElementDetails - Function to show details of the wall element
 * @param {Function} props.startDragElement - Function to start dragging the wall element
 * @param {Function} props.startResize - Function to start resizing the wall element
 * @returns {JSX.Element} The WallComponent
 */
const WallComponent = ({
                           wall,
                           editMode,
                           showElementDetails,
                           startDragElement,
                           startResize
                       }) => {
    return (
        <g key={wall.id}>
            <line
                x1={wall.x1}
                y1={wall.y1}
                x2={wall.x2}
                y2={wall.y2}
                className={`${styles.wall} ${styles.wallNewAnimation}`}
                onClick={(e) => editMode && showElementDetails(wall, 'wall', e)}
                onMouseDown={(e) => editMode && startDragElement(wall, e, 'wall')}
            />
            <text
                x={(wall.x1 + wall.x2) / 2}
                y={(wall.y1 + wall.y2) / 2 + 15}
                className={styles.tableId}
            >
                #{wall.intId}
            </text>

            {editMode && (
                <circle
                    cx={wall.x2}
                    cy={wall.y2}
                    r="5"
                    className={styles.resizeHandle}
                    onMouseDown={(e) => startResize(wall, e, 'wall')}
                />
            )}
        </g>
    );
};

export default WallComponent;