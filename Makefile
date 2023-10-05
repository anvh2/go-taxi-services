run-user-mangement:
	node services/user-management/app.js

login:
	curl -d '{"phone":"0123456789"}' -H "Content-Type: application/json" -X POST http://localhost:3000/v1/customer/login

loginverify:
	curl -d '{"phone":"0123456789", "otp":"287332"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/v1/customer/login/verify

register: 
	curl -d '{"full_name":"Nguyen Van Ca","email":"canguyen@gmail.com","phone":"0121457698"}' -H "Content-Type: application/json" -X POST http://localhost:3000/v1/customer/register

registerverify:
	curl -d '{"phone":"0121457698", "otp":"606687"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/v1/customer/register/verify

resetpassword:
	curl -d '{"phone":"0121457698"}' -H "Content-Type: application/json" -X POST http://localhost:3000/v1/customer/password/reset

updatepassword:
	curl -d '{"password":"123456","token":"NDViYjhjMjI3ZjdlNTYzMGQzNWFiMWUxNGRhMjA1ZWJ8MTcxNzQ5MThiZTg4Y2I2MWMyODZlNzY4ZWUwYzhjMWN8YjZjNDJmODgwOTNjZjBkZGQwNTNlZTlkMzA0MjYxMzYwZmZiZTBmZjQyMmVkOTlkOWRlZDdlNzQ4N2NiODEzNzVhMWFlOGQwMDRmMDI3N2QwNTYyNTlmNTU2YTg5ZDRlZmU3ZjIy"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/v1/customer/password/update

profile:
	curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwMTIzNDU2Nzg5IiwiZWF0IjoxNjk2NTYwMDc4ODYxLCJpYXQiOjE2OTY0NzM2Nzh9.8aSs3HI3-g5Zqv4I2R2nVNP9K3Ar8e8kRNgHc21MBGY" http://localhost:3000/v1/customer/profile?customer_id=1

updateprofile:
	curl -d '{"full_name":"Nguyen Van 3"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwMTIzNDU2Nzg5IiwiZWF0IjoxNjk2NTYwMDc4ODYxLCJpYXQiOjE2OTY0NzM2Nzh9.8aSs3HI3-g5Zqv4I2R2nVNP9K3Ar8e8kRNgHc21MBGY" -X PUT http://localhost:3000/v1/customer/profile

change-password: 
