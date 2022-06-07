# Goloak API Documentation

## Setup In Local

1. clone the repository
2. run `npm install`
3. copy `cp .env.example .env`
4. set your config in `.env`
5. run `npm start`

## Setup In App Engine

1. create a new project
2. run `gcloud app create`
3. copy `cp .env.example .env`
4. set your config in `.env`
5. npm install
6. run `gcloud app deploy`
7. visit [your app](https://[your app].appspot.com)

# REST API

- host : `https://goloak.uc.r.appspot.com/`

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

### Forgot Password
- Method : POST
- Endpoint : `{host}/auth/forgot`

Body : 

```json
{
    "email" : "mamank@bangkit.academy"
}
```

Response : 
```json
{
    "message": "success"
}
```

In Email :
![email](https://raw.githubusercontent.com/GoLoak/.github/main/profile/CC/img/resetInEmail.PNG)

### Change Password
- Method : POST
- Endpoint : `{host}/reset-password/:token`

Body : 

```json
{
    "password" : "myspassword121212"
}
```

Response : 
```json
{
    "message": "success"
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
            "photoUrl": "http://url/goloak_1654219249_IOjDnx.jpg",
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
            "photoUrl": "http://url/goloak_1654219121_ezunmU.jpg",
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

Header :

`token : key token`

Body : 
```json
{
    "total_trash" : 10,
    "total_point" : 100,
    "nameTrash" : "Plastic PE"
}
```
Files:

`{ files: { file: filesInputElement } }` => Max file size: 20 MB

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

### POST Point

- Method : POST
- Endpoint : `{host}/api/point/:userId`

Header :

`token : key token`

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

### Update Profile By Id
- Method : PUT/PATCH
- Endpoint : `{host}/api/point/:userId`

Body : 
```json
{
    "fullname": "mamang loak",
    "email": "mamank@bangkit.academy",
    "phone_number": "123",
    "address": "jalan-jalan",
    "point": 0
}
```

Response : 
```json
{
    "message": "success",
    "newUser": {
        "fullname": "mamang loak",
        "email": "mamank@bangkit.academy",
        "phone_number": "123",
        "address": "jalan-jalan",
        "point": 0
    }
}
```

### Delete Profile By Id
- Method : DELETE
- Endpoint : `{host}/api/point/:userId`

Response : 
```json
{
    "message": "success"
}
```

## Home

### GET Home by Id User

- Method : GET
- Endpoint : `{host}/api/home/:userId`

Header :

`token : key token`

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
            "image": "http://url/goloak_1653973448_ymFBQb.jpg",
            "fileSize": "77.14 KB"
        },
        {
            "_id": "6295b13597089dd759c2c142",
            "name": "botol",
            "type": "kaca",
            "description": "botol kaca",
            "price": 1200,
            "image": "http://url/goloak_1653977397_BkWtPS.jpg",
            "fileSize": "77.14 KB"
        },
        {
            "_id": "6295c49b9fe329588c22dae6",
            "name": "botol",
            "type": "kaca",
            "description": "botol kaca",
            "price": 1200,
            "image": "http://url/goloak_1653982363_OzwWmr.jpg",
            "fileSize": "77.14 KB"
        }
    ]
}
```
## Trash

### POST Trash 

- Method : POST
- Endpoint : `{host}/api/trash`

Body : 
```json
{
    "total_trash" : 10,
    "total_point" : 100,
    "nameTrash" : "Plastic PE"
}
```
Files:

`{ files: { file: filesInputElement } }` => Max file size: 20 MB

Response : 
```json
{
    "message": "success",
    "results": {
        "name": "botol",
        "type": "kaca",
        "description": "botol kaca",
        "price": 1200,
        "image": "http://url/goloak_1654430827_VogLgw.jpg",
        "fileSize": "7.79 MB",
        "_id": "629c9c6bb5f03a97292fb252"
    }
}
```

### GET Trash
- Method : GET
- Endpoint : `{host}/api/trash`

Body : 
```json
{
    "message": "success",
    "listTrash": [
        {
            "_id": "629c9c6bb5f03a97292fb252",
            "name": "botol",
            "type": "kaca",
            "description": "botol kaca",
            "price": 1200,
            "image": "http://url/goloak_1654430827_VogLgw.jpg",
            "fileSize": "7.79 MB"
        }
    ]
}
```

# Administrator REST API

## User

### GET All User
- Method : GET
- Endpoint : `{host}/admin/user/`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success",
    "listUser": [
        {
            "_id": "629e3f2adef49892ddbc8139",
            "fullname": "mamank loak",
            "email": "mamank@bangkit.academy",
            "password": "encrypted",
            "phone_number": "number",
            "address": "jln my address",
            "date": "2022-06-06T17:52:40.361Z",
            "point": 100,
            "status": "user",
            "historypoint": [{
                "$oid" : "62996a444bcb549d4dedc7ec"
            }],
            "penjualanku": [{
                "$oid" : "62996b164bcb549d4dedc802"
            }],
            }]
        }
    ]
}
```

### GET User By Id
- Method : POST
- Endpoint : `{host}/admin/user/:userId`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success",
    "user": {
        "_id": "629e3f2adef49892ddbc8139",
        "fullname": "mamank loak",
        "email": "mamank@bangkit.academy",
        "password": "encrypted",
        "phone_number": "number",
        "address": "jln my address",
        "date": "2022-06-06T17:52:40.361Z",
        "point": 0,
        "status": "user",
        "historypoint": [],
        "penjualanku": []
    }
}
```

