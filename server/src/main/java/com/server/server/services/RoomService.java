package com.server.server.services;

import com.server.server.dtos.rooms.*;
import com.server.server.entities.Room;
import com.server.server.entities.RoomImage;
import com.server.server.entities.RoomType;
import com.server.server.repositories.RoomImageRepository;
import com.server.server.repositories.RoomRepository;
import com.server.server.repositories.RoomTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final RoomImageRepository roomImageRepository;

    // Create a new room

    public RoomDTO createRoom(RoomCreateDTO roomCreateDTO) {
        Room room = new Room();
        room.setRoomNumber(roomCreateDTO.getRoomNumber());
        room.setFloor(roomCreateDTO.getFloor());
        room.setPrice(roomCreateDTO.getPrice());
        room.setDescription(roomCreateDTO.getDescription());
        room.setStatus(roomCreateDTO.getStatus() != null ? roomCreateDTO.getStatus() : "AVAILABLE");

        RoomType type = roomTypeRepository.findById(roomCreateDTO.getTypeId())
                .orElseThrow(() -> new EntityNotFoundException("Room type not found with ID: " + roomCreateDTO.getTypeId()));
        room.setType(type);

        final Room savedRoom = roomRepository.save(room);
        if (roomCreateDTO.getImages() != null) {
            List<RoomImage> roomImages = roomCreateDTO.getImages()
                    .stream()
                    .map(imageDTO -> mapToRoomImageEntity(imageDTO, savedRoom))
                    .collect(Collectors.toList());

            roomImageRepository.saveAll(roomImages);
            savedRoom.setRoomImages(roomImages.stream().collect(Collectors.toSet()));
        }

        return mapToDTO(room);
    }


    public RoomDTO updateRoom(Long roomId, RoomUpdateDTO roomUpdateDTO) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + roomId));

        if (roomUpdateDTO.getRoomNumber() != null) {
            room.setRoomNumber(roomUpdateDTO.getRoomNumber());
        }
        if (roomUpdateDTO.getFloor() != null) {
            room.setFloor(roomUpdateDTO.getFloor());
        }
        if (roomUpdateDTO.getPrice() != null) {
            room.setPrice(roomUpdateDTO.getPrice());
        }
        if (roomUpdateDTO.getDescription() != null) {
            room.setDescription(roomUpdateDTO.getDescription());
        }
        if (roomUpdateDTO.getStatus() != null) {
            room.setStatus(roomUpdateDTO.getStatus());
        }

        if (roomUpdateDTO.getTypeId() != null) {
            RoomType newType = roomTypeRepository.findById(roomUpdateDTO.getTypeId())
                    .orElseThrow(() -> new EntityNotFoundException("Room type not found with ID: " + roomUpdateDTO.getTypeId()));
            room.setType(newType);
        }

        if (roomUpdateDTO.getImages() != null) {
            // Delete existing room images and replace with updated ones
            roomImageRepository.deleteAllByRoomId(room.getId());
            final Room updatedRoom = room; // Create a final reference to the room object
            List<RoomImage> roomImages = roomUpdateDTO.getImages().stream()
                    .map(imageDTO -> mapToRoomImageEntity(imageDTO, updatedRoom)) // Use final variable in lambda
                    .collect(Collectors.toList());

            roomImageRepository.saveAll(roomImages);
            updatedRoom.setRoomImages(roomImages.stream().collect(Collectors.toSet()));

        }

        room = roomRepository.save(room);
        return mapToDTO(room);
    }

    // Get room by ID (include type and images)
    public RoomDTO getRoomById(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + roomId));
        return mapToDTO(room);
    }

    // Get all rooms
    public List<RoomDTO> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Delete a room
    @Transactional
    public void deleteRoom(Long roomId) {
        if (!roomRepository.existsById(roomId)) {
            throw new EntityNotFoundException("Room not found with ID: " + roomId);
        }
        // Delete associated images before deleting the room
        roomImageRepository.deleteAllByRoomId(roomId);
        roomRepository.deleteById(roomId);
    }

    // Get rooms by price range
    public List<RoomDTO> getRoomsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        List<Room> rooms = roomRepository.findByPriceBetween(minPrice, maxPrice);
        return rooms.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Get rooms by status
    public List<RoomDTO> getRoomsByStatus(String status) {
        List<Room> rooms = roomRepository.findByStatus(status);
        return rooms.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Map Room entity to RoomDTO
    private RoomDTO mapToDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setId(room.getId());
        dto.setRoomNumber(room.getRoomNumber());
        dto.setStatus(room.getStatus());
        dto.setFloor(room.getFloor());
        dto.setPrice(room.getPrice());
        dto.setDescription(room.getDescription());

        // Map RoomType to RoomTypeDTO
        if (room.getType() != null) {
            RoomTypeDTO typeDTO = new RoomTypeDTO();
            typeDTO.setId(room.getType().getId());
            typeDTO.setName(room.getType().getName());
            typeDTO.setMaxOccupancy(room.getType().getMaxOccupancy());
            typeDTO.setDescription(room.getType().getDescription());
            dto.setType(typeDTO);
        }

        // Map RoomImages to RoomImageDTOs
        if (room.getRoomImages() != null) {
            List<RoomImageDTO> imageDTOs = room.getRoomImages().stream()
                    .map(image -> {
                        RoomImageDTO imageDTO = new RoomImageDTO();
                        imageDTO.setId(image.getId());
                        imageDTO.setUrl(image.getUrl());
                        imageDTO.setIsPrimary(image.getIsPrimary());
                        return imageDTO;
                    }).collect(Collectors.toList());
            dto.setImages(imageDTOs);
        }

        return dto;
    }

    // Map RoomImageDTO to RoomImage entity
    private RoomImage mapToRoomImageEntity(RoomImageDTO dto, Room room) {
        RoomImage image = new RoomImage();
        image.setRoom(room);
        image.setUrl(dto.getUrl());
        image.setIsPrimary(dto.getIsPrimary() != null && dto.getIsPrimary());
        return image;
    }

    // RoomService.java

    // Method to get all room types
    public List<RoomTypeDTO> getAllRoomTypes() {
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        return roomTypes.stream()
                .map(roomType -> {
                    RoomTypeDTO typeDTO = new RoomTypeDTO();
                    typeDTO.setId(roomType.getId());
                    typeDTO.setName(roomType.getName());
                    typeDTO.setMaxOccupancy(roomType.getMaxOccupancy());
                    typeDTO.setDescription(roomType.getDescription());
                    return typeDTO;
                })
                .collect(Collectors.toList());
    }
}