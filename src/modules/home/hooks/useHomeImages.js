import { useMemo } from 'react';
import food1 from "../../../assets/food1.jpg";
import food2 from "../../../assets/food2.jpg";
import food3 from "../../../assets/food3.jpg";
import food4 from "../../../assets/food4.jpg";
import food5 from "../../../assets/food5.jpg";

/**
 * Custom hook for managing food images in the home hero section
 *
 * @returns {Object} - Object containing food image URLs
 */
const useHomeImages = () => {
    const foodImages = useMemo(() => [food1, food2, food3, food4, food5], []);

    return { foodImages };
};

export default useHomeImages;