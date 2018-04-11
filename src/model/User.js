/*
    Class for User: Register, Auth, GetInfo
 */
import mongoose from 'mongoose';

var regSchema = mongoose.model('users', {
    firstName: String,
    login: String,
    mail: String,
    password: String
});

class User {
    constructor() {

    }

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
                        console.log(checkmail)
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
}

module.exports = User;