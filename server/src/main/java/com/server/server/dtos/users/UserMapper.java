package com.server.server.dtos.users;

import com.server.server.entities.User;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface UserMapper {

    // From entity to read-only DTO
    UserDTO toUserDTO(User user);

    // From registration form to entity (e.g., when creating)
    User toEntity(UserRegistrationDTO dto);

    // Update entity fields from update DTO
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDTO(UserUpdateDTO dto, @MappingTarget User user);
}
