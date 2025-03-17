import React, {useEffect, useState} from 'react';
import OrderList from './components/OrderList/OrderList';
import OrderDetails from './components/OrderDetails/OrderDetails';
import OrderFilters from './components/OrderFilters/OrderFilters';
import LoadingIndicator from '../Loading/LoadingIndicator';
import orderService from '../../../../services/order.service';
import menuItemService from '../../../../services/menuItem.service';

/**
 * OrderManagement component
 *
 * Manages the display and filtering of orders, and shows detailed information for a selected order.
 *
 * @param {Object} props - Component props
 * @param {Array} props.orders - List of orders
 * @param {boolean} props.loading - Flag indicating if the orders are loading
 * @param {boolean} props.showFilters - Flag indicating if the filter panel is visible
 * @param {Function} props.toggleShowFilters - Function to toggle the visibility of the filter panel
 * @returns {JSX.Element} The OrderManagement component
 */
const OrderManagement = ({orders, loading, showFilters, toggleShowFilters}) => {
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateRange, setDateRange] = useState({start: null, end: null});
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [tempStatusFilter, setTempStatusFilter] = useState('all');
    const [tempDateRange, setTempDateRange] = useState({start: null, end: null});

    // Status options for filtering
    const statusOptions = [
        {value: 'all', label: 'All Orders'},
        {value: 'pending_payment', label: 'Pending Payment'},
        {value: 'paid', label: 'Paid'},
        {value: 'in_progress', label: 'In Progress'},
        {value: 'ready_for_pickup', label: 'Ready for Pickup'},
        {value: 'out_for_delivery', label: 'Out for Delivery'},
        {value: 'completed', label: 'Completed'},
        {value: 'canceled', label: 'Canceled'}
    ];

    // Initialize temporary filters with current values
    useEffect(() => {
        setTempStatusFilter(statusFilter);
        setTempDateRange(dateRange);
    }, [statusFilter, dateRange]);

    // Apply filters to orders
    useEffect(() => {
        if (!orders) return;

        let result = [...orders];

        // Filter by status
        if (statusFilter !== 'all') {
            result = result.filter(order => order.status === statusFilter);
        }

        // Filter by date range
        if (dateRange.start && dateRange.end) {
            const startDate = new Date(dateRange.start).getTime();
            const endDate = new Date(dateRange.end).getTime();

            result = result.filter(order => {
                const orderDate = new Date(order.createdAt).getTime();
                return orderDate >= startDate && orderDate <= endDate;
            });
        }

        setFilteredOrders(result);
    }, [orders, statusFilter, dateRange]);

    /**
     * Handle order selection
     *
     * Fetches detailed information for the selected order and its items.
     *
     * @param {Object} order - The selected order
     */
    const handleOrderSelect = async (order) => {
        setSelectedOrder(order);
        setLoadingDetails(true);

        try {
            // Get detailed order info
            const orderDetails = await orderService.getById(order.id);

            // Fetch full menu item details for each item in the order
            const itemsWithDetails = await Promise.all(
                orderDetails.items.map(async (item) => {
                    try {
                        const menuItemDetails = await menuItemService.getById(item.id);
                        return {...item, details: menuItemDetails};
                    } catch (error) {
                        console.error(`Failed to fetch details for item ${item.id}:`, error);
                        return item;
                    }
                })
            );

            setSelectedOrderItems(itemsWithDetails);
            setShowOrderDetails(true);
        } catch (error) {
            console.error('Failed to fetch order details:', error);
        } finally {
            setLoadingDetails(false);
        }
    };

    /**
     * Handle closing of order details
     */
    const handleCloseDetails = () => {
        setShowOrderDetails(false);
        setSelectedOrder(null);
        setSelectedOrderItems([]);
    };

    /**
     * Handle temporary status filter change
     *
     * @param {string} newStatus - The new status filter
     */
    const handleTempStatusChange = (newStatus) => {
        setTempStatusFilter(newStatus);
    };

    /**
     * Handle temporary date range filter change
     *
     * @param {Object} newRange - The new date range filter
     */
    const handleTempDateRangeChange = (newRange) => {
        setTempDateRange(newRange);
    };

    /**
     * Apply the temporary filters
     */
    const handleApplyFilters = () => {
        setStatusFilter(tempStatusFilter);
        setDateRange(tempDateRange);
        toggleShowFilters();
    };

    /**
     * Reset the temporary filters
     */
    const handleResetFilters = () => {
        setTempStatusFilter('all');
        setTempDateRange({start: null, end: null});
    };

    /**
     * Handle status update for an order
     *
     * @param {string} orderId - The ID of the order to update
     * @param {string} newStatus - The new status to set
     * @returns {Promise<boolean>} True if the update was successful, false otherwise
     */
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await orderService.updateStatus(orderId, newStatus);

            // Update the local state to reflect the status change
            setFilteredOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? {...order, status: newStatus} : order
                )
            );

            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder({...selectedOrder, status: newStatus});
            }

            return true;
        } catch (error) {
            console.error('Failed to update order status:', error);
            return false;
        }
    };

    if (loading) {
        return <LoadingIndicator text="Loading orders..."/>;
    }

    return (
        <>
            <OrderList
                orders={filteredOrders}
                onSelectOrder={handleOrderSelect}
                onStatusUpdate={handleStatusUpdate}
            />

            <OrderFilters
                statusOptions={statusOptions}
                currentStatus={tempStatusFilter}
                dateRange={tempDateRange}
                onStatusChange={handleTempStatusChange}
                onDateRangeChange={handleTempDateRangeChange}
                isVisible={showFilters}
                onClose={() => toggleShowFilters()}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
            />

            {showOrderDetails && (
                <OrderDetails
                    order={selectedOrder}
                    orderItems={selectedOrderItems}
                    loading={loadingDetails}
                    onClose={handleCloseDetails}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
        </>
    );
};

export default OrderManagement;