package com.server.server.dtos.rooms;

import com.server.server.dtos.rooms.*;
import com.server.server.entities.RoomType;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface RoomTypeMapper {

    // Normal DTO
    RoomTypeDTO toDTO(RoomType roomType);

    // Create DTO -> Entity
    RoomType toEntity(RoomTypeCreateDTO dto);
}
