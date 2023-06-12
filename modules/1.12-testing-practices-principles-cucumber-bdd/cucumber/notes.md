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

You can create them using a separated step definition like `common_step.file` or inside of other step definitions the flow execution should be

1. The self step definition hook.
2. The `common_steps.file`
3. The other steps definitions

## Scenario specific hook

We can add more hooks to specific scenarios using scenario specific hooks. To do that we need to add tags to the feature files and in the step definitions  like in the following example

```GHERKIN
Feature: User Login

  Scenario: Successful Login
    Given I am on the login page
    When I enter valid credentials
    Then I should be logged in successfully

  @logout
  Scenario: Successful Logout
    Given I am logged in
    When I click on the logout button
    Then I should be logged out successfully

```

```JAVA
import io.cucumber.java.Before;
import io.cucumber.java.After;
import io.cucumber.java.Scenario;

public class LoginSteps {

    @Before("@logout")
    public void beforeLogoutScenario(Scenario scenario) {
        System.out.println("Before Logout Scenario Hook");
    }

    @After("@logout")
    public void afterLogoutScenario(Scenario scenario) {
        System.out.println("After Logout Scenario Hook");
    }

    @Given("I am on the login page")
    public void iAmOnTheLoginPage() {
        System.out.println("Step: I am on the login page");
    }

    @Given("I enter valid credentials")
    public void iEnterValidCredentials() {
        System.out.println("Step: I enter valid credentials");
    }

    @When("I click on the logout button")
    public void iClickOnTheLogoutButton() {
        System.out.println("Step: I click on the logout button");
    }

    @Then("I should be logged in successfully")
    public void iShouldBeLoggedInSuccessfully() {
        System.out.println("Step: I should be logged in successfully");
    }

    @Then("I should be logged out successfully")
    public void iShouldBeLoggedOutSuccessfully() {
        System.out.println("Step: I should be logged out successfully");
    }
}

```

The order of execution the specific hooks are the same as the order by the functions in the step definition.

### Prioritizing hooks

We can prioritize and set a default order by apply a parameter in the decorator of a step definition like

```JAVA
import io.cucumber.java.Before;
import io.cucumber.java.After;
import io.cucumber.java.Scenario;

public class LoginSteps {

    @Before(value="@logout",order=1)// 0 means first in before
    public void beforeLogoutScenario(Scenario scenario) {
        System.out.println("Before Logout Scenario Hook");
    }

    @After(value="@logout",order=1)// 0 means latest in after
    public void afterLogoutScenario(Scenario scenario) {
        System.out.println("After Logout Scenario Hook");
    }

    @Given("I am on the login page")
    public void iAmOnTheLoginPage() {
        System.out.println("Step: I am on the login page");
    }

    @Given("I enter valid credentials")
    public void iEnterValidCredentials() {
        System.out.println("Step: I enter valid credentials");
    }

    @When("I click on the logout button")
    public void iClickOnTheLogoutButton() {
        System.out.println("Step: I click on the logout button");
    }

    @Then("I should be logged in successfully")
    public void iShouldBeLoggedInSuccessfully() {
        System.out.println("Step: I should be logged in successfully");
    }

    @Then("I should be logged out successfully")
    public void iShouldBeLoggedOutSuccessfully() {
        System.out.println("Step: I should be logged out successfully");
    }
}

```

## Parameterize steps in Cucumber

### Using Scenario outline

1. Write in your feature file a scenario and then define an Scenario Outline keyword like **Given, And or Then**

2. Add a place holder for the parameter you want to pass.like

```GHERKIN
Scenario Outline: Add two numbers
  Given I have entered <number1> into the calculator
  And I have entered <number2> into the calculator
  When I press add
  Then the result should be <sum> on the screen

  Examples:
    | number1 | number2 | sum |
    | 10      | 20      | 30  |
    | 5       | 15      | 20  |
```

3. Implement the step definition and use regular expressions to match the step text and capture the params.

