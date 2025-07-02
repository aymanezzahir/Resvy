package com.server.server.dtos.rooms;

import com.server.server.dtos.rooms.*;
import com.server.server.entities.RoomImage;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface RoomImageMapper {

    // Normal image DTO
    RoomImageDTO toDTO(RoomImage roomImage);

    // RoomImageUploadDTO and RoomImageDeleteDTO likely do not map directly to entity,
    // but you can create methods if needed for convenience.

    // Update existing RoomImage from update DTO
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(RoomImageUpdateDTO dto, @MappingTarget RoomImage roomImage);
}
