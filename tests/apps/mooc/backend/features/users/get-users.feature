Feature: Search users
  Scenario: Get all existent users
    Given I send a GET request to "/v1/users"
    Then the response status code should be 200
    And the response should be array
