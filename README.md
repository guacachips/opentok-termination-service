# OpenTok Connection Termination Service

This project is a small Node.js app that exposes an API endpoint to terminate an OpenTok connection for a given session. The service uses the OpenTok REST API to handle the disconnection.

## Prerequisites

- Node.js (version 18.x or higher)
- OpenTok API Key and Secret
- `.env` file with the following content:

```bash
API_KEY=your_opentok_api_key
API_SECRET=your_opentok_api_secret
```

## Installation

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add your OpenTok credentials:

   ```bash
   API_KEY=your_opentok_api_key
   API_SECRET=your_opentok_api_secret
   ```

## Running the Service

Start the service locally:

```bash
npm start
```

The service will start on `http://localhost:4242`.

## Using the API

### Terminate a Connection

To terminate a specific connection in an OpenTok session, make a `DELETE` request to the following endpoint:

```
DELETE http://localhost:4242/session/:sessionId/connection/:connectionId/disconnect
```

#### Request Parameters

- `sessionId`: The ID of the OpenTok session.
- `connectionId`: The ID of the connection to be terminated.

#### Example Request

```bash
curl -X DELETE http://localhost:4242/session/SESSION_ID/connection/CONNECTION_ID/disconnect
```

### Response

- **200 OK**: Connection terminated successfully.
- **400 Bad Request**: Missing `sessionId` or `connectionId`.
- **500 Internal Server Error**: An error occurred while terminating the connection.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
