package com.server.server.dtos.payments;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class PaymentSummaryDTO {
    private Long id;
    private Long bookingId;
    private BigDecimal amount;
    private String method;
    private String status;
    private Instant paymentDate;
}
