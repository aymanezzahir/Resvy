package com.server.server.dtos.bookings;

import java.time.Instant;
import java.time.LocalDate;

public class BookingDTO {
    private Long id;
    private Long userId;
    private String username; // Optional: for display

    private Long roomId;
    private String roomNumber; // Optional: for display

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private String status;
    private Instant createdAt;
}
