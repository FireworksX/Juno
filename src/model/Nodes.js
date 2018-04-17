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
        enabled: true,
        position: {
            cx: 850,
            cy: 125,
            cr: 40
        },
        styles: {
            fill: '#34495e',
            stroke: '#34495e',
            strokeWidth: 3,
            shadow: true
        },
        path: '/lessons/html'
    },
    {
        id: 1,
        name: 'CSS',
        parent: 0,
        enabled: false,
        position: {
            cx: 625,
            cy: 140,
            cr: 40
        },
        styles: {
            fill: '#34495e',
            stroke: '#34495e',
            strokeWidth: 3,
            shadow: true
        },
        path: '/lessons/css'
    },
    {
        id: 2,
        name: 'JS',
        parent: 0,
        enabled: true,
        position: {
            cx: 1220,
            cy: 150,
            cr: 40
        },
        styles: {
            fill: '#34495e',
            stroke: '#34495e',
            strokeWidth: 3,
            shadow: true
        },
        path: '/lessons/js'
    },
];

class Nodes {
    constructor (paper, nodes){
        this.paper = Snap(paper);
        this.nodes = nodes;

        for( let node of nodes ){
            this.node = node;
            this._draw();
        }
    }


    _draw(){
        let parentId = this.node.parent;
        let parentObj = this.nodes[parentId];
        let {cx, cy, cr} = parentObj.position;

        let path = this.paper.path(`M${this.node.position.cx + this.node.position.cr},${this.node.position.cy + this.node.position.cr} L${cx + cr},${cy + cr}`);
        path.attr({
            stroke: '#000',
            strokeWidth: 1
        });

        // if(this.node.styles.shadow === true){
        //     path.attr({
        //         filter: this.paper.filter(Snap.filter.shadow(5, 10, 5, '#000000', .5))
        //     })
        // }

        //path.animate({d: `M${this.node.position.cx + this.node.position.cr},${this.node.position.cy + this.node.position.cr} L${cx + cr},${cy + cr}`}, 1000);
        this.paper.prepend(path);
    }


}

export default Nodes;