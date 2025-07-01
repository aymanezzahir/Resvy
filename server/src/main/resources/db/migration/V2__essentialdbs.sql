CREATE TABLE rooms (
                       id SERIAL PRIMARY KEY,
                       room_number VARCHAR(10) NOT NULL UNIQUE,
                       type_id INT NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
                       status ENUM ('AVAILABLE', 'BOOKED', 'MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
                       floor INT NOT NULL CHECK (floor >= 0),
                       price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
                       description TEXT
);

CREATE TABLE room_types (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(50) NOT NULL UNIQUE,
                            max_occupancy INT NOT NULL CHECK (max_occupancy > 0),
                            description TEXT
);


CREATE TABLE bookings (
                          id SERIAL PRIMARY KEY,
                          user_id INT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
                          room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
                          check_in_date DATE NOT NULL,
                          check_out_date DATE NOT NULL,
                          status ENUM ('CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'CONFIRMED',
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          CHECK (check_out_date > check_in_date)
);

CREATE TABLE payments (
                          id SERIAL PRIMARY KEY,
                          booking_id INT NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
                          amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
                          payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          method VARCHAR(30) NOT NULL,
                          status ENUM ('PAID', 'FAILED', 'REFUNDED') NOT NULL
);

CREATE TABLE reviews (
                         id SERIAL PRIMARY KEY,
                         user_id INT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
                         room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
                         rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                         comment TEXT,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         UNIQUE(user_id, room_id)
);

CREATE TABLE room_images (
                             id SERIAL PRIMARY KEY,
                             room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
                             url TEXT NOT NULL,
                             is_primary BOOLEAN DEFAULT FALSE
);