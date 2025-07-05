package com.server.server;

import com.server.server.dtos.rooms.*;
import com.server.server.services.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(@Valid @RequestBody RoomCreateDTO roomCreateDTO) {
        // Leverage the updated RoomService that ensures proper handling of images and availability of 'RoomType'
        RoomDTO roomDTO = roomService.createRoom(roomCreateDTO);
        return ResponseEntity.ok(roomDTO);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<RoomDTO> updateRoom(@PathVariable Long id,
                                              @Valid @RequestBody RoomUpdateDTO roomUpdateDTO) {
        // Utilize improved RoomService logic to prevent issues with non-final variables in lambdas
        RoomDTO updatedRoom = roomService.updateRoom(id, roomUpdateDTO);
        return ResponseEntity.ok(updatedRoom);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long id) {
        // Fetch and return the room, including type and images as per mappings in RoomService
        RoomDTO roomDTO = roomService.getRoomById(id);
        return ResponseEntity.ok(roomDTO);
    }

    // Get all rooms

    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        // Fetch all rooms with proper mapping to DTOs
        List<RoomDTO> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        // Handle cascade image deletion via updated entity mapping
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter/price-range")
    public ResponseEntity<List<RoomDTO>> getRoomsByPriceRange(@RequestParam BigDecimal minPrice,
                                                              @RequestParam BigDecimal maxPrice) {
        List<RoomDTO> rooms = roomService.getRoomsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(rooms);
    }

    // Get rooms by status
    @GetMapping("/filter/status")
    public ResponseEntity<List<RoomDTO>> getRoomsByStatus(@RequestParam String status) {
        // Fetch rooms by status (AVAILABLE, BOOKED, etc.)
        List<RoomDTO> rooms = roomService.getRoomsByStatus(status);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/types")
    public ResponseEntity<List<RoomTypeDTO>> getRoomsTypes(){
        List<RoomTypeDTO> types = roomService.getAllRoomTypes();
        return ResponseEntity.ok(types);
    }
}