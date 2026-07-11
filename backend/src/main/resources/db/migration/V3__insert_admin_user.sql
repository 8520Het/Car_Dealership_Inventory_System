-- Insert a default Admin user
-- Password is 'admin123' (BCrypt hashed)
INSERT INTO users (id, email, password, role_id, created_at)
VALUES (
    gen_random_uuid(),
    'admin@dealership.com',
    '$2a$10$tZ2c.d7N3O/yTqPZf8R/k.G.7/W9B0L3r7v.v7V8R9Y3m9x3v7D.q', -- admin123
    (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'),
    CURRENT_TIMESTAMP
);
