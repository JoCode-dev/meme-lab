<p align="center">
  <img src="https://media.discordapp.net/attachments/1313901914202832948/1363840781667795076/logo-memelab.png?ex=68077f35&is=68062db5&hm=b7f94551a12b787b502c9fe13c06013c2f26538052a52a00027c915ffd84ee71&=&format=webp&quality=lossless&width=60&height=100" />
</p>

# Meme Lab

[![](https://img.shields.io/badge/Live%20Demo-Meme%20Lab-000000.svg)](https://meme-lab.vercel.app/)

A web app that allows you to create a meme through an image and text.

### (Next Version)

Users authenticated can save their memes and view them later in their profile page and the global feed.

## Features

- Create a meme through an image and text.
- Download image on computer.
- Add text to the image.
- Generate meme through AI.
- Real time edit of the image.
- Share meme on social media.

### (Next Version)

- View all memes in the global feed.
- View a meme.
- Ability to like and comment on a meme.
- Ability to save a meme.
- Ability to delete a meme.

## Tech Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- Supabase
- Lucide Icons
- OpenAI

## Getting Started

First provide the environment variables in the `.env.local` file.

```bash
cp .env.example .env.local
```

Edit the `.env.local` file with the correct environment variables.

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
