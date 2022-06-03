# Goloak API Documentation

- host : `https://goloak.herokuapp.com/`

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

### GET By User Id

- Method : GET
- Endpoint : `{host}/api/selling/:userId`

Response : 
```json
{
    "message": "success",
    "listSelling": [
        {
            "_id": "629961f1cfa2610d24c81eb3",
            "total_trash": 10,
            "total_point": 1111,
            "status": "Menunggu penjemputan",
            "nameTrash": "Plastik PE",
            "photoUrl": "uploads\\images\\goloak_1654219249_IOjDnx.jpg",
            "fileSize": "17.72 KB",
            "createAt": "2022-06-03T01:20:24.919Z",
            "pengguna": "62995cde1069186263559034"
        },
        {
            "_id": "62996171029bcd4d0802e898",
            "total_trash": 10,
            "total_point": 1111,
            "status": "Menunggu penjemputan",
            "nameTrash": "Plastik PE",
            "photoUrl": "uploads\\images\\goloak_1654219121_ezunmU.jpg",
            "fileSize": "17.72 KB",
            "createAt": "2022-06-03T01:18:02.808Z",
            "pengguna": "62995cde1069186263559034"
        }
    ]
}
```
### POST By User Id

- Method : POST
- Endpoint : `{host}/api/selling/:userId`

Body : 
```json
{
    "total_trash" : 10,
    "total_point" : 100,
    "nameTrash" : "Plastic PE"
}
```
Files:

`{ files: { file: filesInputElement } }`

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
    "address": "address",
    "point": 0
}
```

## Home

### GET Home by Id User

- Method : GET
- Endpoint : `{host}/api/home/:userId`

Response : 
```json
{
    "message": "success",
    "fullname": "Mamang Loak",
    "email": "mamank@bangkit.academy",
    "phone_number": "08123456789",
    "address": "address",
    "point": 0,
    "listTrash": [
        {
            "_id": "6295a1c834a102d8dbc5104c",
            "name": "botol",
            "type": "kaca",
            "description": "botol kaca",
            "price": 1200,
            "image": "http://localhost:3033/uploads\\goloak_1653973448_ymFBQb.jpg",
            "fileSize": "77.14 KB"
        },
        {
            "_id": "6295b13597089dd759c2c142",
            "name": "botol",
            "type": "kaca",
            "description": "botol kaca",
            "price": 1200,
            "image": "http://localhost:3033/uploads\\goloak_1653977397_BkWtPS.jpg",
            "fileSize": "77.14 KB"
        },
        {
            "_id": "6295c49b9fe329588c22dae6",
            "name": "botol",
            "type": "kaca",
            "description": "botol kaca",
            "price": 1200,
            "image": "http://localhost:3033/uploads\\goloak_1653982363_OzwWmr.jpg",
            "fileSize": "77.14 KB"
        }
    ]
}
```