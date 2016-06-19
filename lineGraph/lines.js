let width = 500;
let height = 500;

const maxVal = d3.max(data, d => d.dailyAverageUsers);
const minVal = d3.min(data, d => d.dailyAverageUsers);

const maxDate = data[0].date;
const minDate = data[data.length - 1].date;
const margin = {top: 30, right: 60, bottom: 60, left: 60};

width = width - margin.left - margin.right,
height = height - margin.top - margin.bottom;

const mainDash = d3.select('.dash')
  .append('svg')
    .data(data)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// X AND Y PLOTTING
  // Ensure that the pixelated data scales appropriately to the data
  // y and x are now functions that can be called
  // to translate data into the appropraite pixel amount
const y = d3.scale.linear()
  .domain([minVal, maxVal])
  .range([height, 0]);

// x is a time scale.
// time scale extends scale.linear()
const x = d3.time.scale()
  .domain([minDate, maxDate])
  .range([0, width]);


// SET UP AXES
  // scale them with the appropriate y and x functions
  // set the number of x and y labels
const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(5);

const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(5);

// Append the axes
mainDash.append('g')
  .attr('class', 'axis')
  .call(yAxis);

// x axis needs to be moved from the top, to the bottom
mainDash.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0, ' + height + ')')
  .call(xAxis);


// AXIS LABELING
mainDash.append('text')
  .attr('class', 'axis-label')
  .attr('text-anchor', 'end')
  .attr('x', 20)
  .attr('y', height + 50)
  .text('Date');

mainDash.append('text')
  .attr('class', 'axis-label')
  .attr('text-anchor', 'end')
  .attr('y', 10)
  // .attr('dy', '-3.4em')
  .attr('dy', '-3.4em')
  .attr('x', -height / 2 + 50)
  .attr('transform', 'rotate(-90)')
  .text('Daily Active Users');


// LINE PLOTTING
let line = d3.svg.line()
  .x(d => x(d.date))
  .y(d => y(d.dailyAverageUsers));

mainDash.append('svg:path')
  .attr('d', line(data))
  .style('stroke', () => '#000000')
  .style('fill', 'none')
  .style('stroke-width', '2.5');


// Data points
let dataPoints = mainDash.append('svg:g');

dataPoints.selectAll('circle')
  .data(data, d => d.date)
  .enter()
  .append('svg:circle')
    .attr('cx', d => x(d.date))
    .attr('cy', d => y(d.dailyAverageUsers))
    .attr('r', 5)
    .on('mouseover', function(d) {
      console.log(this);
      var currentData = this.__data__;
      d3.select(this)
        .attr('r', 10)
        .attr('fill', 'green')
        .transition()
        .duration(500);
      dataPoints.append('text')
        .attr('x', x(currentData.date))
        .attr('y', y(currentData.dailyAverageUsers) - 15)
        .text(currentData.dailyAverageUsers);
    })
    .on('mouseout', function(d) {
      d3.select(this)
        .attr('r', 5)
        .attr('fill', 'black')
        .transition()
        .duration(500);
      dataPoints.selectAll('text').remove();
    });

// dataPoints.selectAll('text')
//   .data(data, d => d.date)
//   .enter()
//   .append('text')
//     .attr('x', d => x(d.date))
//     .attr('y', d => y(d.dailyAverageUsers) - 10)
//     .text(d => d.dailyAverageUsers);
