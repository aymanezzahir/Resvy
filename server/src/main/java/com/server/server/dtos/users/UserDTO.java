package com.server.server.dtos.users;

import lombok.Data;

import java.time.Instant;


@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private Instant createdAt;
}