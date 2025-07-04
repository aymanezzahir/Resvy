package com.server.server.repositories;

import com.server.server.entities.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImage, Long> {
    List<RoomImage> findByRoomId(Long roomId);
    RoomImage findByRoomIdAndIsPrimaryTrue(Long roomId);
    void deleteAllByRoomId(Long roomId);
}