/**
 * Created by spaceman on 19.04.2018.
 */

import mongoose from 'mongoose'

let lessonSchema = {
    name: String,
    paths: [
        {
            title: String,
            desc: String,
            bg_name: String,
            views: Number,
            enabled: Boolean,
            isLiked: Boolean,
            isDesc: Boolean,
            date: Date,
            progress: Boolean,
            author: {
                id: Number,
                avatar: String,
                nickname: String
            }
        }
    ]
};

const lessonModel = mongoose.model('lessons', lessonSchema);
//const lesson = new Cat(lessonModel);
class Lessons {
    constructor() {

    }

    getLessons(id) {
        return new Promise( (resolve, reject) => {
            lessonModel.find({}, (err, result) => {
                if(err)
                    reject({text: 'Ошибка на сервере' + err});

                resolve(result[id]);
            });
        });
    }
}

export default Lessons;