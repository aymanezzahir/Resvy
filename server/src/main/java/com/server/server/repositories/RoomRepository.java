package com.server.server.repositories;

import com.server.server.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByTypeId(Long typeId);
    List<Room> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    List<Room> findByStatus(String status);
}