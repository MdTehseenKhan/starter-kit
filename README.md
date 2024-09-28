# Starter

## About

Description

## Getting Started

This is a quick guide to get you started with the project.

### Requirements

Ensure you have the following installed:

- Node.js
- Git
- Docker

### Cloning the Repository

Clone this repository:

```
git clone https://github.com/[ORG]/starter.git --depth=1
```

Move to the folder just cloned:

```
cd starter
```

### Installing the Node Modules

Install the Node modules with the following command:

```
npm i
```

### Supabase

First, run the Supabase stack:

```bash
npm run supastart
```

This does not run our remote Supabase project, but a local instance
using Docker. This is useful for development and testing.

The general practice is to use the local instance for development and the
production instance when we're ready to deploy. Please set up the local
instance first before attempting to use the production instance.

#### Adding the Supabase Keys to the Environment Variables

If this is the first time you run this command, we will need to get the
Supabase keys and add them to our local environment variables configuration file `.env.local`.

When running the command, we will see a message like this:

```bash
> supabase start

Applying migration 00000000000000_schema.sql...
Seeding data supabase/seed.sql...
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: ****************************************************
service_role key: ****************************************************
```

Now, we need to copy the `anon key` and `service_role key` values and add
them to the `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=****************************************************
SUPABASE_SERVICE_ROLE_KEY=****************************************************
```

#### Database Types

Now, generate the DB types with:

```
npm run types
```

### Next.js Server

Then, run the Next.js development server:

```bash
npm run dev
```

<!-- ### Email Confirmations

When signing up, Supabase sends an email confirmation to a testing account. You can access the InBucket testing emails [using the following link](http://localhost:54324/monitor), and can follow the links to complete the sign up process.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. -->
