```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant SPA
    participant API Server
    participant Database

    User->>Browser: Request SPA
    Browser->>SPA: Serve SPA
    SPA->>API Server: Fetch Notes
    API Server->>Database: Retrieve Notes
    Database-->>API Server: Notes
    API Server-->>SPA: Notes
    SPA-->>Browser: Render Notes
```