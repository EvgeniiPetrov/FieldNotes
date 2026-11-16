# FieldNotes — OFFLINE_DEVELOPMENT.md

**Состояние на 16 ноября 2026 г.**  
**Платформа:** Windows 11 · PowerShell 5.1 · Rider  
**Назначение:** краткая инструкция по работе с учебным Fullstack-проектом без доступа к интернету. Это **не** учебник и не инструкция по публикации приложения.

> **Пути к FieldNotes:** фактическое расположение основной папки проекта в последующих сообщениях не подтверждено. Во всех командах переходи в соответствующую **существующую** папку; не создавай повторно Frontend или Backend. Проверочные проекты `ApiPrep`, `NuGetPrep` и `NuGetPrep.Tests` — отдельные, не являются Backend проекта FieldNotes.

## 1. Зафиксированная среда

| Компонент | Версия / состояние |
|---|---|
| Windows | 11 |
| .NET SDK | `10.0.300`, `11.0.100` (обнаружены ранее) |
| Целевая платформа учебных проектов | `net10.0` |
| Rider | установлен; основная IDE |
| Visual Studio / VS Code | установлены; необязательны |
| Node.js | `v24.15.0` |
| npm | `12.0.1` |
| Git | `2.55.0.windows.3` |
| Vue | в `package.json` задано `^3.5.42`; точная установленная версия не проверена отдельно |
| Vite | `8.3.8`, подтверждена выводом сборки |
| PostgreSQL | сервер **17.12**, служба `postgresql-x64-17` — `Running`; подключение `psql` и `SELECT version()` успешны |
| `dotnet-ef` | `10.0.15`, глобальный инструмент |
| EF Core | `10.0.15` |
| EF Core Design | `10.0.15` |
| Npgsql EF Core Provider | `10.0.3` |
| xUnit (проверочный проект) | `2.9.3` (**v2**, не xUnit v3) |
| xUnit VSTest Adapter | `3.1.4` |
| Microsoft.NET.Test.Sdk | `17.14.1` в проверочном тестовом проекте |
| coverlet.collector | `6.0.4` |

Пакеты EF Core / Npgsql **уже скачаны**. Создавать ради этого новые проекты или запускать установку повторно не нужно.

## 2. Что проверено фактически

- **Frontend Vue:** `npm install`, `npm run build` и `npm run dev` успешно выполнены. **С отключённым интернетом** повторно прошли сборка, запуск и открытие `http://localhost:5173/`.
- **Frontend аудит:** `npm audit --omit=dev` — `0 vulnerabilities`. Полный `npm audit` показывал **7 moderate** предупреждений в дереве инструментов разработки из-за `minimatch@10.2.6` через `@typescript-eslint`. `npm audit fix` их не устранил. **Не использовать `--force` вслепую.**
- **NuGetPrep (`net10.0`):** EF Core, EF Core Design и Npgsql перечислены в `.csproj`; успешны `dotnet restore` только с локальным источником и `dotnet build --no-restore`.
- **NuGetPrep.Tests (`net10.0`):** `dotnet restore` только с локальным источником и `dotnet test --no-restore` успешны. **1 тест пройден, 0 ошибок, 0 пропусков.** Интернет при этой проверке явно не отключался.
- **ApiPrep (`net10.0`):** создан стандартный ASP.NET Core Minimal API **без дополнительных NuGet-пакетов**, успешно собран и запущен. Проверен URL `http://localhost:5154/weatherforecast` (JSON в браузере); `http://localhost:5154/` возвращал ожидаемый `404`, так как маршрут `/` не зарегистрирован. Локальное восстановление и сборка `--no-restore` успешны. Интернет при последней проверке явно не отключался.
- **PostgreSQL:** служба работает, сервер доступен локально через `psql`. Проверки его доступности именно при отключённом интернете пока нет.
- **Резервная копия:** пользователь **уже сохранил NuGet-кэш в архив**. Путь и содержимое архива не проверялись здесь.

