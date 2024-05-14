# Project Documentation

Julius Valentin Burlet

| Date       | Version | Summary                                                                                                                                 |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 20.02.2024 | 0.0.1   | Created the api repository and the ASP.Net project.                                                                                     |
| 22.02.2024 | 0.0.2   | Added the class "Group".                                                                                                                |
| 01.03.2024 | 0.0.3   | Added all models and the datacontext.                                                                                                   |
| 02.03.2024 | 0.0.4   | Added the logic to datacontext, added controllers and made some changes in the models.                                                  |
| 02.03.2024 | 0.1.0   | Made the first few migrations and did some small changes. Also activated MARS                                                           |
| 04.03.2024 | 0.1.1   | Did some changes to the challenges controller and users controller. Also added the UserDTO                                              |
| 08.03.2024 | 0.2.0   | Added the auth and token logic into the API                                                                                             |
| 08.03.2024 | 0.2.1   | Added some logic for the transportation and challanges                                                                                  |
| 17.03.2024 | 0.3.0   | Added the logic for assigning a challenge.                                                                                              |
| 19.03.2024 | 0.3.1   | Added the function to succeed a challenge                                                                                               |
| 19.03.2024 | 0.3.2   | Created the repository for the website.                                                                                                 |
| 19.03.2024 | 0.3.3   | Did some minor changes and added the veto logic also changed the DB structure a bit on User and CORS                                    |
| 21.03.2024 | 0.3.4   | Added items into the API also finished the main logic for the API.                                                                      |
| 21.03.2024 | 0.4.0   | Made a complete structural change on the frontend.                                                                                      |
| 22.03.2024 | 0.4.1   | Added some fetches in the frontend.                                                                                                     |
| 23.03.2024 | 0.4.2   | Added some functions that you can't buy items while doing a challenge. Frontend I added some button color and functions for challenges. |
| 25.03.2024 | 1.0.0   | Website functions finished. And API 1.0                                                                                                 |
| 25.03.2024 | 1.1.0   | Design update.                                                                                                                          |
| 05.04.2024 | 1.1.1   | Just some changes                                                                                                                       |
| 03.05.2024 | 1.2.0   | Changed display time to UTC+2 and did some documentation.                                                                               |

## 1 Inform

### 1.1 Your Project

