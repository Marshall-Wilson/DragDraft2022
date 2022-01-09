# Drag Draft 2022
**Code by:** [Marshall Wilson](marshallwilson.info)
**Design by:** [Sophia Richardson](http://sophia-richardson.com)

### About
This app was created to host a friendly draft of the RPDR season 14 queens.
Each player creates a team of their top 5 queens and receives points based on 
those queens' accomplishments during the season. 


For more information, see http://marshallwilson.info/dragdraft

### Technical Details
**Lanuages:** 
JavaScript, HTML, CSS
**Tech Stack:** 
Postgresql, Express.js, React.js, Node.js
**Development:** 
I developed this project using the PERN stack and hosted it on Heroku in
order to get it up and running in time for the beginning of the new RPDR season.
It was a fun project to work on and definitely my cleanest and quickest full-stack
project to date, thanks in no small part to the figma panels provided by Sophia Richardson. 
**Development Issues:** 
This app came together fairly painlessly, although I spent longer than I'm proud
to say debugging an issue where the sign-up and admin forms functioned perfectly
on Firefox and not at all on any other browser. I eventually figured out that 
I was using a method to deep copy the component's state that is currently only
supported on Firefox. 


**To Run:**
Development Mode: 
>In a local postgres instance, create a database and tables using the code in database.sql
>Create a .env file with your values for PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, and PG_DATABASE
>In the root folder and the client folder, run *npm install*
>Run *npm start* in the root folder to start the api
>In a seperate terminal, run *npm start* in the client folder to start the front end client
 