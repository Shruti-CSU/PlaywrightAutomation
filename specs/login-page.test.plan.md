# Login Page Test Plan

## Application Overview

This is a comprehensive test plan for the Rahul Shetty Academy login page practice application. The login page contains username and password fields, role selection (Admin/User), profession dropdown, terms and conditions checkbox, and a Sign In button. The test plan covers happy path scenarios, validation tests, edge cases, UI interactions, and error handling to ensure robust quality assurance of the login functionality.

## Test Scenarios

### 1. Happy Path - Valid Login Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with Admin role and Student profession

**File:** `tests/LoginPage/happy-path.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed with all form elements visible
  2. Enter username 'rahulshettyacademy' in the Username field
    - expect: Username is entered correctly in the field
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered and masked in the field
  4. Verify that 'Admin' radio button is selected by default
    - expect: Admin radio button is checked
  5. Verify that 'Student' is selected in the profession dropdown
    - expect: Student option is selected in the dropdown
  6. Check the 'I Agree to the terms and conditions' checkbox
    - expect: Checkbox is marked/checked
  7. Click the 'Sign In' button
    - expect: Login is successful and user is redirected to dashboard or homepage

#### 1.2. Successful login with User role and Teacher profession

**File:** `tests/LoginPage/happy-path.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'rahulshettyacademy' in the Username field
    - expect: Username is entered correctly
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered and masked
  4. Click the 'User' radio button to change role selection
    - expect: User radio button is now selected (Admin is deselected)
  5. Click the profession dropdown and select 'Teacher'
    - expect: Teacher option is now selected in the dropdown
  6. Check the 'I Agree to the terms and conditions' checkbox
    - expect: Checkbox is marked
  7. Click the 'Sign In' button
    - expect: Login is successful and user is redirected appropriately

#### 1.3. Successful login with Admin role and Consultant profession

**File:** `tests/LoginPage/happy-path.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'rahulshettyacademy' in the Username field
    - expect: Username is entered
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered and masked
  4. Verify Admin role is selected
    - expect: Admin radio button is checked
  5. Click the profession dropdown and select 'Consultant'
    - expect: Consultant option is now selected
  6. Check the 'I Agree to the terms and conditions' checkbox
    - expect: Checkbox is marked
  7. Click the 'Sign In' button
    - expect: Login is successful

### 2. Validation Tests - Required Field Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Username field is required

**File:** `tests/LoginPage/validation.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Leave the Username field empty
    - expect: Username field is empty
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: An error message is displayed indicating username is required, OR Sign In button is disabled, OR page shows validation error

#### 2.2. Password field is required

**File:** `tests/LoginPage/validation.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'rahulshettyacademy' in the Username field
    - expect: Username is entered
  3. Leave the Password field empty
    - expect: Password field is empty
  4. Check the terms checkbox and click Sign In button
    - expect: An error message is displayed indicating password is required, OR Sign In button is disabled, OR page shows validation error

#### 2.3. Terms and conditions checkbox must be checked before login

**File:** `tests/LoginPage/validation.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'rahulshettyacademy' in the Username field
    - expect: Username is entered
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Do NOT check the 'I Agree to the terms and conditions' checkbox
    - expect: Checkbox remains unchecked
  5. Click the 'Sign In' button
    - expect: Login is prevented and an error or notification appears, OR Sign In button remains disabled until checkbox is checked

### 3. UI Interaction Tests - Controls and Elements

**Seed:** `tests/seed.spec.ts`

#### 3.1. Radio button selection - Toggle between Admin and User roles

**File:** `tests/LoginPage/ui-interactions.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed with Admin radio button selected
  2. Click on the 'User' radio button
    - expect: User radio button becomes selected and Admin becomes deselected
  3. Click on the 'Admin' radio button
    - expect: Admin radio button becomes selected and User becomes deselected
  4. Verify only one role can be selected at a time
    - expect: Only one radio button is selected at any point

#### 3.2. Profession dropdown - All options are selectable

**File:** `tests/LoginPage/ui-interactions.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed with Student selected by default
  2. Click the profession dropdown
    - expect: Dropdown expands showing all available options: Student, Teacher, Consultant
  3. Select 'Student' from the dropdown
    - expect: Student option is selected in the dropdown
  4. Click the dropdown again and select 'Teacher'
    - expect: Teacher option is now selected, dropdown displays 'Teacher'
  5. Click the dropdown again and select 'Consultant'
    - expect: Consultant option is now selected, dropdown displays 'Consultant'

