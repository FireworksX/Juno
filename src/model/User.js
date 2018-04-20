/*
    Class for User: Register, Auth, Get session
 */
import mongoose from 'mongoose';

let regSchema = mongoose.model('users', {
    firstName: {
        type: String,
        default: 'User'
    },
    login: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        default: 0
    },
    visit: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'user'
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

// let authSchema = mongoose.model('users', {
//     login: {
//         type: String,
//         require: true
//     },
//     password: {
//         type: String,
//         require: true
//     }
// });

class User {
    constructor() {

    }

    auth(obj) {
        return new Promise((resolve, reject) => {
            let findUser = regSchema({
                login: obj.login,
                password: obj.pass
            });
            regSchema.findOne({
                login: obj.login
            }, (err, result) => {
               if(err){
                   throw err;
               }

               if(result === null){
                   reject({code: 454, type: 'failed', text: `Никого с логином ${obj.login} мы не нашли. Попробуйте ещё раз, может быть вы ошиблись или Зарегистрируйтесь это дело 20 секунд, обещаем.`})
               }else{
                   if(result.password === obj.pass){
                       resolve({code: 202, type: 'success', text: `Пользователь с ником ${obj.login} успешно авторизирован, мы уже загрузили Вашу сессию, желаем удачи!`, object: result})
                   }else{
                       reject({code: 455, type: 'failed', text: `Пользователя ${obj.login} мы нашли, но пароль введён не верно. Поробуйте заново, может быть вы ошиблись, мы ждём вас!`});
                   }

               }
            });
        });
    }
    /*
        TODO: Добавить функцию Remove и Update
     */
    register(obj) {
        return new Promise((resolve, reject) => {
            let newUser = regSchema({
               firstName: obj.name,
               login: obj.login,
               mail: obj.mail,
               password: obj.pass
            });

            regSchema.find({
                login: obj.login
            }, (err, result) => {
                if(err){
                    throw err;
                }

                if(typeof result[0] === 'object'){
                    reject({code: 452,type: 'failed', text: `Логин ${obj.login} уже кем-то занят. Мы понимаем что это крутой никнейм, но Вам придётся выбрать другой.`});
                }else{

                    regSchema.find({
                        mail: obj.mail
                    }, (err, checkmail) => {
                        if(err){
                            throw err;
                        }
                        if(typeof checkmail[0] === 'object'){
                            reject({code: 453,type: 'failed', text: `Почта ${obj.mail} уже кем-то используется, попробуйте указать дугой адрес электронной почты.`})
                        }

                        newUser.save( (err) => {
                            if(err){
                                reject({code: 451,type: 'failed', text: 'Извените, это техническая ошибка, мы уже работаем над испралением ситуации.'});
                                throw err;
                            }

                            resolve({code: 201,type: 'success', text: `${obj.name} успешно зарегистрирован под ником ${obj.login}. Мы рады видеть тебя в нашей команде. Желаем удачи!`});
                        })

                    });

                }
            });

        });
    }

    getProfile (obj) {
        return new Promise( (resolve, reject) => {
            console.log(obj.login)
            if(obj.login === '' || obj.login === 'undefined'){
                reject({code: 457, type: 'failed', text: 'Не удалось загрузить данные пользователя'});
            }

            regSchema.findOne({
                login: obj.login
            }, (err, result) => {
                if(err){
                    throw err;
                }
                console.log(result)
                if(result === null){
                    reject({code: 456, type: 'failed', text: 'Не удалось загрузить данные пользователя'});
                }else{
                    resolve({code: 203, type: 'success', text: 'Сессия успешно загружена', object: result})
                }
            });

        });





    }
}

module.exports = User;