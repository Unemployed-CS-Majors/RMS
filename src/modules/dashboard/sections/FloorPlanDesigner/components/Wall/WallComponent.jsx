import React from 'react';
import styles from './WallComponent.module.css';

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