# mock4

# Hi Everyone, This project is Food Delivery app.

## Tech Stack used:-
- NodeJS
- Express
- Mongoose


## Backend Deployed Link:-

https://fooddeliveryapp-x0qb.onrender.com/

## All The Routes

| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | /api/register | This endpoint should allow users to register. Hash the password on store. | 201 |
| POST | /api/login | This endpoint should allow users to login. Return JWT token on login. | 201 |
| PUT / PATCH | /api/user/:id/reset | This endpoint should allow users to reset the password identified by user id, providing the current password and new password in the body. | 204 |
| POST | /api/restaurants | This endpoint should allow to add new restaurents | 201 |
| GET | /api/restaurants | This endpoint should return a list of all available restaurants. | 200 |
| GET | /api/restaurants/:id | This endpoint should return the details of a specific restaurant identified by its ID. | 200 |
| GET | /api/restaurants/:id/menu | This endpoint should return the menu of a specific restaurant identified by its ID. | 200 |
| POST / PUT | /api/restaurants/:id/menu | This endpoint should allow the user to add a new item to a specific restaurants menu identified by it id. | 201 |
| DELETE | /api/restaurants/:id/menu/:id | This endpoint should allow the user to delete a particular menu item identified by its id from a specific restaurant. | 202 |
| POST | /api/orders | This endpoint should allow the user to place an order. | 201 |
| GET | /api/orders/:id | This endpoint should return the details of a specific order identified by its ID. (Populate all the details) | 200 |
| PUT / PATCH | /api/orders/:id | This endpoint should allow users to update the status of a specific order identified by its ID. | 204 |