#### 3.3. Terms checkbox can be checked and unchecked

**File:** `tests/LoginPage/ui-interactions.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed with checkbox unchecked
  2. Click on the 'I Agree to the terms and conditions' checkbox
    - expect: Checkbox is now checked/marked
  3. Click on the checkbox again
    - expect: Checkbox is now unchecked
  4. Click on the linked text 'terms and conditions' in the checkbox label
    - expect: Link is clickable (or remains as visual component), checkbox state remains independent

#### 3.4. Terms and conditions link navigation

**File:** `tests/LoginPage/ui-interactions.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Click on the 'terms and conditions' link
    - expect: Link is navigable and either opens a new page/modal with terms content or navigates to a terms page, or performs expected action

### 4. Edge Cases and Boundary Tests

**Seed:** `tests/seed.spec.ts`

#### 4.1. Login with case-sensitive credentials

**File:** `tests/LoginPage/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'RAHULSHETTYACADEMY' (uppercase) in the Username field
    - expect: Username is entered as uppercase
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: Login fails with error message, OR Login succeeds if system is case-insensitive

#### 4.2. Login with very long username

**File:** `tests/LoginPage/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter a very long username (100+ characters) in the Username field
    - expect: Username field either accepts all characters, enforces max length, or shows a validation message
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: System handles the long input gracefully without breaking

#### 4.3. Login with special characters in username

**File:** `tests/LoginPage/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'rahulshettyacademy!@#$%' with special characters
    - expect: Special characters are accepted in the input field
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: Login fails with appropriate error message

#### 4.4. Login with spaces in username

**File:** `tests/LoginPage/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'rahul shettyacademy' with spaces
    - expect: Spaces are entered in the username field
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: Login fails since spaces make it invalid

#### 4.5. Login with leading and trailing whitespace in credentials

**File:** `tests/LoginPage/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username ' rahulshettyacademy ' (with leading and trailing spaces)
    - expect: Spaces are entered in the username field
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: System either trims whitespace and logs in, or rejects the login

### 5. Negative Tests - Invalid Credentials

**Seed:** `tests/seed.spec.ts`

#### 5.1. Login with invalid username and valid password

**File:** `tests/LoginPage/negative-tests.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'invaliduser' in the Username field
    - expect: Username is entered
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: Login fails with error message such as 'Invalid username' or 'Username not found'

#### 5.2. Login with valid username and invalid password

**File:** `tests/LoginPage/negative-tests.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'rahulshettyacademy' in the Username field
    - expect: Username is entered
  3. Enter password 'wrongpassword123' in the Password field
    - expect: Password is entered and masked
  4. Check the terms checkbox and click Sign In button
    - expect: Login fails with error message such as 'Invalid password' or 'Incorrect credentials'

#### 5.3. Login with both invalid username and password

**File:** `tests/LoginPage/negative-tests.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter username 'nonexistentuser' in the Username field
    - expect: Username is entered
  3. Enter password 'incorrectpassword' in the Password field
    - expect: Password is entered and masked
  4. Check the terms checkbox and click Sign In button
    - expect: Login fails with appropriate error message

#### 5.4. Verify password is not displayed as plain text

**File:** `tests/LoginPage/negative-tests.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Click on the Password field and examine it
    - expect: Password field is of type 'password', not 'text'
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password characters are masked/hidden with dots or asterisks

### 6. Security Tests

**Seed:** `tests/seed.spec.ts`

#### 6.1. SQL Injection attempt in username field

**File:** `tests/LoginPage/security-tests.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter SQL injection payload in username: ' OR '1'='1
    - expect: Payload is accepted in the field
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: Login is rejected and SQL injection is prevented, system shows error message

#### 6.2. XSS attempt in username field

**File:** `tests/LoginPage/security-tests.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page is displayed
  2. Enter XSS payload in username: <script>alert('XSS')</script>
    - expect: Payload is accepted in the field
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered
  4. Check the terms checkbox and click Sign In button
    - expect: No JavaScript alert is executed, XSS is prevented, login fails normally

#### 6.3. Browser back button after logout maintains security

**File:** `tests/LoginPage/security-tests.spec.ts`

**Steps:**
  1. Complete a successful login with valid credentials
    - expect: User is logged in and on the dashboard/home page
  2. Logout from the application
    - expect: User is redirected to login page or logout confirmation page
  3. Click the browser back button
    - expect: Browser does not return to the authenticated page, or requires re-authentication
