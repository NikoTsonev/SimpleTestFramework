@CareersPage
Feature: Careers page

    Background:
        Given I am on the Careers page

    @Regression @Positive
    Scenario Outline: Sorting opened positions by category
        When I click on the Open careers button
        And I click on <category> button
        Then I should see relevant <positions> for <category>

        Examples:
            | category      | positions                                                                                                                                  |
            | "All"         | "BI Analyst,QA Automation Engineer,Back-end Software Engineer,Front-end Software Engineer,Legal Counsel,Product Implementation Consultant" |
            | "Data"        | "BI Analyst"                                                                                                                               |
            | "Engineering" | "QA Automation Engineer,Back-end Software Engineer,Front-end Software Engineer"                                                            |
            | "Legal"       | "Legal Counsel"                                                                                                                            |
            | "Product"     | "Product Implementation Consultant"                                                                                                        |

    @Regression
    Scenario Outline: Verify opent positions
        When I click on <position>
        Then I verify information about <position>

        Examples:
            | position                            |
            | "BI Analyst"                        |
            | "QA Automation Engineer"            |
            | "Back-end Software Engineer"        |
            | "Front-end Software Engineer"       |
            | "Legal Counsel"                     |
            | "Product Implementation Consultant" |