### Пока не подтверждено

Полное переустановление npm-зависимостей **с нуля** без интернета; отдельная проверка xUnit и Backend с физически отключённым интернетом; резервное копирование `node_modules`/npm-кэша; восстановление NuGet из архивной копии; создание и проверка реальной базы FieldNotes. **Не обозначать эти проверки как выполненные.**

## 3. Команды для Frontend (PowerShell)

Открой терминал Rider **в уже существующей папке `frontend`**, где находится `package.json`.

```powershell
# Запуск локального сервера разработки
npm run dev

# В отдельном запуске/после остановки сервера: проверка сборки
npm run build

# При необходимости проверка зависимостей для рабочего приложения
npm audit --omit=dev
```

Обычный локальный адрес Vite в последней проверке: `http://localhost:5173/` (при занятом порте адрес может измениться). Остановка: **Ctrl+C**.

**Важно:** папка `node_modules` — установленные файлы пакетов; `package-lock.json` — зафиксированное дерево версий; npm-кэш — возможный источник для переустановки. Они **не взаимозаменяемы**. Если `node_modules` на месте, для сборки и запуска новая установка не нужна. Если папка удалена, команда `npm ci --offline` может сработать **только при наличии всех необходимых архивов в npm-кэше**; это ещё предстоит проверить до командировки.

Не подключать CDN и не использовать онлайн-зависимости в приложении, рассчитанном на автономную работу.

## 4. Команды для ASP.NET Core (.NET 10)

Открой терминал в **существующей папке `ApiPrep`**, содержащей `ApiPrep.csproj`, или в соответствующей папке будущего Backend.

```powershell
# Сборка без попытки восстановить зависимости
dotnet build --no-restore

# Запуск уже подготовленного проекта без восстановления пакетов
dotnet run --no-restore
```

Убери начальный пробел в командах при копировании, если терминал вставляет его. Адрес `ApiPrep` из проверки: `http://localhost:5154/weatherforecast` (фактический порт смотри в `Now listening on:`). Остановка сервера: **Ctrl+C**.

Временный `ApiPrep` содержит пример `/weatherforecast`; **не переносить его в FieldNotes без необходимости**. В шаблоне использовался `app.UseHttpsRedirection()`; на раннем запуске появлялось предупреждение о неопределённом HTTPS-порте, когда сервер слушал HTTP. Настройку HTTPS разберём отдельно.

## 5. NuGet и xUnit — восстановление из локальных пакетов

Глобальное хранилище NuGet на этом ноутбуке:

```text
C:\Users\p174\.nuget\packages\
```

Проверить текущий путь:

```powershell
dotnet nuget locals global-packages --list
```

В папке нужного **проверочного проекта с `.csproj`**:

```powershell
# Использует только указанный локальный источник; не обращается к NuGet.org
dotnet restore --source "$env:USERPROFILE\.nuget\packages" --no-http-cache --force

# Для обычного проекта
dotnet build --no-restore

# Для NuGetPrep.Tests
dotnet test --no-restore
```

Эти команды **успешно выполнены** на соответствующих проверочных проектах. Для нового проекта результаты могут отличаться: если понадобятся отсутствующие пакеты или версии, их нужно скачать заранее.

`dotnet-ef` уже установлен глобально:

```powershell
dotnet tool list --global
```

**Не очищай NuGet-кэш** командой `dotnet nuget locals all --clear` перед командировкой. Созданный архив кэша сохрани отдельно. Учти, что копия папки пакетов не заменяет SDK, runtime и глобальные инструменты.

## 6. PostgreSQL 17

```powershell
# Служба PostgreSQL
Get-Service postgresql*

# Если установлено по стандартному пути:
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -h localhost -d postgres
```

В `psql`:

```sql
SELECT version();
```

Выход — `\q`. Пароль `postgres` не хранить в Markdown, скриптах или репозитории. `Npgsql.EntityFrameworkCore.PostgreSQL` — **провайдер EF Core**, не сам сервер PostgreSQL. Дополнения Stack Builder для текущего проекта не требуются.

