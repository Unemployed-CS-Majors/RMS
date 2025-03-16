import React from 'react';
import styles from './ControlPanel.module.css';
import { DrawingMode } from "../../../../../constants/drawingModes";
import TablePreview from "../TablePreview/TablePreview";

const ControlPanel = ({
                          currentDrawingMode,
                          setCurrentDrawingMode,
                          selectedTableType,
                          setSelectedTableType,
                          tableTypes,
                          onClose
                      }) => {
    // Prevent clicks inside the panel from propagating to the parent
    const handlePanelClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.controls} onClick={handlePanelClick}>
            <div className={styles.controlsHeader}>
                <h3>Floor Plan Tools</h3>
            </div>

            <div className={styles.controlsSection}>
                <h4 className={styles.sectionTitle}>Mode</h4>
                <div className={styles.buttonGroup}>
                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.SELECT)}
                        className={`${styles.toolButton} ${styles.selectButton} 
                            ${currentDrawingMode === DrawingMode.SELECT ? styles.active : ''}`}
                    >
                        <i className={`${styles.toolIcon} ${styles.selectIcon}`}></i>
                        <span>Select</span>
                    </button>

                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.WINDOW)}
                        className={`${styles.toolButton} 
                            ${currentDrawingMode === DrawingMode.WINDOW ? styles.active : ''}`}
                    >
                        <i className={`${styles.toolIcon} ${styles.windowIcon}`}></i>
                        <span>Window</span>
                    </button>

                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.WALL)}
                        className={`${styles.toolButton} 
                            ${currentDrawingMode === DrawingMode.WALL ? styles.active : ''}`}
                    >
                        <i className={`${styles.toolIcon} ${styles.wallIcon}`}></i>
                        <span>Wall</span>
                    </button>

                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.DOOR)}
                        className={`${styles.toolButton} 
                            ${currentDrawingMode === DrawingMode.DOOR ? styles.active : ''}`}
                    >
                        <i className={`${styles.toolIcon} ${styles.doorIcon}`}></i>
                        <span>Door</span>
                    </button>

                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.TABLE)}
                        className={`${styles.toolButton} 
                            ${currentDrawingMode === DrawingMode.TABLE ? styles.active : ''}`}
                    >
                        <i className={`${styles.toolIcon} ${styles.tableIcon}`}></i>
                        <span>Table</span>
                    </button>
                </div>
            </div>

            {currentDrawingMode === DrawingMode.TABLE && (
                <div className={styles.controlsSection}>
                    <h4 className={styles.sectionTitle}>Table Type</h4>
                    <select
                        className={styles.tableSelect}
                        value={Object.keys(tableTypes).find(key => tableTypes[key] === selectedTableType) || 'medium1'}
                        onChange={(e) => setSelectedTableType(tableTypes[e.target.value])}
                    >
                        {Object.keys(tableTypes).map(key => (
                            <option key={key} value={key}>{tableTypes[key].name}</option>
                        ))}
                    </select>

                    <div className={styles.previewContainer}>
                        <TablePreview selectedTableType={selectedTableType} />
                    </div>
                </div>
            )}

            <div className={`${styles.controlsSection} ${styles.controlsFooter}`}>
                <div className={styles.toolHelp}>
                    {currentDrawingMode === DrawingMode.SELECT &&
                        <p>Click on elements to select, drag to move.</p>
                    }
                    {currentDrawingMode === DrawingMode.TABLE &&
                        <p>Click on the floor plan to place a table.</p>
                    }
                    {currentDrawingMode === DrawingMode.WALL &&
                        <p>Click and drag to draw walls.</p>
                    }
                    {currentDrawingMode === DrawingMode.DOOR &&
                        <p>Click to place a door on the floor plan.</p>
                    }
                    {currentDrawingMode === DrawingMode.WINDOW &&
                        <p>Click to place a window on the floor plan.</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;