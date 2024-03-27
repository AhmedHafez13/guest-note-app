## API Documentation Index

This document provides an overview of the available API modules for user management, note creation and management, and shared notes (timeline). Each module has its own dedicated documentation page that details the endpoints, request and response formats, and authentication requirements.

### Modules:

* [**Auth Module**](./01.Auth-Module.md): This module provides functionalities for user registration and login.
* [**Notes Module**](./02.Note-Module.md): This module allows users to create, retrieve, and share notes.
* [**Timeline Notes Module**](./03.Timeline-Note-Module.md): This module focuses on managing notes shared with the user, including filtering, pagination, and deletion.

**Authentication:**

- All endpoints within these modules require authentication using a valid JWT token, except for registration in the Auth Module.
