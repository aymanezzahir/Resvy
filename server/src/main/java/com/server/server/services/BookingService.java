package com.server.server.services;

import com.server.server.dtos.bookings.BookingCreateDTO;
import com.server.server.dtos.bookings.BookingDTO;
import com.server.server.entities.Booking;
import com.server.server.entities.Room;
import com.server.server.entities.User;
import com.server.server.repositories.BookingRepository;
import com.server.server.repositories.RoomRepository;
import com.server.server.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    // Create a new booking
    public BookingDTO createBooking(Long userId, BookingCreateDTO bookingCreateDTO) {
        // Fetch the user making the booking
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        // Fetch the room being booked
        Room room = roomRepository.findById(bookingCreateDTO.getRoomId())
                .orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + bookingCreateDTO.getRoomId()));

        // Check for booking conflicts
        boolean isRoomAvailable = bookingRepository
                .findByRoom_IdAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqual(
                        room.getId(),
                        bookingCreateDTO.getCheckInDate(),
                        bookingCreateDTO.getCheckOutDate()
                ).isEmpty();

        if (!isRoomAvailable) {
            throw new ValidationException("The selected room is unavailable for the specified dates.");
        }

        // Create a new booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckInDate(bookingCreateDTO.getCheckInDate());
        booking.setCheckOutDate(bookingCreateDTO.getCheckOutDate());
        booking.setStatus(bookingCreateDTO.getStatus() != null ? bookingCreateDTO.getStatus() : "CONFIRMED");

        Booking savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }

    // Get a booking by its ID
    public BookingDTO getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + bookingId));
        return mapToDTO(booking);
    }

    // Get all bookings by user ID
    public List<BookingDTO> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUser_Id(userId);
        return bookings.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Update an existing booking
    public BookingDTO updateBooking(Long bookingId, BookingCreateDTO updatedBookingInfo) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + bookingId));

        // Update the booking's details
        if (updatedBookingInfo.getRoomId() != null) {
            Room room = roomRepository.findById(updatedBookingInfo.getRoomId())
                    .orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + updatedBookingInfo.getRoomId()));
            booking.setRoom(room);
        }

        if (updatedBookingInfo.getCheckInDate() != null && updatedBookingInfo.getCheckOutDate() != null) {
            booking.setCheckInDate(updatedBookingInfo.getCheckInDate());
            booking.setCheckOutDate(updatedBookingInfo.getCheckOutDate());
        }

        if (updatedBookingInfo.getStatus() != null) {
            booking.setStatus(updatedBookingInfo.getStatus());
        }

        Booking updatedBooking = bookingRepository.save(booking);
        return mapToDTO(updatedBooking);
    }

    // Delete a booking by ID
    public void deleteBooking(Long bookingId) {
        if (!bookingRepository.existsById(bookingId)) {
            throw new EntityNotFoundException("Booking not found with ID: " + bookingId);
        }
        bookingRepository.deleteById(bookingId);
    }

    // Check room availability for a specific date range
    public boolean isRoomAvailable(Long roomId, LocalDate startDate, LocalDate endDate) {
        List<Booking> overlappingBookings = bookingRepository
                .findByRoom_IdAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqual(roomId, startDate, endDate);
        return overlappingBookings.isEmpty();
    }

    // Get all bookings
    public List<BookingDTO> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Map Booking entity to BookingDTO
    private BookingDTO mapToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setRoomId(booking.getRoom().getId());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setStatus(booking.getStatus());
        dto.setCreatedAt(booking.getCreatedAt());

        // Optional: Add user and room details if needed for display
        dto.setUserId(booking.getUser().getId());
        dto.setUsername(booking.getUser().getUsername());
        dto.setRoomNumber(booking.getRoom().getRoomNumber());

        return dto;
    }


    public BigDecimal calculateBookingPrice(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + bookingId));

        Room room = booking.getRoom();
        LocalDate checkIn = booking.getCheckInDate();
        LocalDate checkOut = booking.getCheckOutDate();

        // Calculate number of days
        long days = checkIn.until(checkOut).getDays();

        // Calculate total cost
        return room.getPrice().multiply(BigDecimal.valueOf(days));
    }

}