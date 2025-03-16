import { useState, useEffect } from 'react';
import reservationService from "../../../services/reservation.service";

/**
 * Custom hook for fetching and managing user reservations
 */
export const useReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [upcomingReservation, setUpcomingReservation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReservations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const userReservationsResponse = await reservationService.getByUser();
            const refactoredReservations = userReservationsResponse.map(reservation => {
                const start = new Date(reservation.startTime);
                const end = new Date(reservation.endTime);
                return {
                    ...reservation,
                    date: start.toLocaleDateString(),
                    startTime: start.toLocaleTimeString(),
                    endTime: end.toLocaleTimeString(),
                };
            });
            setReservations(refactoredReservations);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch reservations');
            setIsLoading(false);
        }
    };

    const fetchUpcomingReservation = async () => {
        setIsLoading(true);
        try {
            const upcomingReservationsResponse = await reservationService.getUserUpcomingReservations();
            const start = new Date(upcomingReservationsResponse.startTime);
            const end = new Date(upcomingReservationsResponse.endTime);
            const upcomingReservations = upcomingReservationsResponse;
            upcomingReservations.date = start.toLocaleDateString();
            upcomingReservations.startTime = start.toLocaleTimeString();
            upcomingReservations.endTime = end.toLocaleTimeString();
            setUpcomingReservation(upcomingReservations);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setUpcomingReservation(null);
            setIsLoading(false);
        }
    };

    const handleCancel = async (id) => {
        try {
            await reservationService.cancel(id);
            await fetchUpcomingReservation();
            await fetchReservations();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const updateReservation = async (updatedReservation) => {
        const formatDateForInput = (dateString) => {
            const dateParts = dateString.split('/');
            if (dateParts.length === 3) {
                return `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
            }
            return dateString;
        };

        const convertTo24Hour = (timeString) => {
            if (!timeString) return "";
            const timePart = timeString.replace(/:\d{2}\s/, " ");
            const [time, modifier] = timePart.split(' ');
            let [hours, minutes] = time.split(':');

            if (hours === '12') {
                hours = '00';
            }

            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        };

        try {
            const start = `${formatDateForInput(updatedReservation.date)}T${convertTo24Hour(updatedReservation.startTime)}:00Z`;
            const end = `${formatDateForInput(updatedReservation.date)}T${convertTo24Hour(updatedReservation.endTime)}:00Z`;

            await reservationService.reschedule(
                updatedReservation.id,
                start,
                end,
                updatedReservation.tableId
            );

            await fetchUpcomingReservation();
            await fetchReservations();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return {
        reservations,
        upcomingReservation,
        isLoading,
        error,
        fetchReservations,
        fetchUpcomingReservation,
        handleCancel,
        updateReservation
    };
};