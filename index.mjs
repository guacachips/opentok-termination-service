import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load environment variables from .env
dotenv.config();

const app = express();
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

app.use(express.json());

// Generate JWT token for OpenTok API
const generateJWT = () => {
  return jwt.sign(
    {
      iss: apiKey,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes expiration
    },
    apiSecret
  );
};

// Terminate OpenTok connection
app.delete(
  "/session/:sessionId/connection/:connectionId/disconnect",
  async (req, res) => {
    const { sessionId, connectionId } = req.params;

    if (!sessionId || !connectionId) {
      return res
        .status(400)
        .json({ error: "Missing sessionId or connectionId" });
    }

    try {
      const jwtToken = generateJWT();
      const response = await fetch(
        `https://api.opentok.com/v2/project/${apiKey}/session/${sessionId}/connection/${connectionId}`,
        {
          method: "DELETE",
          headers: {
            "X-OPENTOK-AUTH": jwtToken,
          },
        }
      );

      if (response.ok) {
        res.status(200).json({
          message: `Connection ${connectionId} terminated successfully`,
        });
      } else {
        const errorData = await response.json();
        res.status(500).json({
          error: `Failed to terminate connection: ${errorData.message}`,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Error terminating connection" });
    }
  }
);

// Start the server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
