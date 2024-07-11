# React + TypeScript + Vite
## Prerequisites
Have node & git installed on your workstation


## Installation
Enter the following commands in a terminal:
- git clone git@github.com:usualpro/caddy.git && cd caddy && npm i && npm run dev 
- go to the url indicated by the terminal

# Forward to the Past
The Back to the Future production team would like to bring its saga up to date with an unstoppable marketing technique:

Go back in time to 2000! And make a super-smart deal with a DVD retailer (we hope you still remember what that is...) with a killer promo:

A DVD of one part of the saga is worth 15 €.

For the purchase of 2 DIFFERENT parts of the saga, we apply a 10% discount to all "Back to the Future" DVDs purchased.

For the purchase of 3 DIFFERENT parts of the saga, we apply a 20% discount on all "Back to the Future" DVDs purchased.

The DVD store also sells other films, each costing €20.

The production team asks you to write a program with the following behavior:

As input, a text basket, separated by line breaks, containing the names of the films purchased.

Output: the number representing the price.

You're free to show the result in any way you like, and it can remain very minimalist, as long as it's clear that the program knows how to read the input format and follows the specified rules

However, as indicated at the beginning of the statement, this code should be treated as if you were initiating it for your future team.

You'll be able to choose the language that seems most relevant to you (in which you're comfortable, the better), and which should be able to run on a JVM or Python (in the general case) or JS/TS (if you're a front end or full stack specialist candidate).

You'll also want to make sure that the delivered project allows someone with the right SDK to launch, use and maintain your program with ease.
In short, the code must be of very high quality.

When you come for your interview, please bring your code with you on your PC (so that you can have something you can work with).

## Some examples of inputs and outputs
### Example n°1
#### input :

Back to the Future 1

Back to the Future 2

Back to the Future 3

#### Output :

36

### Example n°2

#### input :

Back to the Future 1

Back to the Future 3

#### Output :

27

### Example n°3 :

#### Input :

Back to the Future 1

#### Output :

15

### Example n°4 :

#### Input :

Back to the Future 1

Back to the Future 2

Back to the Future 3

Back to the Future 2

#### Output :

48

Explication :

((15*4)*0.8) = 48

### Example n°5

#### Input :

Back to the Future 1

Back to the Future 2

Back to the Future 3

La chèvre

#### Output :

56

Explanation :

((15*3)*0.8)+20 = 56

