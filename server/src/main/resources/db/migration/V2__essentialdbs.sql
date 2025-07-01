CREATE TABLE IF NOT EXISTS users (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     username VARCHAR(50) NOT NULL UNIQUE,
                                     password VARCHAR(255) NOT NULL,
                                     email VARCHAR(100) NOT NULL UNIQUE,
                                     full_name VARCHAR(100),
                                     role VARCHAR(20),
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE room_types (
                            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(50) NOT NULL UNIQUE,
                            max_occupancy INT NOT NULL CHECK (max_occupancy > 0),
                            description TEXT
);


CREATE TABLE rooms (
                       id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                       room_number VARCHAR(10) NOT NULL UNIQUE,
                       type_id INT UNSIGNED NOT NULL,
                       status ENUM ('AVAILABLE', 'BOOKED', 'MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
                       floor INT NOT NULL CHECK (floor >= 0),
                       price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
                       description TEXT,
                       CONSTRAINT fk_rooms_type FOREIGN KEY (type_id) REFERENCES room_types(id) ON DELETE CASCADE
);

-- Bookings
CREATE TABLE bookings (
                          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          user_id BIGINT NOT NULL,
                          room_id INT UNSIGNED NOT NULL,
                          check_in_date DATE NOT NULL,
                          check_out_date DATE NOT NULL,
                          status ENUM ('CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'CONFIRMED',
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                          CONSTRAINT fk_bookings_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
                          CHECK (check_out_date > check_in_date)
);

-- Payments
CREATE TABLE payments (
                          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          booking_id INT UNSIGNED NOT NULL UNIQUE,
                          amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
                          payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          method VARCHAR(30) NOT NULL,
                          status ENUM ('PAID', 'FAILED', 'REFUNDED') NOT NULL,
                          CONSTRAINT fk_payments_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Reviews
CREATE TABLE reviews (
                         id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                         user_id BIGINT NOT NULL,
                         room_id INT UNSIGNED NOT NULL,
                         rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                         comment TEXT,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         UNIQUE (user_id, room_id),
                         CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                         CONSTRAINT fk_reviews_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Room Images
CREATE TABLE room_images (
                             id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                             room_id INT UNSIGNED NOT NULL,
                             url TEXT NOT NULL,
                             is_primary BOOLEAN DEFAULT FALSE,
                             CONSTRAINT fk_room_images_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);