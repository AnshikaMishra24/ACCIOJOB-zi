-- Seed data for ComponentAI

-- Insert demo user
INSERT INTO users (name, email, password_hash) VALUES 
('Demo User', 'demo@example.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO') -- password: 'password'
ON CONFLICT (email) DO NOTHING;

-- Insert sample session
INSERT INTO sessions (user_id, name) VALUES 
((SELECT id FROM users WHERE email = 'demo@example.com'), 'My First Component Session')
ON CONFLICT DO NOTHING;

-- Insert sample messages
INSERT INTO messages (session_id, role, content) VALUES 
((SELECT id FROM sessions WHERE name = 'My First Component Session'), 'user', 'Create a modern button component'),
((SELECT id FROM sessions WHERE name = 'My First Component Session'), 'assistant', 'Here''s a modern button component:

```tsx
function ModernButton({ children, variant = "primary", size = "md", onClick, disabled = false }) {
  const baseClasses = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```')
ON CONFLICT DO NOTHING;
