run-user-mangement:
	node services/user-management/app.js

login:
	curl -d '{"phone":"0123456789"}' -H "Content-Type: application/json" -X POST http://localhost:3000/v1/customer/login

loginverify:
	curl -d '{"phone":"0123456789", "otp":"035014"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/v1/customer/login/verify

register: 
	curl -d '{"full_name":"Nguyen Van B","email":"cnguyen@gmail.com","phone":"0123457698"}' -H "Content-Type: application/json" -X POST http://localhost:3000/v1/customer/register

registerverify:
	curl -d '{"phone":"0123457698", "otp":"916270"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/v1/customer/register/verify

resetpassword:
	curl -d '{"phone":"0123456789"}' -H "Content-Type: application/json" -X POST http://localhost:3000/v1/customer/password/reset

updatepassword:
	curl -d '{"password":"123456","token":"MGY5MTJhM2ZjNThhYTJiZjc5NWU2NjQ0NDM1NzQ3YjN8Njc0NTI2MWIwYTk2ZWMzZDQzNjAwODAyZDM0YTg1Y2R8YjA3MDdiNGEwMWE5YThmMWVjNGNlMjY2MDljNmQ5MDM4MWIwODRjYTlmM2I3MzJhZmY5MTlhOWM2YThhOWNiMTNjNzRmMWUzYzU1NWMxYTlkMmEyZTRjNzhmYWNmM2RjYmJiNDE2"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/v1/customer/password/update

profile:
	curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwMTIzNDU2Nzg5IiwiZWF0IjoxNjk2NTE0MTE1MDg5LCJpYXQiOjE2OTY0Mjc3MTV9.nlME_JLSRJOXSjlZiavmBBX5ERG98SAmuSiwPyqHG5s" http://localhost:3000/v1/customer/profile?customer_id=1

updateprofile:
	curl -d '{"full_name":"Nguyen Van 2"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwMTIzNDU2Nzg5IiwiZWF0IjoxNjk2NTMyNjE0Njc4LCJpYXQiOjE2OTY0NDYyMTR9.TXXFIifIjMo5DRjItu9AFKyNGFSMJWeyctDRyI-Jics" -X PUT http://localhost:3000/v1/customer/profile

change-password: 
