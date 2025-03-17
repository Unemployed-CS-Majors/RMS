import React from 'react';
import PropTypes from 'prop-types';

/**
 * Window component
 *
 * Renders a window with specified coordinates, dimensions, type, and state.
 *
 * @param {Object} props - The component props
 * @param {number} props.x - The x-coordinate of the window's position
 * @param {number} props.y - The y-coordinate of the window's position
 * @param {number} [props.width=60] - The width of the window
 * @param {number} [props.height=10] - The height of the window
 * @param {number} [props.wallThickness=8] - The thickness of the wall
 * @param {number} [props.rotation=0] - The rotation angle of the window in degrees
 * @param {string} [props.windowType='fixed'] - The type of the window ('fixed', 'sliding', 'casement', 'bay')
 * @param {boolean} [props.isOpen=false] - Flag to indicate if the window is open
 * @param {number} [props.openPercentage=50] - The percentage the window is open
 * @param {boolean} [props.isSelected=false] - Flag to indicate if the window is selected
 * @param {Function} [props.onClick=() => {}] - The function to call when the window is clicked
 * @param {string} props.id - The unique identifier for the window
 * @returns {JSX.Element} The Window component
 */
const Window = ({
                    x,
                    y,
                    width = 60,
                    height = 10,
                    wallThickness = 8,
                    rotation = 0,
                    windowType = 'fixed',
                    isOpen = false,
                    openPercentage = 50,
                    isSelected = false,
                    onClick = () => {
                    },
                    id
                }) => {
    // Window styles
    const frameColor = '#D3D3D3';
    const glassColor = '#A5D6F7';
    const frameStroke = '#7F7F7F';
    const selectionColor = '#4299e1';

    // Center for rotation
    const centerX = x + wallThickness / 2;
    const centerY = y;

    const handleClick = (e) => {
        e.stopPropagation();
        onClick(id);
    };

    // Calculate sliding window position
    const slidingOffset = isOpen ? (width - 10) * (openPercentage / 100) : 0;

    // Calculate casement window angle
    const casementAngle = isOpen ? (openPercentage / 100) * 90 : 0;

    return (
        <g
            transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            onClick={handleClick}
        >
            <defs>
                <pattern id={`glass-pattern-${id}`} patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill={glassColor} fillOpacity="0.4"/>
                    <line x1="0" y1="0" x2="10" y2="10" stroke="white" strokeWidth="0.5" strokeOpacity="0.1"/>
                    <line x1="10" y1="0" x2="0" y2="10" stroke="white" strokeWidth="0.5" strokeOpacity="0.1"/>
                </pattern>

                <filter id={`window-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3"/>
                </filter>

                <filter id={`glass-reflection-${id}`}>
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                    <feSpecularLighting result="specOut" in="blur" specularExponent="20" lightingColor="white">
                        <fePointLight x="50" y="-50" z="100"/>
                    </feSpecularLighting>
                    <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
                </filter>
            </defs>

            {isSelected && (
                <rect
                    x={centerX - wallThickness / 2 - 2}
                    y={centerY - width / 2 - 2}
                    width={wallThickness + 4}
                    height={width + 4}
                    fill="none"
                    stroke={selectionColor}
                    strokeWidth="2"
                    strokeDasharray="4,2"
                    style={{pointerEvents: 'none'}}
                />
            )}

            <rect
                x={centerX - wallThickness / 2}
                y={centerY - width / 2}
                width={wallThickness}
                height={width}
                fill="#f0f0f0"
                stroke="#555"
                strokeWidth="0.75"
            />

            {windowType === 'fixed' && (
                <>
                    <rect
                        x={centerX - wallThickness / 2}
                        y={centerY - width / 2}
                        width={wallThickness}
                        height={width}
                        fill={frameColor}
                        stroke={frameStroke}
                        strokeWidth="1"
                    />

                    <rect
                        x={centerX - wallThickness / 2 + 2}
                        y={centerY - width / 2 + 2}
                        width={wallThickness - 4}
                        height={width / 2 - 3}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        filter={`url(#glass-reflection-${id})`}
                    />
                    <rect
                        x={centerX - wallThickness / 2 + 2}
                        y={centerY + 1}
                        width={wallThickness - 4}
                        height={width / 2 - 3}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        filter={`url(#glass-reflection-${id})`}
                    />
                </>
            )}

            {windowType === 'sliding' && (
                <>
                    <rect
                        x={centerX - wallThickness / 2}
                        y={centerY - width / 2}
                        width={wallThickness}
                        height={width}
                        fill={frameColor}
                        stroke={frameStroke}
                        strokeWidth="1"
                    />

                    <line
                        x1={centerX - wallThickness / 2}
                        y1={centerY}
                        x2={centerX + wallThickness / 2}
                        y2={centerY}
                        stroke={frameStroke}
                        strokeWidth="1"
                    />

                    <rect
                        x={centerX - wallThickness / 2 + 2}
                        y={centerY - width / 2 + 2}
                        width={wallThickness - 4}
                        height={width / 2 - 3}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        filter={`url(#glass-reflection-${id})`}
                    />

                    <rect
                        x={centerX - wallThickness / 2 + 2 + slidingOffset}
                        y={centerY + 1}
                        width={wallThickness - 4}
                        height={width / 2 - 3}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        filter={`url(#glass-reflection-${id})`}
                    />
                </>
            )}

            {windowType === 'casement' && (
                <>
                    <rect
                        x={centerX - wallThickness / 2}
                        y={centerY - width / 2}
                        width={wallThickness}
                        height={width}
                        fill={frameColor}
                        stroke={frameStroke}
                        strokeWidth="1"
                    />

                    <rect
                        x={centerX - wallThickness / 2 + 2}
                        y={centerY - width / 2 + 2}
                        width={wallThickness / 2 - 3}
                        height={width - 4}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        filter={`url(#glass-reflection-${id})`}
                    />

                    <rect
                        x={centerX + 1}
                        y={centerY - width / 2 + 2}
                        width={wallThickness / 2 - 3}
                        height={width - 4}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        transform={isOpen ? `rotate(${casementAngle}, ${centerX}, ${centerY - width / 2 + 2})` : ''}
                        filter={`url(#glass-reflection-${id})`}
                    />
                </>
            )}

            {windowType === 'bay' && (
                <>
                    <rect
                        x={centerX - wallThickness / 2}
                        y={centerY - width / 2}
                        width={wallThickness}
                        height={width}
                        fill={frameColor}
                        stroke={frameStroke}
                        strokeWidth="1"
                    />

                    <polygon
                        points={`
              ${centerX - wallThickness / 2}, ${centerY - width / 2}
              ${centerX - wallThickness / 2 - 15}, ${centerY - width / 4}
              ${centerX - wallThickness / 2 - 15}, ${centerY + width / 4}
              ${centerX - wallThickness / 2}, ${centerY + width / 2}
            `}
                        fill={frameColor}
                        stroke={frameStroke}
                        strokeWidth="1"
                    />

                    <polygon
                        points={`
              ${centerX + wallThickness / 2}, ${centerY - width / 2}
              ${centerX + wallThickness / 2 + 15}, ${centerY - width / 4}
              ${centerX + wallThickness / 2 + 15}, ${centerY + width / 4}
              ${centerX + wallThickness / 2}, ${centerY + width / 2}
            `}
                        fill={frameColor}
                        stroke={frameStroke}
                        strokeWidth="1"
                    />

                    <rect
                        x={centerX - wallThickness / 2 + 2}
                        y={centerY - width / 2 + 2}
                        width={wallThickness - 4}
                        height={width - 4}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        filter={`url(#glass-reflection-${id})`}
                    />

                    <polygon
                        points={`
              ${centerX - wallThickness / 2 + 2}, ${centerY - width / 2 + 2}
              ${centerX - wallThickness / 2 - 12}, ${centerY - width / 4 + 1}
              ${centerX - wallThickness / 2 - 12}, ${centerY + width / 4 - 1}
              ${centerX - wallThickness / 2 + 2}, ${centerY + width / 2 - 2}
            `}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        filter={`url(#glass-reflection-${id})`}
                    />

                    <polygon
                        points={`
              ${centerX + wallThickness / 2 - 2}, ${centerY - width / 2 + 2}
              ${centerX + wallThickness / 2 + 12}, ${centerY - width / 4 + 1}
              ${centerX + wallThickness / 2 + 12}, ${centerY + width / 4 - 1}
              ${centerX + wallThickness / 2 - 2}, ${centerY + width / 2 - 2}
            `}
                        fill={`url(#glass-pattern-${id})`}
                        stroke={frameStroke}
                        strokeWidth="0.5"
                        filter={`url(#glass-reflection-${id})`}
                    />
                </>
            )}

            <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fill="#333"
                style={{pointerEvents: 'none'}}
            >
                {id}
            </text>
        </g>
    );
};

Window.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    wallThickness: PropTypes.number,
    rotation: PropTypes.number,
    windowType: PropTypes.oneOf(['fixed', 'sliding', 'casement', 'bay']),
    isOpen: PropTypes.bool,
    openPercentage: PropTypes.number,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired
};

export default Window;