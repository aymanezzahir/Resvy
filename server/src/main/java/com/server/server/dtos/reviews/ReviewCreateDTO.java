package com.server.server.dtos.reviews;

import jakarta.validation.constraints.*;

public class ReviewCreateDTO {

    @NotNull(message = "Room ID is required")
    private Long roomId;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @Size(max = 1000, message = "Comment must be under 1000 characters")
    private String comment;
}

