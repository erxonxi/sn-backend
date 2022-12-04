Feature: Create session of user
  Scenario: A existing user with correct information
    Given I send a PUT request to "/v1/users" with body:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "email": "ruben.ruiz@mail.com",
        "password": "ruben"
      }
      """
    Then the response status code should be 201
    And the response should be empty
    Given I send a POST request to "/v1/users/session" with body:
      """
      {
        "email": "ruben.ruiz@mail.com",
        "password": "ruben"
      }
      """
    Then the response status code should be 201

  Scenario: A existing user with incorrect information
    Given I send a POST request to "/v1/users/session" with body:
      """
      {
        "email": "ruben.ruiz@mail.com",
        "password": "other"
      }
      """
    Then the response status code should be 404

  Scenario: A unexisting user
    Given I send a POST request to "/v1/users/session" with body:
      """
      {
        "email": "juan.ruiz@mail.com",
        "password": "koko"
      }
      """
    Then the response status code should be 404