## 7. Быстрая диагностика

| Симптом | Сначала проверить |
|---|---|
| `npm`/`node` не найден | `node --version`, `npm --version`; правильный терминал и PATH |
| `npm run dev` не работает | Находишься ли в папке с `package.json`; есть ли `node_modules` |
| `dotnet` выбрал не ту версию | `dotnet --list-sdks`; в `.csproj` — `net10.0`; по необходимости позже закрепить SDK через `global.json` |
| NuGet запрашивает сеть | Есть ли нужные пакеты и **их зависимости** в кэше; использовать проверенную команду `dotnet restore --source ...` |
| На `/` ответ `404` | Проверить маршруты `MapGet` в `Program.cs` — корневого маршрута может не быть |
| В браузере API недоступен | Запущен ли `dotnet run`, какой порт указан в `Now listening on:` |
| Проблемы с PostgreSQL | `Get-Service postgresql*`; подключение через `psql`; корректность логина и пароля |
| В PowerShell не работает `dir /b` | Это синтаксис CMD; в PowerShell использовать `Get-ChildItem -Name` |
| Нет `Get-Command` | Скорее всего открыт CMD; `Get-Command` — команда PowerShell |

## 8. Что сделать перед следующей поездкой

- [x] Установить и проверить Node.js, npm, .NET SDK, Git и Rider.
- [x] Подготовить Vue Frontend и проверить работу **без интернета**.
- [x] Подготовить EF Core, Npgsql и `dotnet-ef`.
- [x] Проверить локальное восстановление EF Core/Npgsql и сборку.
- [x] Проверить локальное восстановление xUnit и запуск тестов.
- [x] Установить PostgreSQL и проверить SQL-подключение.
- [x] Архивировать локальное хранилище NuGet (со слов пользователя).
- [ ] Проверить xUnit, ApiPrep и PostgreSQL при реально отключённом интернете (при возможности).
- [ ] Проверить **повторную** установку npm-зависимостей в отдельной временной копии проекта через `npm ci --offline`; при необходимости дополнить кэш.
- [ ] Сохранить резервную копию Frontend (исходники, `package-lock.json`, при необходимости `node_modules`/npm-кэш) и проверить восстановление.
- [ ] Убедиться, что скачанные PDF и клонированная документация открываются без сети.
- [ ] Начать обучение с небольшой задачи **Vue Frontend FieldNotes**, затем подключать Backend, EF Core и тесты по мере появления необходимости.

## 9. Основные официальные источники (ссылки нужны для обновлений, не для автономного чтения)

- [Microsoft Learn — C#](https://learn.microsoft.com/ru-ru/dotnet/csharp/)
- [Microsoft Learn — ASP.NET Core 10 Minimal API](https://learn.microsoft.com/ru-ru/aspnet/core/tutorials/min-web-api?view=aspnetcore-10.0)
- [Microsoft Learn — .NET CLI](https://learn.microsoft.com/ru-ru/dotnet/core/tools/)
- [Microsoft Learn — EF Core](https://learn.microsoft.com/ru-ru/ef/core/)
- [Microsoft Learn — NuGet package restore](https://learn.microsoft.com/ru-ru/nuget/consume-packages/package-restore)
- [Vue — Quick Start](https://vuejs.org/guide/quick-start)
- [Vite — Guide](https://vite.dev/guide/)
- [npm ci](https://docs.npmjs.com/cli/v12/commands/npm-ci)
- [PostgreSQL 17 documentation](https://www.postgresql.org/docs/17/)

---

**Точка продолжения:** техническая подготовка практически завершена. Следующее содержательное занятие — **самостоятельная разработка первой небольшой функциональности FieldNotes на Vue 3 + TypeScript**, без выдачи готового решения до собственной попытки. Работаем короткими заданиями с проверяемым результатом и code review.
