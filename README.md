# RiseFlow Client

The frontend application for **RiseFlow**, a full-stack crowdfunding platform where creators launch campaigns and supporters fund them with platform credits.

## Motive

RiseFlow makes crowdfunding more structured and accessible by connecting campaign creators with supporters through a transparent credit-based funding flow. The client gives each user a responsive interface for discovering campaigns, managing contributions, and completing role-specific tasks.

## Features

- Responsive public home page and campaign exploration.
- Campaign search, category filtering, details, and top-funded campaigns.
- Email/password registration and login through Better Auth.
- Google OAuth sign-in.
- Role-aware dashboards for Supporters, Creators, and Admins.
- Protected routes that wait for session and profile loading.
- Supporter contribution history, statistics, approved contributions, and credit purchases.
- Creator campaign creation, campaign management, contribution review, and withdrawals.
- Admin campaign approval, user management, withdrawal processing, and reports.
- Notification bell for account and campaign activity.
- Profile picture and campaign cover uploads through imgBB.
- Stripe-compatible credit purchase flow with a dummy fallback when Stripe is not configured.

## Tech stack

- React 18
- Vite
- React Router
- Tailwind CSS
- Axios
- Better Auth React client
- React Icons
- Swiper
- react-hot-toast

## Requirements

- Node.js 18 or newer
- npm
- A running RiseFlow server, locally or deployed
- A Vite-compatible environment variable file
- An imgBB API key for image uploads
- A Stripe publishable key if real payments are enabled

## Installation

From the `client` directory:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

`VITE_STRIPE_PUBLIC_KEY` is optional when using the application's dummy payment fallback.

## Development

```bash
npm run dev
```

Open `http://localhost:5173`.

The client expects the API at `VITE_API_URL`. For the deployed application, use:

```env
VITE_API_URL=https://riseflow-server.vercel.app
```

## Production build

```bash
npm run build
npm run preview
```

## Important integration details

- The server must allow the client URL through CORS and Better Auth trusted origins.
- Authenticated requests use credentials so the Better Auth session cookie is sent to the API.
- The frontend profile uses `photoURL` for uploaded registration images and `image` for Google profile images.
- Google OAuth must be configured on the server. The browser callback destination after successful sign-in is `/dashboard`.

## Related project

The API and authentication service are documented in [`../server/README.md`](../server/README.md).
