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
## Selling

### GET All

- Method : GET
- Endpoint : `{host}/api/selling/:userId`

Response : 
```json
{
    "message": "success",
    "listSelling": [
        {
            "_id": "6295a9c02506559ad3e7623c",
            "total_trash": 10,
            "total_point": 100,
            "status": "Menunggu penjemputan",
            "createAt": "2022-05-31T05:37:37.006Z",
            "pengguna": "6295a72534a102d8dbc5104e"
        },
        {
            "_id": "6295aa298420b038e02b67ff",
            "total_trash": 10,
            "total_point": 100,
            "status": "Menunggu penjemputan",
            "createAt": "2022-05-31T05:39:32.628Z",
            "pengguna": "6295a72534a102d8dbc5104e"
        }
    ]
}
```
### POST 

- Method : POST
- Endpoint : `{host}/api/selling/:userId`

Body : 
```json
{
    "total_trash" : 10,
    "total_point" : 100
}
```

Response : 
```json
{
    "message": "success"
}
```

## Point

### GET History All

- Method : GET
- Endpoint : `{host}/api/point/:userId`

Response : 
```json
{
    "message": "success",
    "historyPoint": [
        {
            "_id": "6295affa113cae41ea569a1c",
            "point_min": 100,
            "status": "pembayaran memakai pulsa",
            "start_date": "2022-05-31T06:03:05.922Z",
            "pengguna": "6295a72534a102d8dbc5104e"
        },
        {
            "_id": "6295b06c113cae41ea569a24",
            "point_min": 1000,
            "status": "pembayaran memakai pulsa",
            "start_date": "2022-05-31T06:03:05.922Z",
            "pengguna": "6295a72534a102d8dbc5104e"
        },
        {
            "_id": "6295ae85029e7bff8ddebd87",
            "point_min": 100,
            "status": "pembayaran memakai pulsa",
            "start_date": "2022-05-31T05:57:37.575Z",
            "pengguna": "6295a72534a102d8dbc5104e"
        }
    ]
}
```
### POST 

- Method : POST
- Endpoint : `{host}/api/point/:userId`

Body : 
```json
{
    "point_min" : 100,
    "status" : "pembayaran memakai pulsa"
}
```

Response : 
```json
{
    "message": "success"
}
```
## Profile

### GET Profile by Id

- Method : GET
- Endpoint : `{host}/api/profile/:userId`

Response : 
```json
{
    "message": "success",
    "fullname": "Mamang Loak",
    "email": "mamank@bangkit.academy",
    "phone_number": "08123456789",
    "address": "address"
}
```
