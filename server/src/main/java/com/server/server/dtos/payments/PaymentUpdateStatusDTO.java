package com.server.server.dtos.payments;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class PaymentUpdateStatusDTO {

    @NotBlank(message = "Status is required")
    private String status;
}
