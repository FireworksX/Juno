/**
 * Created by spaceman on 18.04.2018.
 */

import mongoose from 'mongoose'

const Node = mongoose.model('Node', {
    name: String,
    parent: Number,
    enabled: Boolean,
    position: {
        cx: Number,
        cy: Number,
        cr: Number
    },
    styles: {
        fill: String,
        shadow: Boolean
    }
});



class Nodes {
    constructor (){

    }

    getNodes(){
        return new Promise( (resolve, reject) => {
            Node.find({}, (err, result) => {
                if(err){
                    reject({code: 457, type: 'failed', text: 'Техническая ошибка'});
                    throw err;
                }

                resolve({code: 205, type: 'success', text: 'Список васех нод получен успешно!', object: result});
            })
        });
    }

    nodeRegister (obj) {
        /*
            Пример принимаемого объекта
            obj = {
                name: 'test',
                parent: 0, (ID родителя. ID - индекс тодителя в массиве)
                enabled: true,
                position: { (Это свойство для построения путей)
                    cx: 100,
                    cy: 110,
                    cr: 40
                },
                styles: { (Это свойство для отрисовки ноды, можно добавлять CSS свойства)
                    left: '100px', (position.cx)
                    top: '110px', (position.cy)
                    width: '80px', (position.cr * 2)
                    height: '80px' (position.cr * 2)
                }
            }
         */
        return new Promise( (resolve, reject) => {
            obj.styles.left = `${obj.position.cx}px`;
            obj.styles.top = `${obj.position.cy}px`;
            obj.styles.width = `${obj.position.cr * 2}px`;
            obj.styles.height = `${obj.position.cr * 2}px`;
            const newNode = new Node(obj);
            newNode.save((err) => {
                if(err){
                    throw err;
                }
            });
        });
    }


}

export default Nodes;