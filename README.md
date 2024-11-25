# deepwiki by Замахов Егор

**Проект для поиска кратчайших путей между двумя страницами Википедии.**

`deepwiki` состоит из трёх основных частей:

1. **Фронтенд**
2. **Бэкенд**
3. **Скрипты формирования базы**

## Фронтенд

### Доступные команды

- `npm run dev`  
  Запускает приложение в режиме разработки на порту `3000`.

- `npm run build`  
  Собирает приложение для продакшена.

- `npm run start`  
  Запускает продакшен билд.


## Бэкенд

### Доступные команды

- `npm run start:dev`  
  Запускает сервер в режиме разработки на порту `3005`.

- `npm run build`  
  Собирает продакшен билд.

- `npm run start`  
  Запускает продакшен билд.

### Конфигурация

Для настройки бэкенда используется файл `.env`. Основные параметры:
- **DB** — стандартные настройки подключения к базе данных.
- **Порт сервера** — порт, на котором будет работать сервер.
- **Файл с обработанными страницами** — путь к файлу, где хранятся обработанные страницы.

Пример `.env`:
```dotenv
DB_HOST=http://localhost:7687
DB_USER=neo4j
DB_PASS=
PORT=3005
LOCAL_DB=./data/checked.json
```

## Скрипты формирования базы

### Доступные команды

- `npm run start <page_name>`  
  Запускает сбор данных в режиме продакшена.  
  Параметр `page_name` (опционально) — начальная страница для обработки.  
  Если параметр не указан, поиск начнётся со страницы **"Россия"** (т.к. она содержит много ссылок)

- `npm run dev`  
  Запускает приложение в режиме разработки.

- `npm run build`  
  Собирает проект для продакшена.

### Как происходит обработка

1. **Построение графа**  
   Обработка начинается с заданной страницы (`page_name`). Скрипт извлекает все ссылки на странице (которые ведут на существующие страницы) и добавляет их в очередь обработки.  
   Каждая текущая страница считается родителем, а ссылки на ней — детьми. Эти связи сохраняются в БД Neo4j.

2. **Обработка завершённых страниц**  
   Все обработанные страницы записываются в файл, указанный в конфигурации (`OUTPUT_FILE`), чтобы избежать повторов.

3. **in_sleep mode**  
   Позволяет временно остановить обработку и записать текущую очередь (создать резервную).

4. **Ориентировочная длительность**  
   Обработка всей русской Википедии занимает **16-30ч**. На ней около 3кк уникальных страниц.

5. **Общие советы**  
   Перед обработкой обязательно установить в базе Neo4j индекс на поле name.


### Конфигурация

Параметры для скрипта задаются через файл `.env`:

- **DB** — стандартные настройки подключения к базе данных.
- **OUTPUT_FILE** — файл, в который записываются обработанные страницы.  
- **STATUS_FILE** — файл резервной очереди.  
- **INSLEEP_FILE** — файл состояния режима `in_sleep`.  
- **CONSOLE_FREQ** — частота (в страницах) вывода промежуточных результатов в консоль.

Пример `.env`:
```dotenv
DB_HOST=http://localhost:7687
DB_USER=neo4j
DB_PASS=
OUTPUT_FILE=./data/checked.json
STATUS_FILE=./data/status.json
INSLEEP_FILE=./data/in_sleep.json
CONSOLE_FREQ=1000
```