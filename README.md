# OPA Super App PoC

Monorepository showcase to showcase Super App development possibilities with React Native and Re.Pack.


## The problem

Sometimes small app could grow to super app, which means that it provides multiple services like payments, messaging, social network, booking, news, etc. And it's not easy to maintain it. It's hard to keep the codebase clean and to keep the app fast. The app grows in size and not all users want to keep a huge app just for a few sevices. So, we need to split the app into smaller parts and make it possible to install only the services that user needs. But somebody want all the services in one place. So super app still should be available as one app.
There are a few options to solve this problem:

- Split the app into several smaller apps, keep super app as well and move reusabale parts into libraries. But even small changes in a library could lead to a lot of work to update all the apps and redeploy all of them.
- Use a monorepository. It's a good option, but it's not always easy to set up and maintain monorepo. Also it is not so easy to divide work on the project between several team independently or provide a way for external developers to contribute only in one part of the repo or one certian app.

## The solution

This PoC is a monorepository with a few apps using micro-frondend architecture. It's easy to set up and maintain. These independent apps could be deployed as separate apps or as a part of super app. Developer could move these micro-frontends to separate repositories and deploy them as separate apps. That helps to divide work on the project between several team independently or provide a way for external developers to contribute only in one part of the repo or one certian app. The difference between classic monorepo and this PoC is runtime dependencies. This means no need to redeploy any of micro-frontends if you change something in the library. It's enough to update micro-frondtend and all the apps will use the latest version of the it.

## The OPA Super App PoC


The super app contains 4 apps:

- `host` - the main app, which is a super app. It contains all the micro-frontends and provides a way to navigate between them.
- `shell` - the blueprint of `host` app with shared dependencies. It could be shared across all the teams, since there no necessary secrets available in this version of `host` app.
- `farmer` - micro-frontend for Commodities service.
  Farmer exposes `Commodities` screen and `MainNavigator`. `MainNavigator` is Farmer app itself. `Commodities` screen is a screen, which is used in the super app in its own navigation.
- `farmerLead` - micro-frontend for Farmer Lead service.
  Farmer Lead exposes `MainNavigator`. `MainNavigator` is FarmerLead app itself.
- `dashboard` - micro-frontend for dashboard service.
  Dashboard exposes `MainNavigator`. `MainNavigator` is Dashboard app itself.
- `auth` - module that is used by other modules to provide authentication and authorization flow and UI.

Each of the mini apps could be deployed and run as a standalone app.

## How to use

We use `pnpm` to manage dependencies. Learn how to install `pnpm` [here](https://pnpm.io/installation)

### Setup

Install dependencies for all apps:

```
pnpm install
```

[Optional] Install pods where applicable

```
pnpm pods
```

Pods might sometimes be outdated, and they might fail to install, in that case you can update them by running:

```
pnpm pods:update
```

### Run

Start dev server for host and mini apps:

```
pnpm start
```

Or start dev server for a specific app ([host](./packages/host/README.md) | [farmer](./packages/farmer/README.md) | [farmerLead](./packages/farmerLead/README.md) | [dashboard](./packages/dashboard/README.md)):

```
pnpm start:<app-name>
```

Or start dev server for a specific app as a standalone app. It's useful for testing micro-frontend as a standalone app:

```
pnpm start:standalone:<app-name>
```

Running the mini app as a standalone requires running the [catalog-server](./packages/catalog-server/README.md) and [auth module](./packages/auth/README.md):

```
pnpm start:catalog
```

```
pnpm start:auth
```

Or run commands concurrently:

```
pnpm concurrently -P "pnpm start:catalog" "pnpm start:auth"
```

Run iOS or Android app (ios | android):

```
pnpm run:<app-name>:<platform>
```

For Android, make sure to reverse adb ports:

```
pnpm adbreverse
```

There is no `start:shell` script to avoid running shell and host app concurrently. It's not possible to run shell and host app concurrently, since they use the same port. If you want to run shell app, you should run `pnpm start:standalone:shell` and then run each mini app bundler you want to use in shell app.

### Test

Run tests for all apps:

```
pnpm test
```

### Lint

Run linter for all apps:

```
pnpm lint
```

### Type check

Run type check for all apps:

```
pnpm typecheck
```

## Troubleshooting

TBD

## Documentation

TBD

## Known Issues

The "farmer"  mini-app can't be run in standalone mode (i.e. without the host running). This is a deliberate decision of this repository to showcase the possibility and to reduce the amount of work to keep the mini-apps dependencies up-to-date.
The "dashboard" mini-app can be run as a standalone app (without the host). It's up to you to decide on what kind of developer experience your super app has.

Repack v3 HMR breaks React Native inspector/devtools in RN 0.70 version. A bypass added three patches for the dashboard, shell, and host. [link](https://github.com/callstack/repack/issues/251).
