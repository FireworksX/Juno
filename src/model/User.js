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
                    reject({code: 452});
                }else{
                    newUser.save( (err) => {
                        if(err){
                            reject({code: 451});
                            throw err;
                        }

                        resolve({code: 201});
                    })
                }
            });

        });
    }
}

module.exports = User;