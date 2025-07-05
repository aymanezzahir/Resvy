package com.server.server.dtos.rooms;

import lombok.Data;

@Data
public class RoomImageDTO {
    private Long id;          // Unique ID of the image
    private String url;       // Image URL
    private Boolean isPrimary; // Indicates whether it's the primary image for the room
}