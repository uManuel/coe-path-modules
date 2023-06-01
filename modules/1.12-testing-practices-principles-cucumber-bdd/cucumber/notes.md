# Cucumber

## What's Cucumber

Cucumber is a software tool for testing that implement the BDD and uses the **Gherkin** language to interact with the clients, developers and testers.

## What's BDD

BDD stands for Behavior-Driven Development. It's an agile software development methodology that aims to enhance collaboration and communication among developers, testers, business analysts, and stakeholders using a human-readable language that can be understood by both technical and non-technical

## Gherkin language

It's the language that uses cucumber to describe the desired behavior (features). Uses the following structure:

- Feature: The feature title that you are going to describe

- Scenario: The title of the specific scenario that you're going to describe

- Given: Pre-conditions or initial state of the system

- When: A specific action or event occurs

- Then: The expected behavior

- And: Can be used after any of the gherkin keywords Given, When, Then and It allows you to combine multiple related steps into a single scenario

- But: It's similar to And steps. However it's typically used to provide a contrast or exception to the preceding step.

example: 

```GHERKIN
Scenario: Purchasing a Product
    Given the user is logged in
    And there is a product in stock
    When the user adds the product to the cart
    And the user proceeds to checkout
    But the user's credit card is declined
    Then an error message should be displayed
    And the user should not be charged

```

## Steps

The steps can be written in any programming language like java, python, javascript and implements the Keywords of Gherkin files like **Given, When And, But, Then**.

You can use selenium, cypress 

## TestRunner

A test runner it's a tool that is used to run or execute tests and export results.

## Global Hooks

Are functions that can be executed before or after your tests

- Before: It executes one before all you steps.
- After: It executes one after all your steps.
