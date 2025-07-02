package com.server.server.dtos.rooms;

import jakarta.validation.constraints.NotNull;

public class RoomImageUploadDTO {

    @NotNull(message = "Room ID is required")
    private Long roomId;

    // In the controller, you'd get MultipartFile file for actual upload
    // This DTO is just metadata – the file itself will come separately
}
