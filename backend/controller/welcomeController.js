export const welcomeController = (req, res) => {
  return res.send(`
    <div style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #f0f2f5 0%, #d9e4f5 100%);
      color: #333;
      padding: 2rem;
      text-align: center;
    ">
      <h1 style="
        font-family: monospace;
        font-size: 3rem;
        color: #4a90e2;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
        margin-bottom: 0.5rem;
      ">
        Welcome to the <span style="color: #222;">RENN</span>-Backend mit Mongoose!
      </h1>

      <p style="
        font-size: 1.25rem;
        max-width: 600px;
        margin-bottom: 2rem;
        line-height: 1.6;
        color: #555;
      ">
        This backend provides a modern, flexible foundation for your web applications - with Node.js, Express, MongoDB and more.<br />
        It is part of a complete full-stack setup that supports both frontend and backend solutions.
      </p>

      <div style="
        background: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        max-width: 600px;
        width: 100%;
      ">
        <h2 style="
          font-family: monospace;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #4a90e2;
        ">Features:</h2>
        <ul style="text-align: left; color: #444; font-size: 1rem; line-height: 1.4;">
          <li>⚡ Fast setup with Express and Mongoose</li>
          <li>🔒 Flexible API with CORS & authentication</li>
          <li>💾 Support for MongoDB & PostgreSQL</li>
          <li>🎨 Perfectly suited for full-stack React & Next.js projects</li>
        </ul>
      </div>
    </div>
  `);
};
