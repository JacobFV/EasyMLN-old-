# ![](/docs/content/img/OpenMLN-Icon.png) OpenMLN

Generate, analyze, and research multilayer networks (MLN).

## Design

While a declarative tool for analyzing MLN's would be nice, this tool takes the procedural approach. Note: these ideas are not final.

Users **edit** and **run** **workflows** which are **graphs** of uniquely-named **nodes** and workflow-level meta information. Nodes represent a data-flow operation in the workflow. They connect to each other by **input ports** and **output ports**. Some nodes are **parameter nodes** which accept oracle input when a workflow is **run**. Other nodes are **output nodes** which output data from a **workflow run** for vizualization or other analyses. Every workflow run consists of a workflow graph, all workflow run parameters, all workflow run outputs, and (optionally) the value of every intermediate output port. Users can **share** individual workflow runs or their entire workflow (which includes all **automatic and named versions** of the workflow) with individual-level and everybody-level access control (like Google Drive). The user can also **export** their **workflow run report** into an animated html document or a PDF from a still frame of the html export. Workflow run reports are entirely self contained static .html documents that can be view using a web browser without Internet connection. These will be publication quality documents and slides that dozens of researchers chose to use.

![](/docs/content/img/OpenMLN-UI.png) 

I don't think OpenMLN should (yet) focus on offering every concievable operation. However, these are the ones that I feel are essential for processing MLN's:
- Inputs:
    - Constant: just outputs a constant of user specified type T
    - Parameter: like Constant but its value can be edited in the "Run" view
    - Open: any value type can be opened from a resource locator by deserializing the raw json representation of the javascript object. Open also supports some standard file types such as .csv, .tsv, etc.
- MLN Generation:
    - Layer: Converts a `Table` input to a `Layer` output. User selects a feature column, indicates the feature type (date, number, string, etc), and chooses an equivalence metric (Jaccard, Cosine, Euclidean, Haversine, Multi-range, Fixed-range) and associated parameters.
    - Interlayer: Converts 2 `Layer` inputs to an `Interlayer` output. User chooses an equivalence metric (Jaccard, Cosine, Euclidean, Haversine, Multi-range, Fixed-range) and associated parameters.
- MLN Analysis
    - &Theta; functions:
        - &Theta;-AND 2 `layer`s to 1 `layer`
        - &Theta;-OR 2 `layer`s to 1 `layer`
        - &Theta;-NOT 1 `layer` to 1 `layer`
        - &Theta;-Iterative Generate and Merge Process
        - &Theta;-Maximum Weighted Matching (MWM)
        - &Theta;-Maximum Weight with Relaxed Matching (MWRM)
        - &Theta;-Maximum Weight Perfect Match (MWPM)
        - &Theta;-MWM with Ties (MWMT)
        - &Theta;-Equivalence Metric: one of {Jaccard, Cosine, Euclidean, Haversine, Multi-range, Fixed-range} with parameters
        - 
    - &Psi; functions: (most of these functions can be optionally normalized by the vertex value sum or number of vertices)
        - &Psi;-Louvain
        - &Psi;-Infomap
        - &Psi;-Leidel
        - &Psi;-Walktrap
        - &Psi;-Degree: indegree/outdegree/ave degree of a vertex
        - &Psi;-Closeness: 
        - &Psi;-Betweenness: number of unique paths through a vertex. 
        - &Psi;-Exponential: e^x optionally normalized over all vertex exponentials
        - &Psi;-Group degree centrality: number of non-group vertices that are connected to a group of N vertices.
        - &Psi;-Subdue (Substructure): how much this vertex resembles the verteces of the most frequently occuring substructure (not sure)
        - &Psi;-Single substructure: This node actually accepts two inputs: the layer and the substructure (which is a `Layer` object)
    - Other:
        - Min: absolute min or min K elements
        - Max: absolute max or max K elements
        - Repeated &Psi;-&Theta; Node: accepts N `Layer`, applies the user-selected &Psi; function in parallel, then map-reduces the transformed layers using &Theta; and outputs the final layer. 
        - &Psi;-Custom math expression: Basic math expression (+,-,\*,/,sin,cos,mod,etc.) implemented entirely using javascript. (In fact, users could theoretically access any accessible javascript variable here)
