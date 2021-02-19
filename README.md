## talent.io software homework

### Instructions

Hello there! Thank you for considering talent.io as your next company.
We would like to know more about your experience with programming and problem solving.
There are 4 independent parts to this assignment:

- Part 1: Tupples Sum *(Algorithmics)*
- Part 2: Common Searches *(Backend)*
- Part 3: Coloured Squares *(Frontend)*
- Part 4: Talent Advocate Ranking *(DataBase)*
- Part 5: Communication and English

**Complete part 1, part 2, part 5 and chose one between part 3 and part 4, depending on what you’re more comfortable working on.**

You can code the assignment in Ruby, Python, or JavaScript.
You can use any backend or frontend library that you deem useful.
Just so you know, our stack at talent.io is Ruby 2.6.x, Rails 5, Redis, Resque, PostgreSQL and React.js.

Tips:
 
-	Reach out to us if you have any question! We will be happy to clarify anything if needed.
-	Comment your code to let us know what choices you made and why.
-	Don’t be afraid to ask Google for help.
-	When you are done, please send us your solutions in a zip file.
-	We expect you to spend between 3h and 6h on this assignment, depending on the number of questions you choose to tackle and your level of experience.

### Part 1: Tupples sum *(Algorithmics)*

You are given an array of random integers, positive or negative.
The objective is to determine all couples of elements summing to a given number. You can use the same element twice. However, we don’t return multiple instances of the same couple if it is present more than once.
	
Example: In the array `[-5, 13, 4, 9, -1, 13]`, the couples summing to `8` are `(-5, 13)`, `(4, 4)`, and `(9, -1)`.

##### Question 1
Write a function that, given an array and an integer s, returns the set of couples summing to s. Give the average time-complexity and memory-complexity of your algorithm.

You can test your solution with `tupples_sum/unordered_integers.json` as input, for the sum `150000`, the output should be `unordered_couples.json`.

##### Question 2

Assuming that all the elements are all positive integers, and that the input array is sorted from smallest to largest, how can you optimize the solution?
Write such a function.

You can test your solution with `tupples_sum/ordered_integers.json` as input, for the sum `150000`, the output should be `tupples_sum/ordered_positive_couples.json`.

### Part 2: Common searches *(Backend)*

In order to help better understand the demand of our clients,
you are tasked with ranking combinations of position and technology,
by how often they were searched.

Each search contains the following fields:
  - `recruiter_id` *[Integer]* Which recruiter made the search
  - `company_id` *[Integer]* Which company the recruiters belongs to
  - `week` *[Integer]* Week during which the search was made
  - `technologies` *[Array<String>]* Which technologies the recruiter searched (1 or more)
  - `positions` *[Array<String>]* Which positions the recruiter searched (1 or more)
  - `count` *[Integer]* How many times that search was made during this week by that recruiter

A combination can only contain 1 position and 1 technology.

For a combination to appear in the ranking, it must have been searched at least 10 times.

The ranking that we want to output is an array of objects with the following properties:
  - `technology` *[String]*
  - `position` *[String]*
  - `count` *[Integer]* Total number of times the combination appeared in a search. Must be greater than 10
  - `nb_of_recruiters` *[Integer]* The number of distinct recruiters who searched for that combination
  - `nb_of_companies` *[Integer]* The number of distinct companies who searched for that combination
  - `rank` *[Integer]* Rank of the search in the ranking. Starts with 1. In case of equality of "count", assign the same rank

The ranking should be ordered by rank.
In case of equality, order records by alphabetical order on the technology, then position.


##### Question 1

Write a program that takes an array of searches as input, and returns the total ranking of searches

You can test your solution with `common_searches/searches.json` as input, the output should be `common_searches/total_ranking.json`.

##### Question 2

Write a program that takes an array of searches as input, and returns the ranking of searches by company

You can test your solution with `common_searches/searches.json` as input, the output should be `common_searches/ranking_by_company.json`.

##### Hint

Aim for the following:
  - Clear code
  - Tests
  - Reuse most of the work done in question 1. Avoid duplicating code between the 2 parts.

##### Example

Here is an example on a small set of searches, that you can use to test your program:

