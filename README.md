# Goloak API Documentation

## User
### Signup
- Method : POST
- Endpoint : `{host}/auth/signup`

Body : 

```json
{
    "fullname": "Mamang Loak",
    "password": "mypassword",
    "email" : "Mamank@bangkit.academy",
    "phone_number" : "08123456789",
    "address" : "address"
}
```

Response : 
```json
{
    "message": "success"
}
```

### Login
- Method : POST
- Endpoint : `{host}/auth/login`

Body : 

```json
{
    "password": "mypassword",
    "email" : "Mamank@bangkit.academy"
}
```

Response : 
```json
{
    "message": "success",
    "id": "6295a72534a102d8dbc5104e",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTVhNzI1MzRhMTAyZDhkYmM1MTA0ZSIsImVtYWlsIjoibWFtYW5rQGJhbmdraXQuYWNhZGVteSIsImlhdCI6MTY1Mzk3NDk4MywiZXhwIjoxNjU0MDYxMzgzfQ.-l1IbxCGYxeX2Ta45UIaldA-K2cYGsOHF0i8Lh2iOFY"
}
```


