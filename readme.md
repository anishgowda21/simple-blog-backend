# YAAB - Node.js & Supabase Edition

Welcome to Yet Another Blog Backend (YABB), built using Node.js, Supabase, and fortified with JWT authentication. This backend is designed to power blogs without all the fluff, just the good stuff: secure user management, and all the blog CRUD operations your heart could desire!

# 🚀 Quick Start Guide
Clone the repository. We know, we know, it's obvious, but we need to sound official.


```
git clone https://github.com/anishgowda21/yabb.git
cd yabb
```

Install dependencies. Run this command and go grab a snack(Not my problem if you don't have node installed😂):

```
npm install
```
Create a .env file based on the .env.example template. It's your app's lifeline.


```
SUPABASE_URL=SUPABASE_URL_HERE
SUPABASE_ANON_KEY=SUPABASE_ANON_HERE
JWT_SECRET = 
NODE_ENV =development
PORT =5000
```
Run it like you mean it:


```npm start```

Your Node.js backend should now be live, ready, and judging you if your API calls don't work.

# 🤓 What's Under the Hood?
- User Management: Endpoints for registering, authenticating, and managing user profiles, all secured with JWTs.

- Blog Management: CRUD operations for your precious blog content. We care, even if your last post was a conspiracy theory about flat-earth.


# A few select routes from our menu:

- `POST /users`: Register a new user. Your audience awaits.
- `POST /users/auth`: Log in and get your JWT VIP pass.
- `GET /blogs`: Publicly accessible. Let the world read your masterpiece.
- `PATCH /blogs/:blogId`: Because typos in blog titles are a thing.
- `DELETE /blogs/:blogId`: When you realize your blog post was a bad idea at 2 a.m.


# 🛡️ The Middleware Heroes
- protect: Our personal bodyguard for routes. Unauthorized users? Not today, buddy.
- protectOptional: For routes where being logged in is nice but not required. We call it the "cool, but chill" guard.

# 🙈 A Note About the Frontend
Oh, did we mention? There might be a folder called frontend/ lying around in this repo. Don’t touch it, don’t look at it, don’t even think about it. It’s just there for reasons. Focus on the backend. 🕶️

### ❗Always keep your API KEYS SAFE

Happy Coding....