This is the infrastructure to play a huge game of tag like the people on "[Jet Lag: The Game](https://www.youtube.com/@jetlagthegame)" did, in this you can pull challenges, manage your coins, penalty time and transportations.  [Youtube link to an episode of the game.](https://www.youtube.com/watch?v=q2tJqO6nCSc) 

### 1.2 User Stories

| US-№ | Commitment | Type | Description                                                                                                                                                        |
| ---- | ---------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Must       | F    | As a user, I want that I can register and my logindata is getting stored safely.                                                                                   |
| 2    | Must       | F    | As a user I want to be able to log into my registered account.                                                                                                     |
| 3    | Must       | F    | As a user I want to be able to logout of my account.                                                                                                               |
| 4    | Must       | F    | As a user I want to be able to pull a random challenge to earn currency.                                                                                           |
| 5    | Must       | F    | As a user I want to be able to succeed the challenge and get the reward.                                                                                           |
| 6    | Must       | F    | As a user I want to be able to fail a challenge / veto it, and get a 30 minute penalty.                                                                            |
| 7    | Must       | F    | As a user I don't want to be able to pull a challenge twice.                                                                                                       |
| 8    | Must       | F    | As a user I want to be able to buy a transportation method with the amount of minutes I'm in the transportation as input.                                          |
| 9    | Must       | F    | As a user i want to be able to buy a chosen item for the given price.                                                                                              |
| 10   | Must       | F    | As a user I don't want to be able to do anything on the site when I have a penalty ongoing.                                                                        |
| 11   | Must       | F    | As a user I want to be able to press on the different Nav buttons and get to the corresponding site. For example if I press Challenges I see my current challenge. |
| 20   | Must       | Q    | As I user I want to have a website which isn't straining my eyes because of crazy colors.                                                                          |
| 21   | Can        | Q    | As a user I want that all the possible transportationmethods with their fee / minute are displayed in a table.                                                     |
| 22   | Can        | Q    | As a user I want that all the possible items are displayed in a table with their name, description and price                                                       |
| 23   | Can        | Q    | As a user I want to see what my username is and if I have a multiplier active when I press on Profile.                                                             |
| 24   | Can        | Q    | As a user I always want to see my balance and when my penalty ends on the top left corner.                                                                         |
| 25   | Must       | Q    | As a user I want to be able to read the rules on the home screen.                                                                                                  |

### 1.3 Test Cases

| TC-№ | Initial State                                            | Input                                                                                            | Expected Output                                                                                                    |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| 1.1  | No user registered                                       | User attempts to register with a unique username and valid credentials                           | User is successfully registered and login data is stored securely                                                  |
| 1.2  | No user registered                                       | User attempts to register with a username that is already in use                                 | Registration fails and user is prompted to choose a different username                                             |
| 1.3  | No user registered                                       | User attempts to register with invalid credentials (e.g., incomplete information, weak password) | Registration fails and appropriate error message is displayed                                                      |
| 1.4  | User already registered                                  | User attempts to login with correct username and password                                        | User successfully logs in                                                                                          |
| 1.5  | User already registered                                  | User attempts to login with incorrect password                                                   | Login fails and user is prompted to enter correct credentials                                                      |
| 1.6  | User already registered                                  | User attempts to login with a username that is not registered                                    | Login fails and user is notified that the username is not found                                                    |
| 1.7  | User already registered                                  | User attempts to reset password                                                                  | User receives password reset instructions if the username is valid                                                 |
| 1.8  | User already registered                                  | User attempts to reset password with a username that is not registered                           | Password reset fails and user is notified that the username is not found                                           |
| 2.1  | User registered with valid credentials                   | User enters correct username and password                                                        | User successfully logs into their account                                                                          |
| 2.2  | User registered with valid credentials                   | User enters incorrect password                                                                   | Login fails and user is prompted with a generic error message                                                      |
| 2.3  | User registered with valid credentials                   | User enters incorrect username                                                                   | Login fails and user is prompted with a generic error message                                                      |
| 2.4  | No user registered                                       | User attempts to login                                                                           | Login fails and user is prompted with a generic error message                                                      |
| 2.5  | User logged in                                           | User clicks on "logout" button                                                                   | User is logged out of the account                                                                                  |
| 2.6  | User logged out                                          | User navigates to a restricted page                                                              | User is redirected to the login page                                                                               |
| 3.1  | User logged in                                           | User clicks on "logout" button                                                                   | User is successfully logged out of their account and redirected to the login page                                  |
| 3.3  | User logged in on multiple devices                       | User logs out from one device                                                                    | User remains logged in on other devices until manually logged out                                                  |
| 4.1  | User logged in                                           | User selects "Pull Challenge" option                                                             | A random challenge is presented to the user                                                                        |
| 4.2  | User presented with a challenge                          | User completes the challenge successfully                                                        | User earns currency as a reward                                                                                    |
| 4.3  | User presented with a challenge                          | User fails to complete the challenge                                                             | User does not earn currency                                                                                        |
| 6.1  | User presented with a challenge                          | User chooses to fail or veto the challenge                                                       | User incurs a 30-minute penalty                                                                                    |
| 7.1  | User has already pulled a challenge                      | User attempts to pull another challenge                                                          | User receives a message indicating they cannot pull another challenge until the current one is completed or vetoed |
| 8.1  | User logged in                                           | User selects "Buy Transportation Method" option                                                  | User is prompted to enter the amount of minutes they were in transportation                                        |
| 8.2  | User enters valid amount of minutes                      | User confirms purchase                                                                           | User successfully buys the transportation method and the corresponding minutes are deducted from their account     |
| 8.3  | User enters invalid amount of minutes (negative or zero) | User confirms purchase                                                                           | Purchase fails and user is prompted to enter a valid amount of minutes                                             |
| 8.4  | User logged out                                          | User attempts to buy a transportation method                                                     | User is prompted to log in before making the purchase                                                              |
| 9.1  | User logged in                                           | User selects the desired item to purchase                                                        | User is prompted to confirm the purchase                                                                           |
| 9.2  | User confirms purchase                                   | Sufficient funds in the user's account                                                           | User successfully purchases the item and the corresponding amount is deducted from their account                   |
| 9.3  | User confirms purchase                                   | Insufficient funds in the user's account                                                         | Purchase fails, and the user is prompted to add funds or choose another item                                       |
| 9.4  | User logged out                                          | User attempts to buy an item                                                                     | User is prompted to log in before making the purchase                                                              |
| 10.1 | User has an ongoing penalty                              | User attempts to buy an item                                                                     | Buying items is disabled, and user is notified of the penalty                                                      |
| 10.2 | User has an ongoing penalty                              | User attempts to pull a challenge                                                                | Pulling challenges is disabled, and user is notified of the penalty                                                |
| 10.3 | User has an ongoing penalty                              | User attempts to access other site features                                                      | User can access all other site features except buying items and pulling challenges, and is notified of the penalty |
| 10.4 | User completes penalty duration                          | Penalty duration expires                                                                         | User regains access to all site features, including buying items and pulling challenges                            |

| 11.1 | User logged in | User clicks on "Home" button in the navigation           | User is navigated to the home page                                                             |
| ---- | -------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 11.2 | User logged in | User clicks on "Challenges" button in the navigation     | User is navigated to the challenges page where they can view their current challenge           |
| 11.3 | User logged in | User clicks on "Transportation" button in the navigation | User is navigated to the transportation page                                                   |
| 11.4 | User logged in | User clicks on "Items" button in the navigation          | User is navigated to the items page where they can view and manage their items                 |
| 11.5 | User logged in | User clicks on "Profile" button in the navigation        | User is navigated to their profile page where they can view and edit their profile information |



## 2 Plan

| AP-№ | Deadline   | Responsible      | Description                                                                                                  | Planned Time |
| ---- | ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------ | ------------ |
| 1.A  | 02.03.2024 | Julius V. Burlet | Design the registration form and implement input validation                                                  | 45'          |
| 1.B  | 09.03.2024 | Julius V. Burlet | Implement secure storage for login data using encryption                                                     | 60'          |
| 2.A  | 16.03.2024 | Julius V. Burlet | Design the login form and implement user authentication                                                      | 45'          |
| 2.B  | 23.03.2024 | Julius V. Burlet | Implement session management for logged-in users                                                             | 60'          |
| 3.A  | 30.03.2024 | Julius V. Burlet | Design the logout functionality and ensure proper session termination                                        | 30'          |
| 4.A  | 06.04.2024 | Julius V. Burlet | Implement the random challenge generator                                                                     | 60'          |
| 4.B  | 12.04.2024 | Julius V. Burlet | Display the random challenge to the user                                                                     | 45'          |
| 5.A  | 19.04.2024 | Julius V. Burlet | Implement challenge completion logic and reward allocation                                                   | 60'          |
| 6.A  | 26.04.2024 | Julius V. Burlet | Implement challenge failure logic and 30-minute penalty                                                      | 45'          |
| 7.A  | 03.05.2024 | Julius V. Burlet | Ensure unique challenge generation to prevent duplicate pulls                                                | 45'          |
| 8.A  | 03.05.2024 | Julius V. Burlet | Design the transportation method purchase form                                                               | 45'          |
| 8.B  | 03.05.2024 | Julius V. Burlet | Implement logic for calculating transportation fees based on minutes                                         | 60'          |
| 9.A  | 03.05.2024 | Julius V. Burlet | Design the item purchase form                                                                                | 45'          |
| 9.B  | 03.05.2024 | Julius V. Burlet | Implement item purchase logic and price deduction                                                            | 45'          |
| 10.A | 03.05.2024 | Julius V. Burlet | Implement penalty check to restrict buying and pulling challenges                                            | 45'          |
| 11.A | 03.05.2024 | Julius V. Burlet | Implement navigation button functionality for "Home", "Challenges", "Transportation", "Items", and "Profile" | 60'          |

## 3 Decide

I decided to implement secure user registration and login, allowing 
users to manage their accounts efficiently. The system will feature a 
challenges module where users can pull, complete, or fail challenges, 
with penalties restricting certain actions. Additionally, I will ensure 
the website has an eye-friendly design and clear navigation, with 
essential user information displayed prominently.

## 4 Realize



| AP-No | Date       | Responsible      | Planned Time | Actual Time |
| ----- | ---------- | ---------------- | ------------ | ----------- |
| 1.A   | 02.03.2024 | Julius V. Burlet | 45'          | 50'         |
| 1.B   | 08.03.2024 | Julius V. Burlet | 60'          | 80'         |
| 2.A   | 17.03.2024 | Julius V. Burlet | 45'          | 110'        |
| 2.B   | 23.03.2024 | Julius V. Burlet | 60'          | 60'         |
| 3.A   | 25.03.2024 | Julius V. Burlet | 30'          | 40'         |
| 4.A   | 25.03.2024 | Julius V. Burlet | 60'          | 70'         |
| 4.B   | 25.03.2024 | Julius V. Burlet | 45'          | 90'         |
| 5.A   | 19.03.2024 | Julius V. Burlet | 60'          | 100'        |
| 6.A   |            | Julius V. Burlet | 45'          | 30'         |
| 7.A   | 03.05.2024 | Julius V. Burlet | 45'          | 120'        |
| 8.A   | 25.03.2024 | Julius V. Burlet | 45'          | 50'         |
| 8.B   | 25.03.2024 | Julius V. Burlet | 60'          | 70'         |
| 9.A   | 25.03.2024 | Julius V. Burlet | 45'          | 60'         |
| 9.B   | 25.03.2024 | Julius V. Burlet | 45'          | 110'        |
| 10.A  | 23.03.2024 | Julius V. Burlet | 45'          | 80'         |
| 11.A  | 25.03.2024 | Julius V. Burlet | 60'          | 40'         |

## 

## 5 Control

| TC-№ | Date | Result | Tester |
| ---- | ---- | ------ | ------ |
| 1.1  |      |        |        |
| ...  |      |        |        |

✍️ Don't forget to add a conclusion that puts the test result into context.

## 6 Evaluate

✍️ Add a link to your learning report here.
