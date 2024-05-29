package database

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

const TABLE_NAME = "users"

type DatabaseClient struct {
	Client *dynamodb.DynamoDB
}

func NewDatabaseClient() (*DatabaseClient, error) {
	// dbSession, err := session.NewSession(&aws.Config{
	// 	Region: aws.String("us-east-1"),
	// })

	dbSession, err := session.NewSession()

	return &DatabaseClient{
		Client: dynamodb.New(dbSession),
	}, err
}

func (c DatabaseClient) HasUser(username string) (bool, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String(TABLE_NAME),
		Key: map[string]*dynamodb.AttributeValue{
			"username": {
				S: aws.String(username),
			},
		},
	}

	result, err := c.Client.GetItem(input)
	if err != nil {
		return false, err
	}

	if result.Item == nil {
		return false, nil
	}

	return true, nil
}

func (c DatabaseClient) CreateUser(username string) error {
	input := &dynamodb.PutItemInput{
		TableName: aws.String(TABLE_NAME),
		Item: map[string]*dynamodb.AttributeValue{
			"username": {
				S: aws.String(username),
			},
		},
	}

	_, err := c.Client.PutItem(input)
	if err != nil {
		return err
	}

	return nil
}
