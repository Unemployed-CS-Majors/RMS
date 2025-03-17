import React from 'react';
import LoadingIndicator from '../../sections/Loading/LoadingIndicator';
import styles from './DataFetchingState.module.css';

/**
 * DataFetchingState component handles the display of different states during data fetching.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isLoading - Flag indicating if data is being loaded.
 * @param {boolean} props.isError - Flag indicating if there was an error during data fetching.
 * @param {boolean} props.isEmpty - Flag indicating if there is no data available.
 * @param {string} [props.loadingText='Loading data...'] - Text to display while loading.
 * @param {string} [props.errorText='Something went wrong. Please try again.'] - Text to display if there is an error.
 * @param {string} [props.emptyText='No data available.'] - Text to display if there is no data.
 * @param {Function} [props.onRetry=null] - Function to call when retrying data fetch.
 * @param {React.ReactNode} props.children - The children components to render when data is successfully fetched.
 * @returns {JSX.Element} The rendered DataFetchingState component.
 */
const DataFetchingState = ({
                               isLoading,
                               isError,
                               isEmpty,
                               loadingText = 'Loading data...',
                               errorText = 'Something went wrong. Please try again.',
                               emptyText = 'No data available.',
                               onRetry = null,
                               children
                           }) => {
    if (isLoading) {
        return <LoadingIndicator text={loadingText}/>;
    }

    if (isError) {
        return (
            <div className={`${styles.dataStateContainer} ${styles.error}`}>
                <div className={styles.dataStateIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div className={styles.dataStateText}>{errorText}</div>
                {onRetry && (
                    <button
                        className={styles.dataStateRetryButton}
                        onClick={onRetry}
                    >
                        Try Again
                    </button>
                )}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className={`${styles.dataStateContainer} ${styles.empty}`}>
                <div className={styles.dataStateIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                    </svg>
                </div>
                <div className={styles.dataStateText}>{emptyText}</div>
            </div>
        );
    }

    return children;
};

export default DataFetchingState;