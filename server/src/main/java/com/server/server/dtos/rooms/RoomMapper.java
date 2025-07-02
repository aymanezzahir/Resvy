package com.server.server.dtos.rooms;

import com.server.server.dtos.rooms.*;
import com.server.server.entities.Room;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {RoomTypeMapper.class, RoomImageMapper.class})
public interface RoomMapper {

    // Normal full DTO
    RoomDTO toDTO(Room room);

    // Minimal DTO (maybe for listing)
    RoomMinimalDTO toMinimalDTO(Room room);

    // Create DTO -> Entity
    Room toEntity(RoomCreateDTO dto);

    // Update entity with update DTO (partial update)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(RoomUpdateDTO dto, @MappingTarget Room room);
}
