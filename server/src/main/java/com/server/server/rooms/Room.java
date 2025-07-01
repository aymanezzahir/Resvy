package com.server.server.rooms;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "room_number", nullable = false, length = 10)
    private String roomNumber;

    @Column(name = "type_id", nullable = false)
    private Integer typeId;

    @ColumnDefault("'AVAILABLE'")
    @Lob
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "floor", nullable = false)
    private Integer floor;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Lob
    @Column(name = "description")
    private String description;

}