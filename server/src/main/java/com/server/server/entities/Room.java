package com.server.server.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "rooms", uniqueConstraints = {
        @UniqueConstraint(name = "room_number", columnNames = {"room_number"})
})
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int UNSIGNED not null")
    private Long id;

    @Column(name = "room_number", nullable = false, length = 10)
    private String roomNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "type_id", nullable = false)
    private RoomType type;

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

    @OneToMany(mappedBy = "room")
    private Set<Booking> bookings = new LinkedHashSet<>();

    @OneToMany(mappedBy = "room")
    private Set<Review> reviews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "room")
    private Set<RoomImage> roomImages = new LinkedHashSet<>();

}