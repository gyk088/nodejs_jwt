## Инструкция по использованию

Для запуска приложения необходимо создать файл:
    .env на основании .env.example
    /install/config/config.json на основании /install/config/config.json.example

Установка рабочего окружения:

    npm install

Применение миграций и создание базы данных MySql

    npm run migrate

Запуск сервера:

    npm start

Запуск сервера для разработки:

    npm run dev

Запуск линтера приложение:

    npm run lint (npm run lint -- --fix)
