# HackathonDemoApp
This is a demo app built for your reference on how to use Zoom Developer Resources.

**Prerequisites:**
* [Zoom account](https://zoom.us) with Zoom for Developer Role.
* [Zoom Marketplace Account](https://marketplace.zoom.us/docs/guides)


### Workflow

1. Start a scheduled Zoom Meeting.
2. A "meeting.ended" event will be sent to your app's Endpoint Notification URL. 
3. After the Meeting ends, this demo App will fetch the count of participants who joined the meeting from the [Get Past Meetings API](https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/pastmeetingdetails).

### Steps to succesfully run the app locally: 
1. Schedule a Zoom Meeting.

3. Create a [JWT app](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-jwt-app) in the Zoom App Marketplace. Provide all the information required and your app credentials will be generated. In the features page,add a new [event subscription](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-jwt-app#features). <br><br>For the **Event notification endpoint URL**, use [local tunnel](https://github.com/localtunnel/localtunnel) or a similar service to generate a HTTP tunnel. In your terminal , run `npx localtunnel --port 8000` command in your terminal. Provide the generated url starting with "https" as your Event notification endpoint URL. Under Event Types, click on Meeting and subscribe to the "End Meeting" event. Save the subscription and click "Continue". Your JWT app will be activated in your account. From this app, you will need the generated **API Key**, **API Secret** and **Verification Token**. 


5. Clone this repository by running this git command in your terminal: `git clone https://github.com/ShrijanaCodes/UncubedDemoApp.git`
6. Install all the dependencies by running `npm install` command in your terminal.
7. Create a .env file and a gitignore file in your project by running this command in your terminal: `touch .env .gitignore`
8. Open the .env file in your editor and include the following variables and their values in this file:
```
APIKey='Provide Your Zoom API Key Generated in Step 2 Here'
APISecret='Provide Your Zoom API Secret Generated in Step 2 Here'
VerificationToken='Provide Your Zoom App Verification Token Generated in Step 2 Here'
```
9. Add the ".env" file to the ".gitignore" file either by using your editor or by running `echo ".env" >> .gitignore` command in your terminal. This way, you will minimize the risk of exposing your credentials as Git will ignore the .env file.

11. Start the app by running `node app.js` command in your terminal. 

12. Voila! Your app will be up and running on port 3000. While your app is running, start your Meeting and end it. Once the Meeting is ended, your app will print the number of participants who joined the meeting in your console.  

In this demo app, we have used Meeting Ended Event and List Past Meeting Details API. However, you can customize the workflow based on your needs by using any available Zoom APIs and Webhooks. 


 **Happy Coding** :innocent:	

