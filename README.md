# dryguy 
* Dry Guy is an app targeted towards older men to give them the tools to cut their drinking
* Prototype produced with HTML/CSS/JS stack

## notes
- progress is under development...

## data

```
key: `date`
value:
    drinks: 0 (current Drink Count)
    triggers: {[10]} (1 if specific trigger, 0 if not)
    reflection: 0 (1 if complete, 0 if not)
    emotion: 5 (1-5 represents emotion)
    responseA: ""
    responseB: ""
    responseC: ""
```
`localStorage.setObject("data", { name: "Ricky", 'dryDays': [0, 0, 1, 0, 1, 0, 0], 'dailyLimit': 2, 'majorGoal': 3, 'minorGoals': [1, 1, 1, 1, 0, 0, 0, 0] });`

```
key: `data`
value:
    name: "" 
    dryDays: [7] (1 if dryDay, 0 if not)
    dailyLimit: 0 
    majorGoal: 0 (1-5 represents goal (i think))
    minorGoals: [9] (1 if goal, 0 if not)
```
`localStorage.setObject("data", { name: "", 'dryDays': [0, 0, 0, 0, 0, 0, 0], 'dailyLimit': 0, 'majorGoal': 0, 'minorGoals': [0, 0, 0, 0, 0, 0, 0, 0] });`