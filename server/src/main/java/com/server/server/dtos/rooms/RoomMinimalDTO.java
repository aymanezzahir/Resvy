package com.server.server.dtos.rooms;

import lombok.Data;

@Data
public class RoomMinimalDTO {
    private Long id;
    private String roomNumber;
    private String status; // We can add status to give more context
}