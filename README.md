# Сборщик модулей

## Модуль собирает сборку для маркеплейса:
- архив .last_varsion 
- обновления на основа тегов в git вида 1.0.0
- архивы модуля в utf8 и cp1251 кодировках

## Подмодули проекта
- если у вашего модуля есть git подмодули, то код будет перекодирован

было:
```php
namespace Project\Tools\Sale;

use CCatalogDiscount,
    Bitrix\Main\Loader,
    Project\Tools\Utility\Cache;
```
стало
```php
namespace Project\Ver7348d5c7870f19b39d83f080ca9e708bbba1c3d2\Tools\Sale;

use CCatalogDiscount,
    Bitrix\Main\Loader,
    Project\Ver7348d5c7870f19b39d83f080ca9e708bbba1c3d2\Tools\Utility\Cache;
```

- в итоге у вас могуть быть два модуля с разными версиями подмодулей, и не будут конфликтовать друг с другом

## Пример gulpfile.js
```javascript
"use strict";

let gulp = require('gulp');
let build = require('gulp-build-bitrix-modul')({
    name: 'project.ajax',
    tools: {
        'project.tools': ['Project', 'Tools']
    }
});

// Сборка текущей версии модуля
gulp.task('release', build.release);

// Сборка текущей версии модуля для маркеплейса
gulp.task('last_version', build.last_version);

// Сборка обновления модуля (разница между последней и предпоследней версией по тегам git)
gulp.task('build_update', build.update);

// Дефолтная задача. Собирает все по очереди
gulp.task('default', gulp.series('release', 'last_version', 'build_update'));
// 'release' и 'last_version' можно вместе не указывать, достаточно last_version, так как команда вызывает код release
gulp.task('default', gulp.series('last_version', 'build_update'));
```

## Установка
```sh
npm install gulp@4.0.0 gulp-build-bitrix-modul --save
```