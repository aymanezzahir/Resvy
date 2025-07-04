package com.server.server;

import com.server.server.dtos.bookings.BookingCreateDTO;
import com.server.server.dtos.bookings.BookingDTO;
import com.server.server.services.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // Create a new booking
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @PostMapping("/user/{userId}")
    public ResponseEntity<BookingDTO> createBooking(
            @PathVariable Long userId,
            @Valid @RequestBody BookingCreateDTO bookingCreateDTO) {
        BookingDTO createdBooking = bookingService.createBooking(userId, bookingCreateDTO);
        return ResponseEntity.ok(createdBooking);
    }

    // Get a booking by its ID
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long bookingId) {
        BookingDTO booking = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(booking);
    }

    // Get all bookings by user ID
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByUserId(@PathVariable Long userId) {
        List<BookingDTO> bookings = bookingService.getBookingsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    // Update an existing booking by booking ID
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @PutMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> updateBooking(
            @PathVariable Long bookingId,
            @Valid @RequestBody BookingCreateDTO updatedBookingInfo) {
        BookingDTO updatedBooking = bookingService.updateBooking(bookingId, updatedBookingInfo);
        return ResponseEntity.ok(updatedBooking);
    }

    // Delete a booking by its ID
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.noContent().build();
    }

    // Check room availability for a specific date range
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @GetMapping("/room/{roomId}/availability")
    public ResponseEntity<Boolean> isRoomAvailable(
            @PathVariable Long roomId,
            @RequestParam("startDate") LocalDate startDate,
            @RequestParam("endDate") LocalDate endDate) {
        boolean available = bookingService.isRoomAvailable(roomId, startDate, endDate);
        return ResponseEntity.ok(available);
    }

    // Get all bookings
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        List<BookingDTO> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
}