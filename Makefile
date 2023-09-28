run-user-mangement:
	node services/user-management/app.js

login:
	curl -d '{"phone":"0123456789"}' -H "Content-Type: application/json" -X POST http://localhost:3000/v1/customer/login

profile:
	curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwMTIzNDU2Nzg5IiwiZWF0IjoxNjk1OTIzNTIwMzU1LCJpYXQiOjE2OTU4MzcxMjB9.ZF8BwT9m8F8T3lEKqfS1S1Vasdlneom1G0e7LkopL3o" http://localhost:3000/v1/customer/profile
