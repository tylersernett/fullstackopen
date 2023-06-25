```mermaid
sequenceDiagram
    participant browser
    participant server
    participant database

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>database: Save new note
    activate database
    database-->>server: Note saved
    deactivate database
    server-->>browser: Note saved successfully
    deactivate server

    Note right of browser: The browser updates the page to display the new note
```
