/**
 * Created by spaceman on 18.04.2018.
 */
import Snap from 'snapsvg'

class DrawPaths {
    constructor (paper, nodes, _$router){
        this.paper = Snap(paper);
        this.nodes = nodes;
        this.$router = _$router; //Router от экземпляра VUE
        this.lightObject = null;
    }

    render(){
        let index = 0;
        for( let node of this.nodes ){
            this.node = node;
            this._drawNode(index);
            this._drawPaths();
            index++;
        }
        return this;
    }

    light(enabled){
        if(enabled){
            let light = this.paper.gradient(`r(0.5, 0.2, .6)rgba(255, 255, 255, .5)-transparent`);
            let cir = this.paper.circle(screen.width / 2, 0, screen.height).attr({
                fill: light
            });
            this.paper.prepend(cir);
            this.lightObject = cir;
            return this;
        }else if(!enabled && this.lightObject !== null){
            this.lightObject.remove();
            return this;
        }
    }

    _drawNode(index){
        let {cw, ch, cx, cy} = this.node.position;
        let fill = this.node.styles.fill;
        let title = this.node.name;
        let rect = this.paper.rect(cx, cy, cw, ch)
            .attr({
                transform: `rotate(45 ${cx + cw / 2} ${cy + ch / 2})`,
                fill: '#1E202D',
                strokeWidth: 2,
                stroke: '#E1E7F4'
            });

        let rectProgress = this.paper.rect(cx, cy, cw, ch)
            .attr({
                fill: '#1E202D',
                strokeWidth: 2,
                stroke: '#E1E7F4'
            });

        let textCalc = this.paper.text(-100, -100, title)
            .attr({
                fontSize: 16,
                fontWeight: 300,

            });

        if(this.node.styles.shadow === true){
            rect.attr({
                filter: this.paper.filter(Snap.filter.shadow(5, 10, 5, '#000000', .7))
            })
        }

        let textLength = textCalc.node.textLength.baseVal.value;

        let text = this.paper.text(cx + textLength / 2 + cw / 2 - textLength, cy + cw / 2 + 5, title)
            .attr({
                fontSize: 16,
                fontWeight: 300,
                textTransform: 'uppercase',
                fill: '#fff'
            });

        let group = this.paper.g(rect, rectProgress, text);

        if(this.nodes[index].progress.enabled === true) group.attr({cursor: 'pointer'});

        group.click(() => {
            if(this.nodes[index].progress.enabled === true){
                this.$router.push('/lessons/'+ index);
            }
        });

        textCalc.remove();

        return group;
    }

    _drawPaths(){
        let parentId = this.node.parent;
        let parentObj = this.nodes[parentId];
        let {cx, cy, cw, ch} = parentObj.position;
        let path = this.paper.path(`M${this.node.position.cx + cw / 2},${this.node.position.cy + ch / 2}`);
        path.attr({
            stroke: '#ededed',
            strokeWidth: 1
        });

        if(this.node.styles.shadow === true){
            path.attr({
                filter: this.paper.filter(Snap.filter.shadow(5, 10, 5, '#000000', .7))
            })
        }

        path.animate({d: `M${this.node.position.cx + cw / 2},${this.node.position.cy + ch / 2} L${cx + cw / 2},${cy + ch / 2}`}, 1000);
        this.paper.prepend(path);
    }


}

export default DrawPaths;