```json
// Searches (input)
[
  {
    "recruiter_id": 1,
    "company_id":   1,
    "week":         31,
    "technologies": ["ruby", "react"],
    "positions":    ["full_stack_dev"],
    "count":        3
  },
  {
    "recruiter_id": 1,
    "company_id":   1,
    "week":         32,
    "technologies": ["ruby", "react"],
    "positions":    ["full_stack_dev"],
    "count":        10
  },
  {
    "recruiter_id": 2,
    "company_id":   1,
    "week":         32,
    "technologies": ["ruby"],
    "positions":    ["backend_dev"],
    "count":        9
  },
  {
    "recruiter_id": 2,
    "company_id":   1,
    "week":         33,
    "technologies": ["ruby"],
    "positions":    ["full_stack_dev"],
    "count":        4
  },
  {
    "recruiter_id": 3,
    "company_id":   2,
    "week":         33,
    "technologies": ["angular"],
    "positions":    ["frontend_dev", "full_stack_dev"],
    "count":        15
  }
]
```

```json
// Expected total ranking
[
  {
    "technology":       "ruby",
    "position":         "full_stack",
    "count":            17,
    "nb_of_recruiters": 2,
    "nb_of_companies":  1,
    "rank":             1
  },
  {
    "technology":       "angular",
    "position":         "frontend_dev",
    "count":            15,
    "nb_of_recruiters": 1,
    "nb_of_companies":  1,
    "rank":             2
  },
  {
    "technology":       "angular",
    "position":         "full_stack_dev",
    "count":            15,
    "nb_of_recruiters": 1,
    "nb_of_companies":  1,
    "rank":             2
  },
  {
    "technology":       "react",
    "position":         "full_stack_dev",
    "count":            13,
    "nb_of_recruiters": 1,
    "nb_of_companies":  1,
    "rank":             4
  }
]
```

```json
// Expected ranking by company
[
  {
    "company_id": 1,
    "ranking": [
      {
        "technology":       "ruby",
        "position":         "full_stack_dev",
        "count":            17,
        "nb_of_recruiters": 2,
        "rank":             1
      },
      {
        "technology":       "react",
        "position":         "full_stack_dev",
        "count":            13,
        "nb_of_recruiters": 1,
        "rank":             2
      }
    ]
  },
  {
    "company_id": 2,
    "ranking": [
      {
        "technology":       "angular",
        "position":         "frontend_dev",
        "count":            15,
        "nb_of_recruiters": 1,
        "rank":             1
      },
      {
        "technology":       "angular",
        "position":         "full_stack_dev",
        "count":            15,
        "nb_of_recruiters": 1,
        "rank":             1
      },
    ]
  }
]
```

### Part 3: Coloured Squares *(Frontend)*

Create a basic web page where each of the 4 corners of the screen displays a coloured button (You pick the color for each corner!).

Next, create a display of 10 squares in the center of the page. When one of the 4 corner buttons is clicked, it automatically updates this list of 10 squares. The center squares always display the last 10 colours that were clicked. 

On page refresh, the list is not emptied.

You can use any UI library such as React, Redux, jQuery, or use vanilla Javascript.

### Part 4: Talent Advocate Ranking *(DataBase)*

You are given a PostgreSQL database with the following tables:

`talent_advocates`
-	`id` *[Bigint]*
-	`name` *[String]*

`candidates`
-	`id` *[Bigint]*
-	`name` *[String]*
-	`talent_advocate_id` *[Bigint]*, foreign key for talent_advocates

`job_offers`
-	`id` *[Bigint]*
-	`candidate_id` *[Bigint]*, foreign key for candidates

Write a query that returns the leaderboard of Talent Advocates on the count of offers for their candidates,
i.e. a table with the following information:

```
talent_advocate_id  talent_advocate_name  nb_offers  rank

42                  John Doe              764        1
12                  Jane Washington       700        2
659                 Bob Dylan             700        2
87645               Roger Federer         345        4
...                 ...                   ...        ...
13                  Donald Trump          0          23
```

Note that:
-	The table is sorted by decreasing number of offers.
-	Talent Advocates can share the same score. If that's the case, they share the same rank.
- We want Talent Advocates with 0 job offers to appear in the ranking.


### Part 5: Communication and English

At talent.io, the language we work with is English so we are looking for teammates able to communicate in that language.
Can you answer the following in about 100-150 words:

Talk about the last bug that you had to solve.