# Развёртывание сайта в интернете

Инструкция по публикации сайта на GitHub Pages и Netlify. Оба варианта — **бесплатно**, сервер не нужен.

---

## Вариант 1: GitHub Pages

### Шаг 1. Создай аккаунт на GitHub
Если ещё нет: [github.com](https://github.com) → Sign up

### Шаг 2. Создай репозиторий
1. Нажми **New repository**
2. Имя: `teacher-site` (или любое)
3. Выбери **Public**
4. Не ставь галочки на README, .gitignore — оставь пустым
5. **Create repository**

### Шаг 3. Загрузи файлы сайта
1. Скачай и установи [Git](https://git-scm.com/downloads), если ещё нет
2. Открой терминал (PowerShell) в папке `teacher-site`
3. Выполни по очереди:

```powershell
git init
git add .
git commit -m "Первый коммит"
git branch -M main
git remote add origin https://github.com/ТВОЙ_ЛОГИН/teacher-site.git
git push -u origin main
```

Замени `ТВОЙ_ЛОГИН` на свой логин GitHub. При `git push` введи логин и пароль (или токен).

### Шаг 4. Включи GitHub Pages
1. Репозиторий → **Settings** → слева **Pages**
2. В **Source** выбери **Deploy from a branch**
3. В **Branch** выбери `main` и папку `/ (root)`
4. **Save**

### Шаг 5. Готово
Через 1–2 минуты сайт будет доступен по адресу:
```
https://ТВОЙ_ЛОГИН.github.io/teacher-site/
```

---

## Вариант 2: Netlify (проще, без Git)

### Шаг 1. Зарегистрируйся
[netlify.com](https://www.netlify.com) → Sign up (можно через GitHub или email)

### Шаг 2. Опубликуй сайт
1. На главной нажми **Add new site** → **Deploy manually**
2. Перетащи папку `teacher-site` в область **Drag and drop your site output folder here**
3. Подожди 10–30 секунд

### Шаг 3. Готово
Netlify выдаст адрес вида `случайное-имя.netlify.app`. Его можно изменить в **Site settings** → **Domain management** → **Options** → **Edit site name**.

---

## Подключение Cusdis (отзывы)

### Шаг 1. Регистрация
1. Перейди на [cusdis.com](https://cusdis.com)
2. Sign up (через GitHub или email)

### Шаг 2. Создай проект
1. **Dashboard** → **New Project**
2. Название: «Сайт учителя» или как удобно
3. URL сайта: твой адрес (например `https://username.github.io/teacher-site` или `https://site.netlify.app`)
4. **Create**

### Шаг 3. Где взять App ID (Website ID)
1. Зайди в [cusdis.com/dashboard](https://cusdis.com/dashboard)
2. Выбери свой проект (кликни по нему)
3. Справа или вверху должна быть кнопка **«Embed»** или **«Embed Code»** — нажми её
4. В показанном коде найди строку `data-app-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"`
5. Скопируй значение внутри кавычек — это твой **App ID** (формат UUID, например `4033d6e0-1be2-4dac-bc9e-a57837087b15`)

   **Важно:** это НЕ пароль и не токен авторизации. Это ID проекта, он есть в разделе Embed / настройках проекта.

### Шаг 4. Вставь ID в код
1. Открой файл `reviews.html`
2. Найди `data-app-id="YOUR_APP_ID"`
3. Замени `YOUR_APP_ID` на твой Website ID
4. Сохрани файл

### Шаг 5. URL сайта в Cusdis (важно!)
В настройках проекта Cusdis должно быть указано **точное** совпадение с адресом твоего сайта:
- **GitHub Pages (проект):** `https://ТВОЙ_ЛОГИН.github.io/teacher-site/`
- **GitHub Pages (личный):** `https://ТВОЙ_ЛОГИН.github.io/`

Зайди в Cusdis → Dashboard → твой проект → Settings. В поле **Website URL** или **Base URL** укажи этот адрес (с `https://`, без `reviews.html`).

Если адрес не совпадает — виджет может не отображаться.

Если используешь Git + GitHub Pages — сделай `git add`, `git commit`, `git push`. Сайт обновится автоматически.

---

## Обновление сайта

**GitHub Pages:** после изменений в проекте:
```powershell
git add .
git commit -m "Описание изменений"
git push
```

**Netlify (без Git):** снова перетащи папку `teacher-site` в Netlify.

**Netlify с Git:** подключи репозиторий GitHub к Netlify — тогда при каждом `git push` сайт будет обновляться сам.

---

## Cusdis не показывается — что проверить

0. **Ошибка 404 с `appId=YOUR_APP_ID`**  
   Значит, на сайте всё ещё используется плейсхолдер вместо реального ID. Нужно:
   - Открыть `reviews.html` и проверить, что в `data-app-id="..."` стоит твой App ID из Cusdis (UUID), а не `YOUR_APP_ID`
   - Выполнить `git add .` → `git commit -m "Cusdis App ID"` → `git push`
   - Подождать 1–2 минуты и обновить страницу с очисткой кэша (Ctrl+F5)

1. **URL в настройках Cusdis**  
   Dashboard → проект → Settings. В **Website URL** должен быть точный адрес сайта (например `https://username.github.io/teacher-site/`). Без лишних слэшей и без `reviews.html`.

2. **Консоль браузера**  
   Открой страницу отзывов → F12 → вкладка Console. Если есть красные ошибки — скопируй их и можно поискать решение по тексту.

3. **Блокировщики рекламы**  
   Отключи uBlock, AdBlock и похожие расширения на твоём сайте — иногда они прячут виджеты комментариев.

4. **Приватный режим / другой браузер**  
   Попробуй открыть страницу в режиме инкогнито или в другом браузере.
