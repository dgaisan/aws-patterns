package main

import (
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

type UserEvent struct {
	Username string
}

func HandleRequest(event UserEvent) (string, error) {
	if event.Username == "" {
		return "", fmt.Errorf("username is required")
	}

	return fmt.Sprintf("Invoked by %s", event.Username), nil
}

func main() {
	lambda.Start(HandleRequest)
}
