# dryguy 
* Dry Guy is an app targeted towards older men to give them the tools to cut their drinking
* Prototype produced with HTML/CSS/JS stack

## notes
- progress is under development...

## Software Requirements
- Dry Guy works best on Android phones, using Android verion 10 or later.
- Can be used on Apple phones, however some visual elements may be lost or deteriorated
- To view on desktops, open the link in Chrome & follow the instructions here - https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome

## Known Issues
Community page
- New posts & replies from the user are not saved anywhere so disapear when reloading or switching pages
- Cannot unsave posts when in the 'Saved' tab
- When replying to a post it will also create a blank post in the 'User Feed'

Progress
- Arrows to change week/month/year don't do anything in 'Overview'
- Arrows to change month don't do anything in 'Calendar'

Profile
- Cannot hide replies after openning them

## data

```
key: `date`
value:
    track: 0 (-1 if nothing, 0 if under, 1 if over)
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
