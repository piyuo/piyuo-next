# Test API Endpoint

Simple testing endpoint for debugging POST requests.

## Endpoint

**URL:** `/api/v1/test`

## Usage

### POST - Send JSON Data

Send any JSON payload to this endpoint:

```bash
curl -X POST http://localhost:3000/api/v1/test \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "value": 123}'
```

**Response:**
```json
{
  "success": true,
  "message": "Data received and stored",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

The endpoint will:
- Log the received JSON to the console
- Store it in memory
- Return a success response

### GET - View Last Posted Data

Visit the endpoint in your browser or use curl:

```bash
curl http://localhost:3000/api/v1/test
```

**Response (with data):**
```json
{
  "message": "Last posted data",
  "postedAt": "2024-01-01T12:00:00.000Z",
  "data": {
    "message": "Hello",
    "value": 123
  }
}
```

**Response (no data yet):**
```json
{
  "message": "No data posted yet",
  "lastPostedAt": null
}
```

## Console Output

When you POST data, you'll see formatted output in the server console:

```
================================================================================
📨 Received POST at /api/v1/test
⏰ Timestamp: 2024-01-01T12:00:00.000Z
📦 Payload:
{
  "message": "Hello",
  "value": 123
}
================================================================================
```

## Notes

- Data is stored **in memory only** - it will be lost when the server restarts
- Only the **most recent** POST is kept
- No authentication or rate limiting
- For testing/development purposes only
