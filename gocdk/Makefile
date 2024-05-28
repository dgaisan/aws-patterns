build:
	@cd lambda
	@GOOS=linux GOARCH=amd64 go build -o bootstrap
	@zip function.zip bootstrap
	@mv function.zip lambda/
	@rm bootstrap
	@cd ..