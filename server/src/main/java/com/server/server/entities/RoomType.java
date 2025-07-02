package com.server.server.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "room_types", uniqueConstraints = {
        @UniqueConstraint(name = "name", columnNames = {"name"})
})
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int UNSIGNED not null")
    private Long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "max_occupancy", nullable = false)
    private Integer maxOccupancy;

    @Lob
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "type")
    private Set<Room> rooms = new LinkedHashSet<>();

}