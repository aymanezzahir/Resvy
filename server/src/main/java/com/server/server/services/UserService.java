package com.server.server.services;

import com.server.server.dtos.users.*;
import com.server.server.entities.User;
import com.server.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    /**
     * Register a new user.
     */
    @Transactional
    public UserDTO registerUser(UserRegistrationDTO registrationDTO) {
        if (userRepository.existsByUsername(registrationDTO.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");

        }
        if (userRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }
        User user = userMapper.toEntity(registrationDTO);
        user.setRole(registrationDTO.getRole() != null ? registrationDTO.getRole() : "ROLE_CUSTOMER");


        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);
        return userMapper.toUserDTO(savedUser);
    }

    /**
     * Find user by ID.
     */
    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + id));
        return userMapper.toUserDTO(user);
    }

    /**
     * Find all users.
     */
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update user details.
     */
    @Transactional
    public UserDTO updateUser(Long id, UserUpdateDTO updateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + id));

        // Check username uniqueness excluding the current user
        if (updateDTO.getUsername() != null) {
            boolean usernameTaken = userRepository.existsByUsername(updateDTO.getUsername())
                    && !updateDTO.getUsername().equals(user.getUsername());
            if (usernameTaken) {
                throw new IllegalStateException("Username already taken");
            }
        }

        // Check email uniqueness excluding the current user
        if (updateDTO.getEmail() != null) {
            boolean emailTaken = userRepository.existsByEmail(updateDTO.getEmail())
                    && !updateDTO.getEmail().equals(user.getEmail());
            if (emailTaken) {
                throw new IllegalStateException("Email already taken");
            }
        }

        // Now update fields
        userMapper.updateUserFromDTO(updateDTO, user);

        if (updateDTO.getPassword() != null && !updateDTO.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
        }
        User updatedUser = userRepository.save(user);
        return userMapper.toUserDTO(updatedUser);
    }

    /**
     * Delete a user.
     */
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + id));
        userRepository.delete(user);
    }

    /**
     * Check if a username exists.
     */
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * Check if an email exists.
     */
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
