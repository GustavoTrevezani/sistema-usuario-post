-- Insert sample users
INSERT INTO "User" ("name", "email") VALUES 
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Carol Davis', 'carol@example.com')
ON CONFLICT ("email") DO NOTHING;

-- Insert sample posts
INSERT INTO "Post" ("title", "content", "published", "authorId") VALUES 
('Getting Started with React', 'React is a powerful library for building user interfaces...', true, 1),
('Advanced TypeScript Tips', 'Here are some advanced TypeScript techniques...', true, 1),
('Database Design Principles', 'Good database design is crucial for application performance...', false, 2),
('Modern CSS Techniques', 'CSS has evolved significantly in recent years...', true, 3);
