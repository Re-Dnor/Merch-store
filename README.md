# Merch store

### Technology stack:

- [Feature-Sliced Design](https://feature-sliced.design/ru/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Webpack](https://webpack.js.org/)
- [React-Router 6](https://reactrouter.com/en/main)
- [Formik](https://formik.org/)
- [Eslint](https://eslint.org/)
- [Jest](https://jestjs.io/ru/)
- [React testing library](https://testing-library.com/)
- [UI kits](https://core-ds.github.io/core-components/master/?path=/story/intro--page)

### Feature-sliced Design
#### Основные принципы:

- Shared - сборка всех независимых блоков, отделены от логики приложения и бизнеса (UI / конфиги)
- Entities - конкретные блоки для текущего приложения без взаимодействия с пользователем
- Features - взаимодействие с пользователем (основная логика приложения)
- Widgets - композиционный слой (обертки для всего приложения)
- Pages - страницы и инициализация роутинга
- App - инициализация и подключения провайдеров
