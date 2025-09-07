# Kitters

![Demo](./assets/demo.gif)

## Tech Stack

- [Expo](https://expo.io/)
- [Unistyles](https://reactnativeunistyles.vercel.app/)
- [RTK](https://redux-toolkit.js.org/)
- [Jest](https://jestjs.io/)
- [CatAPI](https://thecatapi.com/)

## Development

> [!NOTE]
> Make sure you've followed React Native's [prerequisites](https://reactnative.dev/docs/set-up-your-environment)

> [!NOTE]
> Remember to set your CatAPI API key environment variable in
> `apps/mobile/.env`. Use `.env.example` as a template.

```bash
git clone https://github.com/twodoorsdev/kitters.git && cd kitters
bun i
bun expo prebuild --clean
bun expo run-android
# OR
bun expo run-ios
```
