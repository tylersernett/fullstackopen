```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant SPA
    participant API Server
    participant Database

    User->>Browser: Enter Note
    Browser->>SPA: Save Note
    SPA->>API Server: Save Note
    API Server->>Database: Store Note
    Database-->>API Server: Note Saved
    API Server-->>SPA: Success Response
    SPA->>Browser: Update UI

```