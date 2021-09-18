abstract class Node {
    // WAIT: use rete blocks instead. 
    // I just need to be able to serialize/deserialize the graph
    // and then read its nodes and edges. 
    id: string;
    inbound: { [key: string]: Node } = {};
    
    positionx: number;
    positiony: number;
    expanded: boolean;

}