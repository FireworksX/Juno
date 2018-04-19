/**
 * Created by spaceman on 18.04.2018.
 */
import Snap from 'snapsvg'

class DrawPaths {
    constructor (paper, nodes){
        this.paper = Snap(paper);
        this.nodes = nodes;
    }

    render(){
        for( let node of this.nodes ){
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

export default DrawPaths;