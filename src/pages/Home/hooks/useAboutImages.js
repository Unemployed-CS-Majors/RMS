import { useMemo } from 'react';
import image3 from "../../../assets/image3.jpg";
import image33 from "../../../assets/image33.jpg";
import image333 from "../../../assets/image333.jpg";

/**
 * Custom hook for managing images in the About Us section
 *
 * @returns {Object} - Object containing about section image URLs
 */
const useAboutImages = () => {
    const aboutImages = useMemo(() => [image3, image33, image333], []);

    return { aboutImages };
};

export default useAboutImages;