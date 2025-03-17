import React from 'react';
import styles from './WindowComponent.module.css';

/**
 * WindowComponent for rendering a window element in the floor plan
 *
 * @param {Object} props - Component props
 * @param {Object} props.window - Window data
 * @param {number} props.window.id - Unique identifier for the window
 * @param {number} props.window.intId - Internal ID of the window
 * @param {number} props.window.x - X-coordinate of the window's position
 * @param {number} props.window.y - Y-coordinate of the window's position
 * @param {number} props.window.width - Width of the window
 * @param {number} props.window.height - Height of the window
 * @param {number} [props.window.rotation=0] - Rotation angle of the window
 * @param {boolean} props.editMode - Flag indicating if edit mode is enabled
 * @param {Function} props.showElementDetails - Function to show details of the window element
 * @param {Function} props.startDragElement - Function to start dragging the window element
 * @param {Function} props.startResize - Function to start resizing the window element
 * @returns {JSX.Element} The WindowComponent
 */
const WindowComponent = ({
                             window,
                             editMode,
                             showElementDetails,
                             startDragElement,
                             startResize
                         }) => {
    const centerX = window.x + window.width / 2;
    const centerY = window.y + window.height / 2;
    const rotation = window.rotation || 0;

    return (
        <g key={window.id}>
            <rect
                x={window.x}
                y={window.y}
                width={window.width}
                height={window.height}
                className={`${styles.window} ${styles.windowNewAnimation}`}
                transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                onClick={(e) => editMode && showElementDetails(window, 'window', e)}
                onMouseDown={(e) => editMode && startDragElement(window, e, 'window')}
            />
            <text
                x={window.x + window.width / 2}
                y={window.y + window.height + 15}
                className={styles.tableId}
            >
                W#{window.intId}
            </text>

            {editMode && (
                <rect
                    x={window.x + window.width - 10}
                    y={window.y + window.height - 10}
                    width="10"
                    height="10"
                    className={styles.resizeHandle}
                    transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                    onMouseDown={(e) => startResize(window, e, 'window')}
                />
            )}
        </g>
    );
};

export default WindowComponent;