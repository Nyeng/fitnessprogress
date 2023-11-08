# Fitness Progress 
The website is about creating a Workout plan for runners that allow them to track progress and compare similar workouts they've done to a better extent than what Strava currently offers:
- Compare similar activities extensively 
- Reward user when race goal is met
- Reward user when following training plan
- Reward user for making achievements 

# Input fra brukere
- Målsetning, i form av distance + referanseløp som du kan basere løpet / trening på. Realistisk. Treningsplan basert på referanse. Forslag til hva du skal ligge på i tid på dragene. Viktigst med mest mulig realistisk program med konkret info om hvilke tider og hvilken fart du skal legge deg på. 
- Fleksibilitet i treningsprogrammet er viktig - enkelt kunne swappe ut økter 
- Noen økter er lettere på tredemølle (45/15), hurtighet lettere på mølle. 
- Stravaintegrasjon ikke veldig viktig, men en bonus

# Ideer
- Click and drag: https://codesandbox.io/p/sandbox/remix-dnd-ezel1d

# Connect to database
 `npx prisma studio` - IDE to view data (must have schema set up)

# Remix
This directory is a brief example of a [Remix](https://remix.run/docs) site that can be deployed to Vercel with zero configuration.

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/remix&template=remix)

_Live Example: https://remix-run-template.vercel.app_

You can also deploy using the [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!
