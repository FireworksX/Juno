### Juno (etc. Junior) 
#### Documenatation
Приложение ***Juno*** работает на следующем стэке
+ `NodeJS` - Сервер
	+ `Express` - framework для NodeJS
+ `MongoDB` - База данных
	+ `Mongoose` - библиотека для удобной работы с MongoDB
+ `VueJS (2+)` - framework для клиентского рендера
	+ `Vue-Router` - для создания SPA

---
#### How It Work?
Мы имеем 2 папки 
+ `src` - где лежат исходники
	+ `components` - компоненты Vue
		+ [`App.vue`](#abcd) - полотно с темами и уроками
		+  [`Dashboard.vue`](#abcd) - Модуль администрирования 
		+  [`Form.vue`](#abcd) - Модуль авторизации / регистрации
		+  [`Lessons.vue`](#abcd) - Модуль вывода всех уроков
		+  [`Person_small.vue`](#abcd) - Модуль пользователя (маленький)
		+  [`Notification_small.vue`](#abcd) - Модуль оповещений (маленький)
	+ `model` - разный функционал от связи с бд, до отрисовки линий нод
		+ [`User.js`](#abcd) - Работает с данными пользователя
		+ [`Nodes.js`](#abcd) - Работает с темами уроков
		+ [`Lessons.js`](#abcd) - Работает с уроками
		+ [`DrawPaths.js`](#abcd) - Рисует линий для нод
	+ `router`
		+  [`pathsApp.js`](#pathsapp.js) - Обработка HTTP запросов
	+ [`views`](#views) - страницы сайта
	+ [`main.js`](#main.js) - точка входа Webpack
	+ [`server.js`](#server.js) - Конфигурация NodeJS сервера
> Все файлы в папке `src` поддерживают ES6 | ES2015
 + `server` - место где располагается сам сервер.
	 + `model` - аналог из папки `src` только `ES5`
	 + `router` - аналог из папки `src` только `ES5`
	 + [`views`](#views) - папка с шаблонами сайта
		  + [`application.pug`](#application.pug) - Шаблон для отрисовки SPA
	 +  [`public`](#abcd) - Хранение библиотек - стилей - картинок
		 + [`app`](#abcd) - файлы для SPA
	 + `main.js` - скомпилированный файл и `src` es5 ---> es6
	 + `server.js` - скомпилированный файл и `src` es5 ---> es6
---

### Описание 
> Мы будем рассматривать папку `src` т.к. в ней лежат исходники.
> Мы **не** будем разбираться в каждой строчке.

Начнём с главного - это с сервера, без него у нас ничего не получится.

#### Server.js
Главная его задача - это запустить сервер, подключиться к базе данных и обрабатывать HTTP запросы и передавать данные клиенту

На сервере мы используем **express framework**: `let app = express();`
Движок для отрисовки мы используем HTML шаблонизатор **Pug**: 
```js
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'pug');
```
Определяем папку в которой будут лежать статические файлы: `app.use(express.static('${__dirname}/public/'));`
> Поскольку данный файл запускается не из папки `src`, а из папки
> `server`, то мы определяем статичный путь относительно папки  `server`

Запускаем сервер на **2000** порту, найти запущенный сервер можно по адресу `http://localhost:2000`

Подключаемся к MongoDB по адресу `'mongodb://localhost/juno'`

**Определяем пути**
```js
import appPaths from './router/pathsApp'
app.use('/', appPaths);
```
Подробнее про [`pathsApp`](#pathsapp.js)

---

#### pathsApp.js

Данный файл отлавливает HTTP-запросы от клиента.
*Как он это делает?*

Например: Если будет отправлен *GET* по адресу `http://localhost:2000/test`, то `pathsApp.js` отловит его следующим образом и в консоль nodeJS выведет `Request`.
```js
import express from 'express'
let router = express.Router();

router.get('/test', (req, res) => {  
  console.log('Request');  
});

module.exports = router;
```
**pathsApp.js** отлавливает следующие пути:
+ `/app` - отрисовывает [`application.pug`](#application.pug)
	+ Тип: `GET`
	+ Принимает: `Ничего`
	+ Что делает: `res.render('application');`
+ `/register` - регистрирует пользователя
	+ Тип: `POST`
	+ Принимает: `Object` - с данными пользователя для регистрации
	+ Что делает: `user.register(req.body)` - вызывает метод *register* у класса [`user`](user.js)
+ `/auth` - авторизирует пользователя
	+ Тип: `POST`
	+ Принимает: `Object` - с данными для авторизации
	+ Что делает: `user.auth(req.body)` - вызывает метод *auth* у класса [`user`](user.js) и если авторизация прошла успешно, то регистрирует сессию с данными пользователя 
+ `/profile` - получает сессию пользователя, если её нет создаёт новую со значением **false**
	+ Тип: `POST`
	+ Принимает: `Ничего`
	+ Что делает: `res.send(req.session.profile);` - отдаёт клиенту сессию 
+ `/getNodes` - получает *массив* нод (тем с уроками)
	+ Тип: `POST`
	+ Принимает: `Ничего`
	+ Что делает: `node.getNodes()` - вызывает метод *getNodes* у класса [`node`](nodes.js) и отдаёт ответ клиенту. 
+ `/getLessons` - получает массив уроков конкретной темы
	+ Тип: `POST`
	+ Принимает:  `id` - темы, список уроков для которой нужно вернуть
	+ Что делает: `lesson.getLessons(req.body.id)` - вызывает метод *getLessons* у класса [`lesson`](lessons.js) и отдаёт ответ клиенту.
> Чтобы узнать в каком виде отдаётся ответ клиенту почитайте документацию про данный класс
---
#### Views
В данной папке находятся файлы для формирования сайта.
> Так как мы определили движок для рендера **pug** [`Server.js`](#server.js) это значит что и страницы сайта должны быть **pug**

Если мы хотим сделать чтобы при переходе на страницу `http://localhost:2000/prices` у нас отрисовывался *price.pug* который лежит в данной папке, то нужно отловить данный GET запрос к серверу и отрендерить данный шаблон: 
```js
/* pathsApp.js */
router.get('/prices',  (req, res)  =>  { 
	res.render('price'); 
});
```
---
#### application.pug
Является точкой входа SPA приложения. Здесь мы можем подключить нужные нам стили, библиотеки и они будут доступны по всему SPA приложению.
```pug
doctype html5  
html  
 head meta(charset="utf-8")  
  link(href="style.css" rel="stylesheet")
  title juno  
  body  
	  #app    
		  router-view  
  
 
	 script(src="build.js")
```
SPA приложение рендерится внутрь `#app`. Подключаемые файлы должны лежать в папке `public/app/`. 
**build.js** - файл скомпилированный Webpack в котором находятся все Vue компоненты и вообще всё приложение, кроме серверных модулей.

---
#### main.js
Является точкой входа для Webpack и всего SPA. 
В этот файт подключаются все компоненты Vue, задаётся роутинг (отслеживание путей) с помощью `vue-router` и инициализируется VueJS по адресу `#app` - из  [`application.pug`](#application.pug).
```js

```import Vue from 'vue'  
import VueRouter from 'vue-router'  
import Form from './components/Form.vue'  
import Dashboard from './components/Dashboard.vue'  
import App from './components/App.vue'  
import Lessons from './components/Lessons.vue'  
import VueResource from 'vue-resource'  
  
particlesJS.load('form__overlay', 'particlesjs-config.json');  
  
  
  
Vue.use(VueResource);  
Vue.use(VueRouter);  
  
const routes = [  
	{ path: '/sign', component: Form },  
    { path: '/dashboard', component: Dashboard },  
    { path: '/lessons/:id', component: Lessons },  
    { path: '/', component: App },  
];  
  
const router = new VueRouter({  
  routes
});  
  
let vm = new Vue({  
  el: '#app',  
    router,  
    data: {
	    msg: 'some text'
	}
});
