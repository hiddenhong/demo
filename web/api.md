# Base URI: /v1/auth

## Register

**POST /register/**

URL: http://<api_base_url>/v1/auth/register/

Content-Type: application/json

{
    "name": "yimo zhang",
    "email": "yimo@proqod.com",
    "username": "yimo",
    "password": "12345678"
}


**Response**

Status 201 Created

{
    "name": "yimo zhang",
    "email": "yimo@proqod.com",
    "username": "yimo",
    "id": 1
}


## Import users

**POST /import/**

URL: http://<api_base_url>/v1/auth/import/

Content-Type: application/json

[
    {
        "name": "yimo zhang",
        "email": "yimo@proqod.com",
        "username": "yimo",
        "password": "12345678"
    }
]


**Response**

Status 204 No Content

**TODO: Generate report response of user import**



## Login

**POST /login/**

URL: http://<api_base_url>/v1/auth/login/

Content-Type: application/json

{
    "username": "yimo",
    "password": "12345678"
}


**Response**

Cookies: 
- MediaWiki: All cookies from mediawiki login API response
- GitLab: "_gitlab_private_token"

Status 200 OK

{
    "token": "token"
} 


## Logout

**POST /logout/**

URL: http://<api_base_url>/v1/auth/logout/

Authorization: jwt <token_retrieved>


**Response**

Status 204 No Content
 


## Me

**GET /me/**

URL: http://<api_base_url>/v1/auth/me/

Authorization: jwt <token_retrieved>


**Response**

Status 200 OK

{
    "name": "yimo zhang",
    "email": "yimo@proqod.com",
    "id": 1,
    "username": "yimo"
}



## Password

**POST /password/**

URL: http://<api_base_url>/v1/auth/password/

Authorization: jwt <token_retrieved> 

{
    "new_password": "",
    "current_password": ""
}


**Response**

Status 204 No Content