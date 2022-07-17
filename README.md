# Wevr Jobs

This is a demo project for a job application to Wevr.

The assignment was as follows:

### Exercise: Create a basic HR app that sends out employment offers.

As a hiring manager, I want to:

- Create a new offer of employment.
- Specify the monetary compensation details of an offer (salary, equity, bonus, etc).
- Specify non-monetary compensation and benefits (culture, learning opportunities, etc).
- See a list of the offers I've created.
- Share a link to an offer via a unique URL.

As an employee receiving an offer, I want to:

- View an offer that was sent to me.
- Stretch goal: Ask a question about the offer (ideally a subsection of the offer).
- Understand the non-salary compensation I am being offered (stock valuation, value of healthcare benefits).
- See detail about the role, team, and organization.

## Solution

I went pretty long on this. Not sure what I'm at for hours but safe to say it's over.

I saw the assignment as needing to associate jobs with offers and share data between them. Writing and editing my own json to put some data together for the assignment seemed like it'd be pretty tedious because I'd probably make mistakes and have to futz with it repeatedly.

And there were a few views that would require some kind of routing. I've been reading a bit about remix.run, which is supposed to be great for breaking things apart and setting up routing for different views. This seemed like a good excuse to learn a new platform, so I dove in.

## Data

There are a lot of different types of data in play on this assignment -- salary, bonus, equity, retirement, benefits, company info, salary frequency, job type, hourly vs. yearly vs. contract... the list goes on. It's pretty easy to spend a bunch of time trying to figure out how you could break things apart for storage.

There are specific types of content called out in the instructions, but the more I looked at it I realized the easiest thing to do would be to look at it as two types of data -- `Position` vs `Offer` -- and make the buckets for each as big as possible.

So for the Positions, we have two main pieces of data: `name` and `details` field.

For the Offers, we have `details`, `candidateEmail` and `candidateName`.

This gives the most flexibility and lets us break it down further later on. Wanna keep the description light, cool. Want to dive into pet insurance and gym memberships, that works too! just throw it all in the Position's `details` field.

To give the ability to format the descriptions, I decided to input the content in a `<textarea/>` and store it as `Markdown`. As a result, I gump'd together a quick markdown editor and viewer. 

## Result

Honestly, the remix.run experience is pretty amazing. Super quick to scaffold thngs up. Routes are intuitive and the back-to-basics approach is refreshing. I kept being suprised at how simple the components were and how little React magic they needed.

Prisma is really intuitive too. Create your schemas and when you pull the data into React, it automatically gives you the correct types. Rad.

Here's what I built.

View and add jobs. Jobs with offers show the offer count.

<img width="1232" alt="Screen Shot 2022-07-17 at 2 43 17 AM" src="https://user-images.githubusercontent.com/296811/179392866-cc0848d7-e7e3-43ee-ab17-36c19197ddfa.png">

Select a job to view details. Offers are listed on the side. click the card to view the offer details. Otherwise you can edit the job or add a new offer.

<img width="1232" alt="Screen Shot 2022-07-17 at 2 43 39 AM" src="https://user-images.githubusercontent.com/296811/179392904-f3c1e81e-7543-48d8-bb9a-1aa9cd1f71be.png">

View the offer on it's own URL

<img width="1232" alt="Screen Shot 2022-07-17 at 2 44 20 AM" src="https://user-images.githubusercontent.com/296811/179392933-ee415615-855f-48fb-b985-82c1c714f38f.png">

Create/edit a job and preview the changes.

<img width="1232" alt="Screen Shot 2022-07-17 at 2 44 53 AM" src="https://user-images.githubusercontent.com/296811/179392955-04433000-7328-4ab4-a404-43f0db767158.png">
<img width="1232" alt="Screen Shot 2022-07-17 at 2 44 49 AM" src="https://user-images.githubusercontent.com/296811/179392961-837864f3-0a74-4301-ac5c-5bdecdb6e647.png">

Create an offer.

<img width="1232" alt="Screen Shot 2022-07-17 at 2 45 20 AM" src="https://user-images.githubusercontent.com/296811/179392981-bd82a81a-b502-438b-9a62-2b8e246d3701.png">


## Running Things

Install dependencies and start Remix/Express by running:

```sh
npm i
npm run dev
```

If you wanna take a look at the data, run:

```sh
npx prisma studio
```

