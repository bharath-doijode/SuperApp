# FarmerLead Application

This is mini app for FarmerLead service. FarmerLead exposes `CommoditiesScreen` screen and `MainNavigator`. `MainNavigator` is FarmerLead app itself. `CommoditiesScreen` screen is a screen, which is used in the super app in its own navigation. FarmerLead app uses auth logic and UI (`SignInScreen`, `AccountScreen`) from Auth remote module, so we suggest to run Auth dev server to prevent issues with FarmerLead app. If Auth dev server will no be run, FarmerLead app will not work as standalone app.

## Setup

Install dependencies for all apps in root directory of this monorepo:

```
pnpm install
```

### Run

Start dev server for all apps in root directory of this monorepo if you need to work as a part of host app. FarmerLead app server will run on 9000 port:

```
pnpm start
```

Or start dev server for FarmerLead app as a standalone app:

```
pnpm start:standalone:farmerLead
```

Run iOS or Android app (ios | android):

```
pnpm run:farmerLead:<platform>
```
