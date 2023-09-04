@LoginFunctionality
Feature: Login flow

    Background:
        Given I am on the Main page

    @Regression @Positive 
    Scenario: Login with valid credentials
        When I click on the Login button
        And I enter valid email and password
        Then I should login successfully

    @Regression @Negative
    Scenario Outline: Try login with invalid credentials
        When I click on the Login button
        And I enter invalid <email> and <password>
        Then I should see <message>

        Examples:
            | email           | password           | message                                                            |
            | "invalid_email" | ""                 | "The Email field is not a valid e-mail address."                   |
            | "test@test.org" | ""                 | "Password is required"                                             |
            | ""              | "Invalid_password" | "Email is required The Email field is not a valid e-mail address." |
            | "test@test.org" | "Invalid_password" | "Invalid login attempt."                                           |