### Update User By Id
- Method : PUT/PATCH
- Endpoint : `{host}/admin/user/:userId`

Header :

`type : API Key`
`key : token`
`value : your token`

Body : 
```json
{
    "password" : "dafa",
    "point" : 1000
}
```

Response : 
```json
{
    "message": "success"
}
```


### Delete User By Id
- Method : DELETE
- Endpoint : `{host}/admin/user/:userId`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success"
}
```



## Selling

### GET All Selling
- Method : GET
- Endpoint : `{host}/admin/selling/`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success",
    "listSelling": [
        {
            "_id": "629d5ddf22de1d096806f88d",
            "total_trash": 10,
            "total_point": 1000,
            "status": "Menunggu penjemputan",
            "nameTrash": "plastik PE",
            "photoUrl": "https://url/uploads/images/goloak_sell_1654480351_UloVoL.jpg",
            "fileSize": "77.91 KB",
            "createAt": "2022-06-06T01:52:10.092Z",
            "pengguna": "6297d522cbb5dad32159f56b"
        }
    ]
}
```

### GET User By Id
- Method : POST
- Endpoint : `{host}/admin/user/:sellingId`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success",
    "trash": {
        "_id": "629d5ddf22de1d096806f88d",
        "total_trash": 10,
        "total_point": 1000,
        "status": "Menunggu penjemputan",
        "nameTrash": "plastik PE",
        "photoUrl": "https://url/uploads/images/goloak_sell_1654480351_UloVoL.jpg",
        "fileSize": "77.91 KB",
        "createAt": "2022-06-06T01:52:10.092Z",
        "pengguna": "6297d522cbb5dad32159f56b"
    }
}
```

### Update Selling By Id
- Method : PUT/PATCH
- Endpoint : `{host}/admin/user/:sellingId`

Header :

`type : API Key`
`key : token`
`value : your token`

Body : 
```json
{
    "status" : "Sedang dikonfirmasi"
}
```

Response : 
```json
{
    "message": "success"
}
```


### Delete User By Id
- Method : DELETE
- Endpoint : `{host}/admin/user/:sellingId`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success"
}
```


## Trash

### GET All Trash
- Method : GET
- Endpoint : `{host}/admin/trash/`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success",
    "listTrash": [
        {
            "_id": "6295c76f011ee4beed8c1507",
            "name": "botol kaca",
            "type": "kaca",
            "description": "botol kaca....",
            "price": 1200,
            "image": "https://url/img.jpg",
            "fileSize": "77.14 KB"
        }
    ]
}
```

### GET Trash By Id
- Method : POST
- Endpoint : `{host}/admin/trash/:trashId`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success",
    "trash": {
        "_id": "6295c76f011ee4beed8c1507",
        "name": "botol kaca",
        "type": "kaca",
        "description": "botol kaca...",
        "price": 1200,
        "image": "https://url/img.png",
        "fileSize": "77.14 KB"
    }
}
```

### Update Trash By Id
- Method : PUT/PATCH
- Endpoint : `{host}/admin/trash/:trashId`

Header :

`type : API Key`
`key : token`
`value : your token`

Body : 
```json
{
    "name": "botol kaca sedang",
    "type": "kaca",
    "description": "botol kaca sedang dan sejenisnya boleh di jual",
    "price": 2000
}
```

Response : 
```json
{
    "message": "success"
}
```


### Delete User By Id
- Method : DELETE
- Endpoint : `{host}/trash/user/:trashId`

Header :

`type : API Key`
`key : token`
`value : your token`

Response : 
```json
{
    "message": "success"
}
```
