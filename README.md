# dryguy 

* list of articles > bookmarking feature
* community section > bookmarking feature
* posting/replying feature > profile (no clue how to do this lol)

**global**
* daily drink limit
* active challenges?
* current streak

**per day**
* dry day

* total drink count
* drink types - drink counts
    * beer (0.6-1.6) [main difference is low-medium-high strength]
    * wine (1-1.6) [gov uses "restaurant" v "standard", also differentiates champagne]
    * spirit (1)
    * cocktail? [not listed, highly variable]
    * "standard" fallback
* triggers [checklist of items, what should it be?] (negative emotions, people, places, social situations, pain relief, boredom, media)

* reflection [done/not done]
    * emotion
    * reflection A [do we randomly serve a question?]
    * reflection B
    * reflection C?

tracking:
every date is a key, stored in local storage when someone updates it

key: `date`
value:
    drinks: 1 //number of drinks  
    triggers: {[10]} family, friends, work, occasions, routine, media, lonliness, stress, boredom, pain relief
    reflection: 1 //0 if it hasnt been done yet
    emotion: 5 //1-5 of the emotions
    responseA: ""
    responseB: ""
    responseC: ""
---

https://stackoverflow.com/questions/3138564/looping-through-localstorage-in-html5-and-javascript
can pull keys
we pull dates from the assignments