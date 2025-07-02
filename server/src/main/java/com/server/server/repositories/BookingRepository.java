package com.server.server.repositories;

import com.server.server.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser_Id(Long userId);
    List<Booking> findByRoom_IdAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqual(
            Long roomId, LocalDate startDate, LocalDate endDate);
}