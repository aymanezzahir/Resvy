package com.server.server.services;

import com.server.server.dtos.payments.PaymentCreateDTO;
import com.server.server.dtos.payments.PaymentDTO;
import com.server.server.dtos.payments.PaymentSummaryDTO;
import com.server.server.dtos.payments.PaymentUpdateStatusDTO;
import com.server.server.entities.Booking;
import com.server.server.entities.Payment;
import com.server.server.repositories.BookingRepository;
import com.server.server.repositories.PaymentRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingService bookingService; // Inject BookingService for price calculation
    private final BookingRepository bookingRepository;

    // Create a new payment
    public PaymentDTO createPayment(PaymentCreateDTO paymentCreateDTO) {
        // Fetch the associated booking
        Booking booking = bookingRepository.findById(paymentCreateDTO.getBookingId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Booking not found with ID: " + paymentCreateDTO.getBookingId()));

        // Check if a payment already exists for the booking
        if (paymentRepository.findByBookingId(paymentCreateDTO.getBookingId()) != null) {
            throw new ValidationException("Payment already exists for the booking with ID: " + paymentCreateDTO.getBookingId());
        }

        // Calculate payment amount using the BookingService
        BigDecimal amount = bookingService.calculateBookingPrice(paymentCreateDTO.getBookingId());

        // Create a new payment
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(amount); // Automatically calculated
        payment.setMethod(paymentCreateDTO.getMethod());
        payment.setStatus(paymentCreateDTO.getStatus() != null ? paymentCreateDTO.getStatus() : "PAID");
        payment.setPaymentDate(Instant.now());

        Payment savedPayment = paymentRepository.save(payment);
        return mapToDTO(savedPayment);
    }

    // Get a payment by its ID
    public PaymentDTO getPaymentById(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with ID: " + paymentId));
        return mapToDTO(payment);
    }

    // Get all payments
    public List<PaymentDTO> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Get a payment by booking ID
    public PaymentDTO getPaymentByBookingId(Long bookingId) {
        Payment payment = paymentRepository.findByBookingId(bookingId);
        if (payment == null) {
            throw new EntityNotFoundException("Payment not found for booking with ID: " + bookingId);
        }
        return mapToDTO(payment);
    }

    // Update the status of a payment
    public PaymentDTO updatePaymentStatus(Long paymentId, PaymentUpdateStatusDTO paymentUpdateStatusDTO) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with ID: " + paymentId));

        payment.setStatus(paymentUpdateStatusDTO.getStatus());
        Payment updatedPayment = paymentRepository.save(payment);
        return mapToDTO(updatedPayment);
    }

    // Delete a payment by its ID
    public void deletePayment(Long paymentId) {
        if (!paymentRepository.existsById(paymentId)) {
            throw new EntityNotFoundException("Payment not found with ID: " + paymentId);
        }
        paymentRepository.deleteById(paymentId);
    }

    // Get a summary of all payments for reporting purposes
    public List<PaymentSummaryDTO> getPaymentSummaries() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream().map(this::mapToSummaryDTO).collect(Collectors.toList());
    }

    // Calculate total payments made so far
    public BigDecimal getTotalPayments() {
        return paymentRepository.findAll().stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Map Payment entity to PaymentDTO
    private PaymentDTO mapToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setId(payment.getId());
        dto.setBookingId(payment.getBooking().getId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setMethod(payment.getMethod());
        dto.setStatus(payment.getStatus());
        return dto;
    }

    // Map Payment entity to PaymentSummaryDTO
    private PaymentSummaryDTO mapToSummaryDTO(Payment payment) {
        PaymentSummaryDTO summaryDTO = new PaymentSummaryDTO();
        summaryDTO.setId(payment.getId());
        summaryDTO.setBookingId(payment.getBooking().getId());
        summaryDTO.setAmount(payment.getAmount());
        summaryDTO.setPaymentDate(payment.getPaymentDate());
        summaryDTO.setMethod(payment.getMethod());
        summaryDTO.setStatus(payment.getStatus());
        return summaryDTO;
    }
}