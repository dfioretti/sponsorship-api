// other view code
var x_click = 0;
var y_click = 0;
$(document).ready(function() {

});
//$(function() {
//  if ( $("#myDiagram").length ) {
//  }
/*
  $('.slider').slider();
  $('.slider').width("100%");
  $("#node_form").click(function() {
    $("#node_form").hide();
  });
  $('body').click(function(e) {
    var offset = $(this).offset();
    x_click = (e.pageX - offset.left);
    y_click = (e.pageY - offset.top);
  });
  }
  */
//});

// all gojs code
function initilizeScoreCanvas() {
  var data = [
    {
      "id": 0,
      "name": "Syndicated", "list": [
          { "id": 1, "name": "Scarborough", "list": [
            { "id": 100, "name": "Avid Fan Index"},
            { "id": 101, "name": "Avid Fan Count"},
            { "id": 102, "name": "Casual Fan Index"},
            { "id": 103, "name": "Casual Fan Count"}
          ] },
          { "id": 2, "name": "Nielsen" },
          { "id": 3, "name": "Simmons" },
          { "id": 4, "name": "Repucom" }
      ]
    },
    {
      "id": 5,
      "name": "Social", "list": [
        { "id": 5, "name": "Twitter", "list": [
            { "id": 1, "name": "Follower Count" },
            { "id": 2, "name": "Post Frequency" },
            { "id": 3, "name": "Average Retweets" }
        ]},
        { "id": 2, "name": "Facebook", "list": [
            { "id": 1, "name": "Fan Count" },
            { "id": 2, "name": "Post Frequency" }
        ]},
        { "id": 3, "name": "Instagram", "list": [
          { "id": 1, "name": "Follower Count" },
          { "id": 2, "name": "Post Frequency" }
        ]}
      ]
    }
  ];
  $('#drill-button').drilldownSelect({ appendValue: true, data: data});

  if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
  var _$ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    _$(go.Diagram, "myDiagram", // must be the ID or reference to div
      {
        initialContentAlignment: go.Spot.Center,
        // make sure users can only create trees
        validCycle: go.Diagram.CycleDestinationTree,
        // users can select only one part at a time
        maxSelectionCount: 1,
        layout:
          _$(go.TreeLayout,
            {
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 35,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 20
            }),
        // support editing the properties of the selected person in HTML
        "ChangedSelection": onSelectionChanged,
        "TextEdited": onTextEdited,
        // enable undo & redo
        "undoManager.isEnabled": true
      });

  // when the document is modified, add a "*" to the title and enable the "Save" button
  myDiagram.addDiagramListener("Modified", function(e) {
    var button = document.getElementById("SaveButton");
    if (button) button.disabled = !myDiagram.isModified;
    var idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substr(0, idx);
    }
  });

  // turned these off...may want to use this though..?
  var levelColors = ["#AC193D/#BF1E4B", "#2672EC/#2E8DEF", "#8C0095/#A700AE", "#5133AB/#643EBF",
                     "#008299/#00A0B1", "#D24726/#DC572E", "#008A00/#00A600", "#094AB2/#0A5BC4"];

  // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
  myDiagram.layout.commitNodes = function() {
    go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);  // do the standard behavior
    // then go through all of the vertexes and set their corresponding node's Shape.fill
    // to a brush dependent on the TreeVertex.level value
    myDiagram.layout.network.vertexes.each(function(v) {
      if (v.node) {
        var level = v.level % (levelColors.length);
        var colors = levelColors[level].split("/");
        var shape = v.node.findObject("SHAPE");
        colors = ["#87AFDE", "#87AFDE"];
        if (shape) shape.fill = _$(go.Brush, "Linear", { 0: colors[0], 1: colors[1], start: go.Spot.Left, end: go.Spot.Right });
      }
    });
  }

  // when a node is double-clicked, add a child to it
  function nodeDoubleClick(e, obj) {
    // TODO: make this setup properly...
    var clicked = obj.part;
    if (clicked !== null) {
      var thisemp = clicked.data;
      myDiagram.startTransaction("add component");
      var nextkey = (myDiagram.model.nodeDataArray.length + 1).toString();
      var newemp = { key: nextkey, name: "(new person)", title: "", parent: thisemp.key };
      myDiagram.model.addNodeData(newemp);
      myDiagram.commitTransaction("add component");
      myDiagram.contentAlignment = go.Spot.Center;
    }
  }

  function closeNode(e, obj) {
    if (myDiagram.nodes.count == 1) {
      alert("ERROR: Scores require at least one componenet!");
      return;
    }
    var clicked = obj.part;
    myDiagram.remove(clicked);
    myDiagram.contentAlignment = go.Spot.Center;
    // todo - do i want to recurively delete all nodes?
    /*
    if (clicked !== null) {
      var childNodes = getChildNodes(clicked);
      console.log(childNodes);
      $.each(childNodes, function() {
        myDiagram.remove(this);
      });
    }*/
  }

  function getChildNodes(deleteNode) {
    var children = [];
    var allConnected = deleteNode.findNodesConnected();

    while (allConnected.next()) {
      var child = allConnected.value;

      if (isChildNode(deleteNode, child)) {
        children.push(child);
        var subChildren = getChildNodes(child);
        $.each(subChildren, function() {
          children.push(this);
        });
      }
    }
    return children;
  }

  function isChildNode(currNode, currChild) {
    var links = myDiagram.links.iterator;
    while (links.next()) {
      var currentLinkModel = links.value.data;
      if (currentLinkModel.from === currNode.data.key && currentLinkModel.to === currChild.data.key) {
        return true;
      }
    }
    return false;
  }
  function nodeClick(e, obj) {
    var node = e.diagram.selection.first();

    if (node instanceof go.Node) {
      $('#component-name').val(node.data.component)
      var x = $("#weight-slider").slider();
      x.slider('setValue', node.data.weight);
    //  updateProperties(node.data);
    } else {
    //  updateProperties(null);
    }

    //$('#component-name').val("NAME");
    //$(".update").click(function() {
    //document.getElementById("name").value = data.name || "";

    //    x.slider('setValue', 10);
    //});

  }

  // this is used to determine feedback during drags
  function mayWorkFor(node1, node2) {
    if (!(node1 instanceof go.Node)) return false;  // must be a Node
    if (node1 === node2) return false;  // cannot work for yourself
    if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
    return true;
  }

  // This function provides a common style for most of the TextBlocks.
  // Some of these values may be overridden in a particular TextBlock.
  function textStyle() {
    return { font: "9pt Avenir-Medium", stroke: "white" };
  }

  function findIcon(icon) {
    alert(icon);
    if (icon === "/sum.png")
      return "/sum.png";
    if (icon === "/divide.png")
      return "/divide.png"
  }
  // This converter is used by the Picture.
  function findHeadShot(key) {
    //return "";
    //if (key > 16) return ""; // There are only 16 images on the server
    return "/cancel-button.png";
  };


  // define the Node template
  myDiagram.nodeTemplate =
    _$(go.Node, "Auto",
      { click: nodeClick },
      {
        selectionAdornmentTemplate:
          _$(go.Adornment, "Auto",
            _$(go.Shape, "RoundedRectangle",
              { fill: null, stroke: "dodgerblue", strokeWidth: 6 },
              new go.Binding("stroke", "color")),
              _$(go.Placeholder)
         )
      },
      { doubleClick: nodeDoubleClick },
      { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
        mouseDragEnter: function (e, node, prev) {
          var diagram = node.diagram;
          var selnode = diagram.selection.first();
          if (!mayWorkFor(selnode, node)) return;
          var shape = node.findObject("SHAPE");
          if (shape) {
            shape._prevFill = shape.fill;  // remember the original brush
            shape.fill = "#03387A";
          }
        },
        mouseDragLeave: function (e, node, next) {
          var shape = node.findObject("SHAPE");
          if (shape && shape._prevFill) {
            shape.fill = shape._prevFill;  // restore the original brush
          }
        },
        mouseDrop: function (e, node) {
          var diagram = node.diagram;
          var selnode = diagram.selection.first();  // assume just one Node in selection
          if (mayWorkFor(selnode, node)) {
            // find any existing link into the selected node
            var link = selnode.findTreeParentLink();
            if (link !== null) {  // reconnect any existing link
              link.fromNode = node;
            } else {  // else create a new link
              diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
            }
          }
          myDiagram.contentAlignment = go.Spot.Center;
        }
      },
      // for sorting, have the Node.text be the data.name
      new go.Binding("text", "name"),
      // bind the Part.layerName to control the Node's layer depending on whether it isSelected
      new go.Binding("layerName", "isSelected", function(sel) { return sel ? "Foreground" : ""; }).ofObject(),
      // define the node's outer shape
      _$(go.Shape, "RoundedRectangle",
        {
          width: 200, height: 100,
          name: "SHAPE", fill: "white", stroke: null,
          // set the port properties:
          portId: "", fromLinkable: false, toLinkable: false, cursor: "move",
        }),
        _$(go.Panel,
          { width: 200, height: 100 }, // panel is the main container
          _$(go.Picture, { click: closeNode }, { position: new go.Point(175, 5), desiredSize: new go.Size(16, 16), source: '/cancel-button.png' }), // end picture
          _$(go.TextBlock, "Component", textStyle(),
            {
              position: new go.Point(10, 10),
              desiredSize: new go.Size(160, 20),
              font: "14pt Avenir-Medium",
              textAlign: "center"
            },
            new go.Binding("text", "component").makeTwoWay()),
            _$(go.Picture, {
              name: '/divide.png',
              position: new go.Point(79, 44),
              desiredSize: new go.Size(32, 32),
              //icon: '/divide.png'
              // i think i can bind the source to a key or ID or something
              //source: '/divide.png'
            }, new go.Binding('source', 'name', findIcon)),
            _$(go.TextBlock, "100%", textStyle(),
              {
                position: new go.Point(10, 80),
                desiredSize: new go.Size(85, 20),
                font: "11pt Avenir-Medium",
              },
            new go.Binding("text", "weight").makeTwoWay())
        )
      );

  // define the Link template
  myDiagram.linkTemplate =
    _$(go.Link, go.Link.Orthogonal,
      { corner: 5, relinkableFrom: true, relinkableTo: true },
      _$(go.Shape, { strokeWidth: 4, stroke: "#E7E7E7" }));  // the link shape

  // read in the JSON-format data from the "mySavedModel" element
  load();
}

