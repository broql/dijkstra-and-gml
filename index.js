const gml2json = require('gml2json');
const program = require('commander');
const fs = require('fs');
const Graph = require('graphology');
const dijkstra = require('graphology-shortest-path/dijkstra');

program
    .version('0.1.0')
    .option('-f, --file [name]', 'GML file to read from')
    .parse(process.argv);

console.log(`Reading from ${program.file}`);

const gmlFileContent = fs.readFileSync(program.file, 'utf8');
const networkGraph = gml2json.parse(gmlFileContent);

// Begin graphology
const graph = new Graph();

networkGraph.graph.nodes.forEach(node => {
    graph.addNode(node.id);
});

networkGraph.graph.edges.forEach(edge => {
    graph.addEdge(edge.source, edge.target, {
        weight: edge.value
    });
});

const path = dijkstra.bidirectional(graph, 0, 2);

console.log('Shortest path according to Dijkstra:')
console.log(path)