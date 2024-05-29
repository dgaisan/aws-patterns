package main

import (
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type UserEvent struct {
	Username string `json:"username"`
}

func HandleRequest(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch request.HTTPMethod {
	case "GET":
		return handleGet(request)
	default:
		return events.APIGatewayProxyResponse{
			StatusCode: 405,
			Body:       "Unsupported method",
		}, fmt.Errorf("unsupported method %s", request.HTTPMethod)
	}
}

func handleGet(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		Body:       "GET Successful",
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
