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

