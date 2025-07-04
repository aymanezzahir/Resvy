package com.server.server.dtos.payments;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentCreateDTO {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Amount must be non-negative")
    private BigDecimal amount;

    @NotBlank(message = "Payment method is required")
    @Size(max = 30, message = "Payment method must be at most 30 characters")
    private String method;

    // Optional – can default to "PAID" in service layer
    private String status;
}