// Allow the user to edit text when a single node is selected
function onSelectionChanged(e) {
  var node = e.diagram.selection.first();
  if (node instanceof go.Node) {
    updateProperties(node.data);
  } else {
    updateProperties(null);
  }
}

// Update the HTML elements for editing the properties of the currently selected node, if any
// TODO update this to update my properties panel - need to build that shit still...
function updateProperties(data) {
  return;
  if (data === null) {
    document.getElementById("propertiesPanel").style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("title").value = "";
    document.getElementById("comments").value = "";
  } else {
    document.getElementById("propertiesPanel").style.display = "block";
    document.getElementById("name").value = data.name || "";
    document.getElementById("title").value = data.title || "";
    document.getElementById("comments").value = data.comments || "";
  }
}

// This is called when the user has finished inline text-editing
function onTextEdited(e) {
  var tb = e.subject;
  if (tb === null || !tb.name) return;
  var node = tb.part;
  if (node instanceof go.Node) {
    updateProperties(node.data);
  }
}

// Update the data fields when the text is changed
function updateData(text, field) {
  var node = myDiagram.selection.first();
  if (node === null) {
    return;
  }
  // maxSelectionCount = 1, so there can only be one Part in this collection
  var data = node.data;
  if (node instanceof go.Node && data !== null) {
    var model = myDiagram.model;
    model.startTransaction("modified " + field);
    if (field === "sum")
      model.setDataProperty(data, "name", "/sum.png");
    else if (field === "div")
      model.setDataProperty(data, "name", "/divide.png");
    if (field === "component") {
      model.setDataProperty(data, "component", text);
    } else if (field === "weight") {
      model.setDataProperty(data, "weight", text);
    } else if (field === "comments") {
      model.setDataProperty(data, "comments", text);
    } else if (field === "icon") {
      if (text === "sum") {

      }
    }
    model.commitTransaction("modified " + field);
  }
}

// Show the diagram's model in JSON format
function save() {
  document.getElementById("mySavedModel").value = myDiagram.model.toJson();
  myDiagram.isModified = false;
}

function zoomIn() {
  var currentScale = myDiagram.scale;
  myDiagram.scale = (currentScale + 0.1);
}

function zoomOut() {
  myDiagram.scale = myDiagram.scale - 0.1;
}

function load() {
  //myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
  // TODO: update this to a dummy node placeholder
  var model = {};
  var nodeDataArray = [];
  var node = {};
  node['key'] = 1;
  node['component'] = "Component";
  node['icon'] = 'divide.png';
  node['weight'] = "50";
  nodeDataArray.push(node);
  model['class'] = "go.TreeModel";
  model['nodeDataArray'] = nodeDataArray;

  myDiagram.model = go.Model.fromJson(JSON.stringify(model));

  //go.Model.fromJson('"{ "class": "go.TreeModel","nodeDataArray":[{"key":"1", "name":"Stella Payne Diaz", "title":"CEO"},]}"');
  //alert("af");
}
