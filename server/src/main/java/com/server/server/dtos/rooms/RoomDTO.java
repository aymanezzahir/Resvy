package com.server.server.dtos.rooms;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;


@Data
public class RoomDTO {
    private Long id;
    private String roomNumber;
    private String status;
    private Integer floor;
    private BigDecimal price;
    private String description;
    private RoomTypeDTO type;
    private List<RoomImageDTO> images;
}

