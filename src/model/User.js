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
                    reject({code: 452, text: `Логин ${obj.login} уже используется`});
                }else{

                    regSchema.find({
                        mail: obj.mail
                    }, (err, checkmail) => {
                        if(err){
                            throw err;
                        }
                        console.log(checkmail)
                        if(typeof checkmail[0] === 'object'){
                            reject({code: 453, text: 'Данная почта уже используется'})
                        }

                        newUser.save( (err) => {
                            if(err){
                                reject({code: 451, text: 'Техническая ошибка'});
                                throw err;
                            }

                            resolve({code: 201, text: `${obj.name}, добро пожаловать!`});
                        })

                    });

                }
            });

        });
    }
}

module.exports = User;