- Output:
    - Vizualize: most of these tools generate interactive (zoomable, playable) outputs
        - Violin, Density, Histogram, Boxplot: for N sets/lists/feature columns/layer values/edge values of data that are (optionally) animated
        - Scatterplot: just a scatterplot for N pairs of sets/lists/feature columns/layer values/edge values
        - Lineplot: N pairs of sets/lists/feature columns/layer values/edge values in lineplots that are (optionally) smoothed, interpolated, and animated.
        - Choropleth Map: Minimally support US, Indian States, and World map. Maybe also a 3D globe.
        - Pictograph: pcitogram for N sets/lists/feature columns/layer values/edge values of data using repeated earths, countries, currencies, humans, or user-uploaded picture. Optionally animated.
        - Pie Chart (besides slices of a circle, user can select slices of earth, of countries, currencies, person, or user-uploaded picture)
        - Raw Graph: displays single zoomable, pannable graph with optional edge and vertex labeling and coloring.
        - Raw Multilayer Network: displays manuverable, pannable, and zoomable 3D orthographic projection of an MLN with optional layer, vertex, interlayer and intralayer edge labeling and coloring. If nodes and edges are colored by layer, they cannot be colored by value. 
    - Save: Complement of Open
- Custom:
    - Composite:
        - list of this users' composite nodes
    - Script: any javascript function. The Script Node automatically reads the function signature and changes the node's input ports to match. 
        - list of this users' custom scripts

Users drag and drop nodes from a popdown menu onto the workspace. It should be possible to express the functionality of every node using only a script node. I do not think we should enforce strong typing (we shouldn't raise an error when a read CSV output connects to a &Theta; function input; all values are just javascript objects). However, we could provide tpye-hints by coloring ports by their preferred type (eg: file = grey; table = pink; boolean/number = red, string = brown, date/time/duration = purple; layer = blue; interlayer edges = green).

## Application Architecture

We may start just testing locally. Since you know where to get cheap hosting, that should work fine. Later, we will want to move to large infrastructure. My philosophy is to let the users pay with their own compute. I prefer tools that make the most of existing free infrastructure (like Google Drive integration, client-side rendering with React, client-side `window.localStorage`, etc) However, I am not hard on any particular idea.

![](/docs/content/img/OpenMLN-Architecture.png)

## Roadmap

Note: this document presented a vert top-down design. There are many off-the-shelf tools, libraries, snippets, etc. that we could use to implement the functionality of nodes.
- [Pymnet: Multilayer Networks Library for Python](http://www.mkivela.com/pymnet/)
- [muxViz](https://manlius.github.io/muxViz/index.html) enables the visualization and the analysis of interconnected multilayer networks. It supports the analysis of multilayer data:
- check out all the vizualizations open on [vizhub](https://vizhub.com/)

- [ ] This weekend: Basic NodeEditor and RunWorkflow views, a few Nodes implemented
- [ ] Next: all the above nodes (except maybe the vizualization nodes), web server, DNS registration, and SSL tokens
- [ ] Next Friday's team meeting: working beta for presentation
- [ ] Future: Save workflow versions, Google drive integration, and Text-to-Workflow Generator, 
- [ ] Video presentation, simple website, research paper, speak at conferences, solve a real problem with OpenMLN, etc.
- [ ] Find a superstar freshman (or to-be grad student) with full-stack experience to takeover

The project diagrams are on [Diagrams.net](https://drive.google.com/drive/folders/10uubRkhLK4zqljuTjq094QC2ZqNVP6Cp?usp=sharing)