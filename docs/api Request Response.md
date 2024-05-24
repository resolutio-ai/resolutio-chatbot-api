## FEED PAGE 

Get paginated feed 

feedPage api route : [http://localhost:6283/api/v1.0/feed](http://localhost:6283/api/v1.0/feed)

count (Default set to 10) - specify the number of items to be listed in one page


Response
```
{
  "message": "Works retrieved successfully",
  "data": [
    {
      "_id": "6647911febb46a2c0533cccd",
      "userId": "6615a3833975538997f6fcef",
      "nameOfWork": "Time",
      "medium": "Photo",
      "timeStamp": "2024-05-17T17:17:19.333Z",
      "licenseType": "CC BY",
      "cid": "4598l0l890acckkf",
      "fileUploadResponse": {
        "hash": "sample-hash",
        "name": "sample-file.jpg",
        "size": "1MB",
        "_id": "6647911febb46a2c0533ccce"
      },
      "licenseUploadResponse": {
        "hash": "sample-license-hash",
        "name": "sample-license.pdf",
        "size": "500KB",
        "_id": "6647911febb46a2c0533cccf"
      },
      "createdAt": "2024-05-17T17:17:19.340Z",
      "updatedAt": "2024-05-17T17:17:19.340Z",
      "__v": 0
    }
  ],
  "totalWorks": 1,
  "totalPages": 1,
  "currentPage": 1
}

```

### Query parameters 

page: number
count: number 
searchParam: string 
medium: string 
licenseType: string 
startDate: string 
endDate: string

Sample

page  2 // shows the contents on second page (default set to 1)
Count 10 // max only 10 items is shown in single page

searchParam - Stella //(searches if there is any work with its name as Stella or nameOfCreator as Stella) matches with the work which has nameOfCreator as Stella
url : [http://localhost:6283/api/v1.0/feed/?searchParam=Stella](http://localhost:6283/api/v1.0/feed/?searchParam=Stella)

Filters
Medium - Art 
Options available { "Film" , "Photo" , "Music" , "AI" , "Art" , "Other" }

licenseType - CC BY
Options available {"CC BY" , "CC BY-SA" , "CC-BY-NC" , "CC-BY-NC-SA" , "CC-BY-ND" , "CC-BY-NC-ND" , "CC0" , "resolutio License" , "Your own License" }

startDate, endDate  ( string values converted to date using new date(datestring) function )


## CREATE WORK

create work api route : [http://localhost:6283/api/v1.0/evidence/](http://localhost:6283/api/v1.0/evidence/)

Request body
```
{
    "metadata": {
        "userId": "6615a2d23975538997f6fce7",
        "nameOfWork": "fireworks",
        "medium": "Photo",
        "licenseType": "CC-BY-NC"
    },
    "fileUploadResponse": {
        "data": {
            "fileUploadResponse": {
                "name": "sample-file.jpg",
                "hash": "sample-hash",
                "size": "1MB"
            },
            "licenseUploadResponse": {
                "name": "sample-license.pdf",
                "hash": "sample-license-hash",
                "size": "500KB"
            }
        },
        "meshUrl": {
            "fileUrl": "https://example.com/sample-file.jpg",
            "licenseUrl": "https://example.com/sample-license.pdf"
        }
    },
    "finalCID": "4598l0l890lcppl"
}

```

### Get work by a user 

Give userId as a query parameter

url : [http://localhost:6283/api/v1.0/evidence/?userId=6615a2d23975538997f6fce7](http://localhost:6283/api/v1.0/evidence/?userId=6615a2d23975538997f6fce7)

```
{
  "message": "works by user retrieved successfully",
  "data": [
    {
      "_id": "6647913cebb46a2c0533ccd2",
      "userId": "6615a2d23975538997f6fce7",
      "nameOfWork": "sea",
      "medium": "Art",
      "timeStamp": "2024-05-17T17:17:48.731Z",
      "licenseType": "CC BY",
      "cid": "4598l0l890acppl",
      "fileUploadResponse": {
        "hash": "sample-hash",
        "name": "sample-file.jpg",
        "size": "1MB",
        "_id": "6647913cebb46a2c0533ccd3"
      },
      "licenseUploadResponse": {
        "hash": "sample-license-hash",
        "name": "sample-license.pdf",
        "size": "500KB",
        "_id": "6647913cebb46a2c0533ccd4"
      },
      "createdAt": "2024-05-17T17:17:48.732Z",
      "updatedAt": "2024-05-17T17:17:48.732Z",
      "__v": 0
    }
  ]
}
```

### Get work by cid

getCreatedWork by cid : [http://localhost:6283/api/v1.0/evidence/cid?cid=4598l0l890acppl](http://localhost:6283/api/v1.0/evidence/cid?cid=4598l0l890acppl)

Response - format same as above


## USER PROFILE

### Get all users

getAllUsers api route : [http://localhost:6283/api/v1.0/user/](http://localhost:6283/api/v1.0/user/)

Response 

```
{
  "data": [
    {
      "_id": "6615a2d23975538997f6fce7",
      "walletAddress": "0x1234567890abceekk",
      "firstName": "Stella",
      "lastName": "David",
      "bio": "capturing moments forever",
      "profileImg": "https://example.com/profile.jpg",
      "professionalTitle": "Photographer",
      "socialMediaURLs": [
        {
          "nameOfSocialMedia": "Twitter",
          "URLvalue": "https://twitter.com/Stella",
          "_id": "6615a2d23975538997f6fce8"
        }
      ],
      "__v": 0
    },
    {
      "_id": "6615a3833975538997f6fcef",
      "walletAddress": "0x1234567890abceekl",
      "firstName": "John",
      "lastName": "David",
      "bio": "capturing moments forever",
      "profileImg": "https://example.com/profile.jpg",
      "professionalTitle": "Photographer",
      "socialMediaURLs": [
        {
          "nameOfSocialMedia": "Twitter",
          "URLvalue": "https://twitter.com/John",
          "_id": "6615a3833975538997f6fcf0"
        },
        {
          "nameOfSocialMedia": "Instagram",
          "URLvalue": "https://www.instagram.com/John",
          "_id": "6615a3833975538997f6fcf1"
        }
      ],
      "__v": 0
    },
    {
      "_id": "661ce5884379811211e5105e",
      "walletAddress": "0x1234567890akceekp",
      "firstName": "James",
      "lastName": "David",
      "bio": "capturing moments forever",
      "profileImg": "https://example.com/profile.jpg",
      "professionalTitle": "Photographer",
      "socialMediaURLs": [
        {
          "nameOfSocialMedia": "Twitter",
          "URLvalue": "https://twi.com/John",
          "_id": "661ce5884379811211e5105f"
        },
        {
          "nameOfSocialMedia": "Instagram",
          "URLvalue": "https://www.in.com/John",
          "_id": "661ce5884379811211e51060"
        }
      ],
      "__v": 0
    }
  ],
  "message": "Users retrieved successfully"
}
```

### Get user by wallet address

url : [http://localhost:6283/api/v1.0/user/0x1234567890abceekk](http://localhost:6283/api/v1.0/user/0x1234567890abceekk)

### Create user

url : [http://localhost:6283/api/v1.0/user/](http://localhost:6283/api/v1.0/user/)

Request body

```
{
    "walletAddress": "0x1234567890abcllkk",
    "firstName": "George",
    "lastName": "David",
    "bio": "capturing life",
    "profileImg": "https://example.com/profile.jpg",
    "professionalTitle": "Photographer",
    "socialMediaURLs": [
      {
        "nameOfSocialMedia": "Twitter",
        "URLvalue": "https://twitter.com/George"
      }
    ]
  }
```

nameOfSocialMedia available { "Twitter", "Behance", "Instagram" }

Response 
```
{
  "data": {
    "walletAddress": "0x1234567890abcllkk",
    "firstName": "George",
    "lastName": "David",
    "bio": "capturing life",
    "profileImg": "https://example.com/profile.jpg",
    "professionalTitle": "Photographer",
    "socialMediaURLs": [
      {
        "nameOfSocialMedia": "Twitter",
        "URLvalue": "https://twitter.com/George"
      }
    ],
    "_id": "6648f59817fcfb0044812894",
    "__v": 0
  },
  "message": "User created successfully"
}

```

### Update user - give userId

url : [http://localhost:6283/api/v1.0/user/661ce5fb18b805865b912cc6](http://localhost:6283/api/v1.0/user/661ce5fb18b805865b912cc6)

Request - only give the fields that need to be updated (wallet address cannot be updated) 

Response - user profile with updates reflected
 
