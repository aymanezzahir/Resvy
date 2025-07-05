package com.server.server.dtos.rooms;


import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class RoomCreateDTO {

    @NotBlank(message = "Room number is required")
    @Size(max = 10, message = "Room number must be 10 characters or fewer")
    private String roomNumber;

    @NotNull(message = "Room type ID is required")
    private Long typeId; // We still use ID for associations created at this stage.

    @NotNull(message = "Floor is required")
    @Min(value = 0, message = "Floor cannot be negative")
    private Integer floor;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be non-negative")
    private BigDecimal price;

    private String description;

    // Optional, defaults to AVAILABLE in entity
    private String status;

    // Images can be uploaded via subsequent requests, but optionally accept image data here
    private List<RoomImageDTO> images;
}