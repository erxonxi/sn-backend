Feature: Create a new user
  Scenario: A valid non existing user
    Given I send a PUT request to "/v1/users" with body:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "email": "pepe@mail.com",
        "password": "sushi"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: An invalid non existing user
    Given I send a PUT request to "/v1/users" with body:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "email": "pedro#mail.com",
        "password": "macros"
      }
      """
    Then the response status code should be 404
