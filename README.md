# Каноническая работа проекта Stellar Burger. Практика Redux и React DND.

(Проект курса "Веб-разработчик плюс" от Яндекс Практикума)

#### _Цели проекта:_

- освоение навыков работы с состоянием в глобальном хранилище с использованием **_Redux_** ;
- структурирование бизнес-логики, взаимодействие с API с помощью усилителей Redux;
- подключение **_ReduxDevTools_** и освоение навыков работы с ним;
- реализация Drag and Drop в приложении с применением библиотеки **_react-dnd_** и её связью с **_Redux_**
- работа с протоколом **_WebSocket_** для получения информации от сервера в режиме реального времени
- создание собственного **_middleWare_**
- полный рефакторинг проекта для перевода на **_TypeScript_**

#### _Разработчик:_

[Алексей Крутяков](https://github.com/AlexeyKrutyakov)

#### _Используемые инструменты и технологии:_

![Stack](https://skillicons.dev/icons?i=vscode,figma,git,html,css,ts,react,redux,babel&perline=10)

Установка приложения через терминал (CI):

1. Копирование репозитория на локальный компьютер:
    ```bash
    git clone git@github.com:AlexeyKrutyakov/react-stellar-burger.git
    ```
2. Установка пакетов:

    при использовании `yarn`:
    ```bash
    yarn install
    ```
    при использовании `npm`:
    ```bash
    npm install
    ```

3. Запуск приложения через терминал (CI):

    при использовании `yarn`:
    ```bash
    yarn start
    ```
    при использовании `npm`:
    ```bash
    npm run start
    ```

В приложении доступен полноценный функционал после регистрации нового пользователя.
- В меню `Конструктор` перетаскиванием ингридиентов из левой части в правую соберите свой бургер. При наличии более одного ингридиента из состава соусов или начинок можно поменять последовательность соусов и начинок в полученном бургере перетаскиванием ингридиентов по вертикали. Замена булки происходит перетаскиванием новой булки из левой панели в собранный бургер (текущая булка заменится на новую).
- Нажмите кнопку "Оформить заказ" - заказ отправится на сервер, дождитесь ответа о принятии заказа
- В меню `Лента заказов` можно посмотреть статистику по текущим и выполненным заказам в реальном времени
- В меню `Личный кабинет` можно изменить данные пользователя и посмотреть историю собственных заказов
