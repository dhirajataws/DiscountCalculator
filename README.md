## Problem Description: 
Creating a feature attached to billing process to calculate the discounts at runtime.

## Given:
Scenario of few discount definitions. Requirement states that flexibility to
add or change discount definition is one sought after feature.

## Problem analysis:
The problem seems to have two parts:

Storing the discount rules: It involves a way to define rules outside of code
which can be configured. A simple UI can be build to change or add rules in the system.

Applying the rules: The rules exists independent of products and order and thus needs
to be matched to correct order item. It came as an observation that the application of 
rule changes when order items in order change. For ex, if a discount is like
30% for 3 item, 20% for 2 item and 10% for 1 item, then the discount should be applied
which best matched the quantity purchased.

## Solution:
#### Modelling discount rules:
After searching google to get an idea of what billing and discounts looks like,
it is realised that a Model around storing discount rules is required. The rule should be 
parsed and thus a parser is required to understand rule. The Model can be stored in database
and decouples from the discount calculation engine.

### A rule can be modelled as below parts:
Header information: storing values like name, description, priority and active flag

Condition: Condition that must be met to trigger the action

Actions: Defines what should happen: Each action describes something that should happen 
when the rule is run

#### Applying the rules:
To realise a real life system that is calculate discount as the items are added
and removed from order, a discount calculator engine is proposed. The order list 
which is an array will dynamically change as orders are added and discounts 
calculated as orders added. The system looked complex but was greatly simplified
when a tree model was established around the data structure of order list.
The idea is :
Attach a rule to each order item if it is applicable and then apply the rule specified
as action into the rule. The list items in order is modelled as a tree of discount eligible
items and no discount eligible item. The makeTree function is expected to put order items on 
left nodes and others on right leaf node.

The use of memotization pattarn seems useful in storing previous items in order.

The use of recursive function expected to do performance better.
 
### Alternative Design Option:
1. A function is written to every type of a discount rule. An Alternative, solution
would be to develop a design language to define an rule and write a common
engine which can understand that design language. 

2. The rules can be applied all at once after the order is finished entering into
system. This will perform better because the discount is not calculated every time 
for a order item. It depends if it is a back ground processing engine then it can be
a good option to implement

### Environment:
Tested on node version 8.10.0

### Assumptions: 
1. The actual product will store data for discount and products into some persistant
system. Data is assumed to be stored in .json file.
2. SKU of product is unique and so can be used as a primary
3. CLI and UI are out of scope. Functions are tested using unit testing.
4. quantity is taken as the measure to apply rule but it can have others as well like
   date of expiry etc.

### Future enhancement:
1. New types of conditions with functions/parser attached can be written.
2. It appears that there is a tight coupling between data ie. function name in 
rules.json. It can be de coupled though with establishing some convention. 

