import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { min, max } from 'd3-array';
import { scaleTime, scaleLinear, ScaleTime, ScaleContinuousNumeric, scaleUtc } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line, curveLinear, curveMonotoneX } from 'd3-shape';
import { select } from 'd3-selection';
import { Forecast } from '@classes/Forecast';

@Component({
    selector: 'app-forecast-chart',
    templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
    element: any;
    svgContainer: any;
    padding = {
        top: 20,
        left: 25,
        right: 15,
        bottom: 25
    };
    width: number;
    height = 200 + this.padding.bottom + this.padding.top;
    
    xScale: ScaleTime<number, number>;
    yScale: ScaleContinuousNumeric<number, number>;
    
    data: Forecast[];
    
    @Input('data')
    set _data(data: Forecast[]) {
        if (typeof data === 'undefined') return;
        this.data = data.slice(0, 7);
        this.renderAll();
    }
    
    constructor(private elementRef: ElementRef) {
    }
    
    ngOnInit() {
    }
    
    renderAll() {
        this.element = this.elementRef.nativeElement.getElementsByClassName('forecast-chart')[0];
        
        this.createSvgContainer();
        this.renderXAxis();
        this.renderYAxis();
        this.renderChart();
    }
    
    createSvgContainer() {
        this.width = this.element.clientWidth;
        
        this.svgContainer = select(this.element)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
    }
    
    renderXAxis() {
        const xDomain = [min(this.data, (d: Forecast) => new Date(d.dt * 1000)), max(this.data, (d: Forecast) => new Date(d.dt * 1000))];
        
        this.xScale = scaleUtc()
            .domain(xDomain)
            .range([this.padding.left, this.width - this.padding.right]);
        
        const xAxis = axisBottom(this.xScale).tickSizeInner(0).tickPadding(10);
        
        this.svgContainer.append('g')
            .classed('x-axis', true)
            .attr('transform', 'translate(0, ' + (this.height - this.padding.bottom) + ')')
            .call(xAxis);
        
        this.svgContainer.selectAll('g.x-axis g.tick')
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -(this.height - this.padding.bottom - this.padding.top));
    }
    
    renderYAxis() {
        
        let maxY = max(this.data, (d: Forecast) => d.main.temp);
        let minY = min(this.data, (d: Forecast) => d.main.temp);
    
        maxY = maxY > 0 ? maxY + 4 : maxY - 4;
        minY = minY > 0 ? minY + 4 : minY - 4;
        
        const yDomain = [maxY < 0 ? 0 : maxY, minY > 0 ? 0 : minY];
        
        this.yScale = scaleLinear()
            .domain(yDomain)
            .range([this.padding.top, this.height - this.padding.bottom]);
        
        const yAxis = axisLeft(this.yScale).ticks(5).tickSizeInner(0).tickPadding(10).tickFormat((d) => d + '°');
        
        this.svgContainer.append('g')
            .classed('y-axis', true)
            .attr('transform', 'translate(' + this.padding.left + ', 0)')
            .call(yAxis);
        
        this.svgContainer.selectAll('g.y-axis g.tick')
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', this.width - this.padding.left - this.padding.right)
            .attr('y2', 0);
    }
    
    renderChart() {
        const chartLine = line<Forecast>()
            .x((d: Forecast) => this.xScale(new Date(d.dt * 1000)))
            .y((d: Forecast) => this.yScale(d.main.temp)).curve(curveMonotoneX);
        
        this.svgContainer.append('path')
            .attr('d', chartLine(this.data))
            .classed('line', true);
    }
}
