## POST
http://localhost:2022/api/create-user

REQUEST OBJECT

{
    "username": "Tom Hanks",
    "password": "new password"
}


## POST 
http://localhost:2022/api/login-user

{
    "username": "Tom    ",
    "password": "my pass"
}

###### ACCESS TOKEN NEED BELOW REQUEST ########

## GET
// http://localhost:2022/api/list-users?limit=2&offset=1


## GET
http://localhost:2022/api/user

## PUT
http://localhost:2022/api/update-user/3

{
    "username": "Amir"
}

## DELETE
http://localhost:2022/api/delete-user/1