```JAVA
import io.cucumber.java.en.*;

public class CalculatorSteps {
    private int number1;
    private int number2;
    private int result;

    @Given("I have entered {int} into the calculator")
    public void enterNumber(int number) {
        // Perform the necessary action to enter the number into the calculator
        if (number1 == 0)
            number1 = number;
        else
            number2 = number;
    }

    @When("I press add")
    public void pressAdd() {
        // Perform the necessary action to add the numbers
        result = number1 + number2;
    }

    @Then("the result should be {int} on the screen")
    public void checkResult(int expected) {
        // Perform the necessary action to check the result
        assertEquals(expected, result);
    }
}

```

### Using an scenario

```GHERKIN
Scenario: Search for a product
  Given I am on the homepage
  When I search for "iPhone"
  Then I should see search results for "iPhone"
```

```JAVA
import io.cucumber.java.en.*;

public class SearchSteps {
    @When("I search for {string}")
    public void searchForProduct(String product) {
        // Perform the necessary actions to search for the product
    }

    @Then("I should see search results for {string}")
    public void verifySearchResults(String product) {
        // Perform the necessary assertions on the search results
    }
}

```

## Parameterize Step Data Table

### Using Scenario Outline

Using step data table we can parameterize an Scenario Outline Keyword with multiple values, making it easy and DRY.

1. Define a Scenario Outline with a Data Table.
2. Define the Data table in the Scenario Outline Keyword like:

```Gherkin
Scenario Outline: Add multiple numbers
  Given I have the following numbers:
    | Number |
    | 10     |
    | 20     |
    | 30     |
  When I press add
  Then the result should be <sum> on the screen

  Examples:
    | sum |
    | 60  |
```

3. Implement the step definitions

```java
import io.cucumber.java.DataTableType;
import io.cucumber.java.en.*;

import java.util.List;
import java.util.Map;

public class CalculatorSteps {
    private List<Integer> numbers;
    private int result;

    @DataTableType
    public Integer convertToInteger(String number) {
        return Integer.parseInt(number);
    }

    @Given("I have the following numbers:")
    public void setNumbers(List<Integer> numbers) {
        this.numbers = numbers;
    }

    @When("I press add")
    public void pressAdd() {
        result = 0;
        for (Integer number : numbers) {
            result += number;
        }
    }

    @Then("the result should be {int} on the screen")
    public void checkResult(int expected) {
        assertEquals(expected, result);
    }
}

```

### Scenario

```GHERKIN
Scenario: Add multiple numbers
  Given I have the following numbers:
    | Number |
    | 10     |
    | 20     |
    | 30     |
  When I press add
  Then the result should be 60 on the screen

```

```JAVA
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.*;

import java.util.List;
import java.util.Map;

public class CalculatorSteps {
    private List<Map<String, Integer>> numbers;
    private int result;

    @Given("I have the following numbers:")
    public void setNumbers(DataTable dataTable) {
        numbers = dataTable.asMaps(String.class, Integer.class);
    }

    @When("I press add")
    public void pressAdd() {
        result = 0;
        for (Map<String, Integer> row : numbers) {
            result += row.get("Number");
        }
    }

    @Then("the result should be {int} on the screen")
    public void checkResult(int expected) {
        assertEquals(expected, result);
    }
}
```

## Scenario vs Scenario Outline

The **Scenario** represents an specific test that describe only one single behavior. On the other hand we have **Scenario outline** is a template for a set of related scenarios so you can set a data table and use those values in your Scenario outlines Keywords executing multiple times.

## Data driven testing

Is an approach in software testing where test cases are designed to be executed with different sets of test data.

## Tags

We can execute specific scenarios adding tags to our test runner.

```java
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = "com.example.steps",
    tags = "@smoke or @regression or @performance", // It's going to execute @smoke scenarios or @regression or @performance you can also use and to include more tags to execute them
    plugin = {"pretty", "html:target/cucumber-reports"}
)
public class TestRunner {
}
```