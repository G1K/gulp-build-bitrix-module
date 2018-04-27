# Сборщик модулей для Bitrix Маркетплейс

## [Модуль заготовка для битрикс маркетплейс](https://bitbucket.org/project-marketplace/jerff.core)

## Модуль собирает сборку для маркетплейса:
- архив .last_varsion 
- обновления на основе тегов в git вида 1.0.0
- архивы модуля в utf8 и cp1251 кодировках
- кодирование подмодулей в уникальный namespace
- офбускация кода

## Обновления
- для установки обновлений, в папке /dist/version/1.1.0 должны быть:
    - /description.* (обязательный) - содержит описание обновления, где * - идентификатор языка в системе
    - /updater.php – файл запускается при установке обновления
    - /version_control.php - служит для организации связи между версиями модулей.

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

## Офбускация кода
- кодирует код, указанный в encode, было:
```php
namespace Project\Tools\Trains;

use Exception;

trait Event {

    static private $isStart = array();

    static protected function evetType() {
        throw new Exception('Установите тип события');
    }

    static protected function start() {
        if (empty(self::$isStart[static::evetType()])) {
            self::$isStart[static::evetType()] = true;
            return true;
        } else {
            return false;
        }
    }

    static protected function stop() {
        unset(self::$isStart[static::evetType()]);
        return false;
    }
}
```
стало
```php
namespace Project\Ver5f460f6b6bac9a6ef8651c56ce2c9e84b0b39125\Tools\Trains;use Exception;trait Event{static private $jd283fr6=array();static protected function evetType(){throw new Exception('Установите тип события');}static protected function start(){if(empty(self::$jd283fr6[static::evetType()])){self::$jd283fr6[static::evetType()]=true;return true;}else{return false;}}static protected function stop(){unset(self::$jd283fr6[static::evetType()]);return false;}}
```

## Пример gulpfile.js
```javascript
"use strict";

let gulp = require('gulp');
let build = require('gulp-build-bitrix-modul')({
    name: 'project.ajax',
    tools: {
        'project.tools': ['Project', 'Tools']
    },
    encode: [
        'include.php',
        'project.tools/**/*.php',
        '!project.tools/modules/install.php'
    ]
});

// Сборка текущей версии модуля
gulp.task('release', build.release);

// Сборка текущей версии модуля для маркетплейса
gulp.task('last_version', build.last_version);

// Сборка обновления модуля (разница между последней и предпоследней версией по тегам git)
gulp.task('build_update', build.update);

// Дефолтная задача. Собирает все по очереди
gulp.task('default', gulp.series('release', 'last_version', 'build_update'));
// достаточно указать 'last_version', так как команда вызывает код release и build_update
gulp.task('default', gulp.series('last_version'));
```

## Установка
```sh
npm install gulp@4.0.0 gulp-build-bitrix-modul --save
```