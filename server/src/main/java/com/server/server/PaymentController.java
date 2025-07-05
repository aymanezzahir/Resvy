package com.server.server;

import com.server.server.dtos.payments.PaymentCreateDTO;
import com.server.server.dtos.payments.PaymentDTO;
import com.server.server.dtos.payments.PaymentSummaryDTO;
import com.server.server.dtos.payments.PaymentUpdateStatusDTO;
import com.server.server.services.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // Create a new payment
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @PostMapping
    public ResponseEntity<PaymentDTO> createPayment(@Valid @RequestBody PaymentCreateDTO paymentCreateDTO) {
        PaymentDTO payment = paymentService.createPayment(paymentCreateDTO);
        return ResponseEntity.ok(payment);
    }

    // Get a payment by its ID
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable Long paymentId) {
        PaymentDTO payment = paymentService.getPaymentById(paymentId);
        return ResponseEntity.ok(payment);
    }

    // Get all payments
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        List<PaymentDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    // Get a payment by booking ID
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<PaymentDTO> getPaymentByBookingId(@PathVariable Long bookingId) {
        PaymentDTO payment = paymentService.getPaymentByBookingId(bookingId);
        return ResponseEntity.ok(payment);
    }

    // Update the status of a payment
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{paymentId}/status")
    public ResponseEntity<PaymentDTO> updatePaymentStatus(
            @PathVariable Long paymentId,
            @Valid @RequestBody PaymentUpdateStatusDTO paymentUpdateStatusDTO) {
        PaymentDTO updatedPayment = paymentService.updatePaymentStatus(paymentId, paymentUpdateStatusDTO);
        return ResponseEntity.ok(updatedPayment);
    }

    // Delete a payment by its ID
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN' , 'ROLE_CUSTOMER')")
    @DeleteMapping("/{paymentId}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long paymentId) {
        paymentService.deletePayment(paymentId);
        return ResponseEntity.noContent().build();
    }

    // Get a summary of all payments
    @GetMapping("/summaries")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<PaymentSummaryDTO>> getPaymentSummaries() {
        List<PaymentSummaryDTO> summaries = paymentService.getPaymentSummaries();
        return ResponseEntity.ok(summaries);
    }

    // Get the total payments amount to date
    @GetMapping("/total")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<BigDecimal> getTotalPayments() {
        BigDecimal totalPayments = paymentService.getTotalPayments();
        return ResponseEntity.ok(totalPayments);
    }
}