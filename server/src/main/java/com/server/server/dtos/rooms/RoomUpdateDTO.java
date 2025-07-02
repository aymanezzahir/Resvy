package com.server.server.dtos.rooms;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class RoomUpdateDTO {

    @Size(max = 10, message = "Room number must be 10 characters or fewer")
    private String roomNumber;

    private Long typeId;

    @Min(value = 0, message = "Floor cannot be negative")
    private Integer floor;

    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be non-negative")
    private BigDecimal price;

    private String description;

    private String status; // Should be validated against enum values in service layer
}

