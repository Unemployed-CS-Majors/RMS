import {useMemo} from 'react';
import image2 from "../../../assets/image2.jpg";
import image22 from "../../../assets/image22.jpg";

/**
 * Custom hook for managing restaurant ambiance images
 *
 * @returns {Object} - Object containing restaurant image URLs
 */
const useRestaurantImages = () => {
    const restaurantImages = useMemo(() => [image2, image22], []);

    return {restaurantImages};
};

export default useRestaurantImages;