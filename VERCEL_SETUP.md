# Настройка переменных окружения в Vercel для Supabase

## Необходимые переменные окружения

Для работы авторизации через Supabase в Vercel нужно добавить следующие переменные окружения:

### 1. NEXT_PUBLIC_SUPABASE_URL
**Значение:** `https://xvlalpmpqiiqnfmxehwu.supabase.co`

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
**Значение:** `sb_publishable_sLgn_D9tZ9_eGd5BWtAfnA_HsOQUVpx`

## Как добавить переменные в Vercel

### Способ 1: Через веб-интерфейс Vercel

1. Перейдите в ваш проект на [vercel.com](https://vercel.com)
2. Откройте настройки проекта (Settings)
3. Перейдите в раздел **Environment Variables**
4. Добавьте каждую переменную:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://xvlalpmpqiiqnfmxehwu.supabase.co`
   - **Environment:** Выберите все окружения (Production, Preview, Development)
   - Нажмите **Save**
   
   Повторите для второй переменной:
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** `sb_publishable_sLgn_D9tZ9_eGd5BWtAfnA_HsOQUVpx`
   - **Environment:** Выберите все окружения (Production, Preview, Development)
   - Нажмите **Save**

5. После добавления переменных перезапустите деплой:
   - Перейдите в раздел **Deployments**
   - Найдите последний деплой
   - Нажмите на три точки (⋯) и выберите **Redeploy**

### Способ 2: Через Vercel CLI

```bash
# Установите Vercel CLI (если еще не установлен)
npm i -g vercel

# Войдите в аккаунт
vercel login

# Добавьте переменные окружения
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Введите значение: https://xvlalpmpqiiqnfmxehwu.supabase.co
# Выберите окружения: Production, Preview, Development

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Введите значение: sb_publishable_sLgn_D9tZ9_eGd5BWtAfnA_HsOQUVpx
# Выберите окружения: Production, Preview, Development

# Перезапустите деплой
vercel --prod
```

## Важные замечания

1. **Префикс `NEXT_PUBLIC_`** - обязателен для переменных, которые используются в клиентском коде (браузер)
2. **Все окружения** - рекомендуется добавить переменные для всех окружений (Production, Preview, Development)
3. **Перезапуск деплоя** - после добавления переменных обязательно перезапустите деплой, чтобы изменения вступили в силу
4. **Безопасность** - `ANON_KEY` является публичным ключом и безопасен для использования в клиентском коде

## Проверка

После добавления переменных и перезапуска деплоя:

1. Откройте ваш сайт на Vercel
2. Проверьте консоль браузера (F12) - не должно быть ошибок о отсутствующих переменных
3. Попробуйте открыть форму авторизации - она должна работать корректно

## Дополнительные переменные (если нужны)

Если в будущем понадобятся другие переменные Supabase (например, для серверных операций), их можно добавить аналогичным образом, но **без** префикса `NEXT_PUBLIC_`.
