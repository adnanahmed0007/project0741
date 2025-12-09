Smart Lead Automation System

This is a small full-stack project built for the VR Automations developer test.
The backend takes a list of names, predicts their nationality using the Nationalize.io API, stores the results, and runs an automated sync every 5 minutes for verified leads.

Features

Accepts multiple names in one request

Calls Nationalize.io for each name

Saves name, predicted country, probability score, and status

Applies simple rules:

probability > 0.6 → Verified

otherwise → To Check

A cron job runs every 5 minutes and “syncs” verified leads by logging them in the console

Synced leads are not processed again

Tech Used

Node.js

Express.js

MongoDB + Mongoose

Axios

node-cron

API Endpoint
POST /api/process-names

Example body:

{
  "Name": ["Peter", "Aditi", "Ravi"]
}


This will trigger the batch processing and return the saved results.

How It Works (Short Explanation)

The API receives a list of names

For each name, the backend calls the Nationalize API in parallel

The most likely country + probability is extracted

Based on the probability, the lead is marked Verified or To Check

All results are stored in MongoDB

A cron job runs every 5 minutes:

finds verified leads that are not synced yet

prints a message like
Sending verified lead Peter to Sales Team...

marks them as synced so they won’t repeat

Setup

Install dependencies:

npm install


Create a .env file:

MONGO_URI=your_mongo_url
PORT=3000

 
