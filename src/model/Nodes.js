/**
 * Created by spaceman on 16.04.2018.
 */
//import mongoose from 'mongoose';
import Snap from 'snapsvg'

let nodesArr = [
    {
        id: 0,
        name: 'HTML',
        parent: 0,
        position: {
            cx: 100,
            cy: 100,
            cr: 30
        },
        styles: {
            fill: '#34495e',
            stroke: '#34495e',
            strokeWidth: 3,
            shadow: true
        }
    },
    {
        id: 1,
        name: 'CSS',
        parent: 0,
        position: {
            cx: 300,
            cy: 400,
            cr: 30
        },
        styles: {
            fill: '#34495e',
            stroke: '#34495e',
            strokeWidth: 3,
            shadow: true
        }
    },
    {
        id: 2,
        name: 'JS',
        parent: 1,
        position: {
            cx: 400,
            cy: 100,
            cr: 40
        },
        styles: {
            fill: '#34495e',
            stroke: '#34495e',
            strokeWidth: 3,
            shadow: true
        }
    },
];

class Nodes {
    constructor (paper){
        this.paper = Snap(paper);
        this.nodes = nodesArr;
        let index = 1;
        for(let node of this.nodes){
            this.render(node);
            index++;
        }

    }

    draw(){
        let parentId = this.node.parent;
        let parentObj = this.nodes[parentId];
        let {cx, cy} = parentObj.position;

        let path = this.paper.path(`M${this.node.position.cx},${this.node.position.cy} L${cx},${cy}`);
        path.attr({
            stroke: '#000',
            strokeWidth: 3
        })
        this.paper.prepend(path)
    }

    render(node){
        this.node = node;
        let {cx, cy, cr} = node.position;
        let {fill, stroke, strokeWidth, shadow} = node.styles;
        let cir = this.paper.circle(cx, cy, cr);
        cir.attr({fill, stroke, strokeWidth});
        this.draw()
        //console.log(node)

    }

}

export default Nodes;