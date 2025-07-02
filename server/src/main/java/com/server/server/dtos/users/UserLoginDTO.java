package com.server.server.dtos.users;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class UserLoginDTO {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;
}
