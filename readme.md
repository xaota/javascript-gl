# javascript-gl

хелпер для работы с `WebGL`

### Установка
```shell
$ npm install javascript-gl
```

Надо настроить в вашем сервере резолв с `/javascript-gl` в `node_modules/javascript-gl`

```html
  <script type="importmap">
  {
    "imports": {
      "javascript-gl": "/javascript-gl/index.js",
      "javascript-gl/": "/javascript-gl/library/"
    }
  }
  </script>
```

### Использование
```javascript
import GL from 'javascript-gl';

...
```

### Дополнительно
Если вы используете vscode, можно настроить резолв для корректной работы самого редактора с помощью файла `jsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": "../node_modules/",
    "paths": {
      "javascript-gl/*": ["./javascript-gl/library/*"]
    }
  }
}
```
