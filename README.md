--Readme document for *Haver Ho*, *haverh@uci.edu*, *54379591*--

-- Video Demo
    https://www.youtube.com/watch?v=d9sg_CgOvTw

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

15/15
- 5/5 Created a functional web app
- 2/2 The ability to control the web app with basic gestures
- 4/4 The ability to control the web app with at least two custom gestures
- 2/2 Following good principles of UI design
- 1/1 Creating a compelling app and application of gestures
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?  
    This project took around 20 hours.


3. What online resources did you consult when completing this assignment? (list specific URLs)  
    1 - Creating "more" button when element is overlflowing with text  
        https://stackoverflow.com/questions/44016882/typescript-detect-if-the-div-is-overflow-with-text  
    2 - MangaDex API  
        https://api.mangadex.org/docs/  
    3 - CSS Flexbox  
        https://css-tricks.com/snippets/css/a-guide-to-flexbox/  
    4 - CSS Grid  
        https://css-tricks.com/snippets/css/complete-guide-grid/  
    5 - Bootstrap navbar  
        https://getbootstrap.com/docs/4.0/components/navbar/  
    6 - *ngIf to dynamically load data  
        https://chat.openai.com/share/7f12f2a7-5862-4ba5-a9a7-9d697e3e53f7  
    7 - Reactively getting view port width in ts file  
        https://chat.openai.com/share/5ba7a1b4-2820-4e53-95a8-ff211cf8d54d
    

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?  
    I've consulted friends regarding layout sugestions/feedback and which info to display.


5. Is there anything special we need to know in order to run your code?  
    Since the API I am using is a free public API, there are limits to the usage.
    When testing for prev/next chapter navigation, beware that test might be temporarily
    banned when trying to access the API too many times too quickly.

--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?  
    I designed this app for users that enjoy reading japanese animation, aka manga.
    The expected user for this app range from mobile to desktop users using the browser.

7. Describe the two custom gestures you created.  
    The two gestures I created are "1 pointing hand, 1 open hand" and "1 pointing hand,
    1 closed hand". The functionality I chose for the first is to go to next chapter and
    the latter to go to previous chapter. The reason I chose "1 pointing hand, 1 open hand"
    for next chapter because its similar to other predefined gestures like "1 open" and "2 open".
    The "open hand" suggest moving forward, hence the functionalities are "scroll up, "zoom in", 
    and "next chapter". The same is true for "closed hand"

8. How does your app implement or follow principles of good UI design?  
    My app has a mixture of adaptive and reactive design and follows a mobile first design
    for browsers on mobile to desktop. Font and components are consistent, while also implementing
    visual cues to suggest elements are clickable.