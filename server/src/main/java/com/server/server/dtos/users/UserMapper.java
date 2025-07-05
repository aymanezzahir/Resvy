package com.server.server.dtos.users;

import com.server.server.entities.User;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toUserDTO(User user);

    User toEntity(UserRegistrationDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDTO(UserUpdateDTO dto, @MappingTarget User user);
}
