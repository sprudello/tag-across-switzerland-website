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

✍️ Explain in more detail in 50 to 100 words what exactly you want to achieve in this project, and what you hope to learn from it.

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

| TC-№ | Initial State | Input | Expected Output |
| ---- | ------------- | ----- | --------------- |
| 1.1  |               |       |                 |
| ...  |               |       |                 |

✍️ The number has the format `N.m`, where `N` is the number of the user story that the test case covers, and `m` is counted up from `1`. Example: The third test case covering the second user story would have the number `2.3`.

### 1.4 Diagrams

✍️ Insert a use case diagram with at least 3 use cases here; and a sketch of what your website should look like.

## 2 Plan

| AP-№ | Deadline | Responsible | Description | Planned Time |
| ---- | -------- | ----------- | ----------- | ------------ |
| 1.A  |          |             |             |              |
| ...  |          |             |             |              |

Total:

✍️ The number has the format `N.m`, where `N` is the number of the user story to which the work package relates, and `m` is alphabetized from `A` upwards. Example: The third work package related to the second user story would have the number `2.C`.

✍️ A work package should take about 45 minutes for one person. The total number of work packages should be approximately: `Number of R-Sessions` × `Number of Group Members` × `4`. If you are working in a group of three on a project with two planned R-Sessions, you should have `2` × `3` × `4` = `24` work packages. If you find that you do not have enough work packages here, think of additional "Can" user stories for Chapter 1.2.

## 3 Decide

✍️ Document your decisions and assumptions here regarding your user stories and the implementation.

## 4 Realize

| AP-№ | Date | Responsible | Planned Time | Actual Time |
| ---- | ---- | ----------- | ------------ | ----------- |
| 1.A  |      |             |              |             |
| ...  |      |             |              |             |

✍️ Every time you complete a work package, record here how long you actually spent on it.

## 

## 5 Control

| TC-№ | Date | Result | Tester |
| ---- | ---- | ------ | ------ |
| 1.1  |      |        |        |
| ...  |      |        |        |

✍️ Don't forget to add a conclusion that puts the test result into context.

## 6 Evaluate

✍️ Add a link to your learning report here.
