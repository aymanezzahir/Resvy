package com.server.server.dtos.reviews;

import java.time.Instant;

public class ReviewDTO {
    private Long id;
    private Long userId;
    private String username;      // Optional, useful for display
    private Long roomId;
    private String roomNumber;    // Optional, for review listings
    private Integer rating;
    private String comment;
    private Instant createdAt;
}
