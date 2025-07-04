package com.server.server.dtos.rooms;


import lombok.Data;

@Data
public class RoomTypeDTO {
    private Long id;
    private String name;
    private Integer maxOccupancy;
    private String description;
}
