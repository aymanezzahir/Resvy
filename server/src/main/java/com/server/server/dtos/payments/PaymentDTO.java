package com.server.server.dtos.payments;

import java.math.BigDecimal;
import java.time.Instant;

public class PaymentDTO {
    private Long id;
    private Long bookingId;
    private BigDecimal amount;
    private Instant paymentDate;
    private String method;
    private String status;
}
