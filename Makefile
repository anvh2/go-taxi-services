run-user-mangement:
	node services/user-management/app.js

login:
	curl -d '{"phone":"0123456789"}' -H "Content-Type: application/json" -X POST http://localhost:3000/v1/customer/login

loginverify:
	curl -d '{"phone":"0123456789", "otp":"906589"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/v1/customer/login/verify

profile:
	curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwMTIzNDU2Nzg5IiwiZWF0IjoxNjk2NTE0MTE1MDg5LCJpYXQiOjE2OTY0Mjc3MTV9.nlME_JLSRJOXSjlZiavmBBX5ERG98SAmuSiwPyqHG5s" http://localhost:3000/v1/customer/profile?customer_id=1

change-password: 
