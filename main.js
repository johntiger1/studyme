var category = "Total";

$(function() {
    addTabs();
    
    addGraphTypes();
    
    // init firebase
    var database = firebase.database();
    
    // test firebase
    database.ref('test').on('value', function(snapshot) {
		var value = snapshot.val();
		$('#test').text(value);
	});    
    
    // test graph 
    var data = [
      {
        x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        y: [1.5, 1.2, 1.7, 1.3, 0.5, 3.4, 3.5],
        type: 'scatter'
      }
    ];

    var layout = {
      title: 'Average Hours Studied Per Day of the Week for April 2016',
      xaxis: {
        title: 'Day',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        title: 'Number of Hours',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    };
    
    Plotly.newPlot('graphContainer', data, layout);
})

function addTabs() {
    var tabs = [
        "Total",
        "Advanced Calculus 2",
        "Electronic Properties of Materials",
        "Systems and Signals",
        "How To Survive ECE"
        ];
    
    var heightPercent = 100 / tabs.length;
    
    tabs.forEach(function(tabName) {
        var tabContainer = $("#leftContainer");
        // add tab to html
        tabContainer.append(
            "<a href=\"#\"><div class=\"sideTab\" style=\"height:" + heightPercent + "%\">" + 
                "<span>" + tabName + "</span>" +
            "</div></a>"
        )
    });
    
    $(".sideTab").on("click", function(event) {
        
    })
}

function addGraphTypes() {
    var graphTypes = [
        "Daily Study", // scatter
        "Weekly Study",
        "Weekly Study Frequency", // scatter
        "Monthly Study Frequency",
        "All-time Study Frequency",
        "Average Weekly Study", // bar
        "Average Monthly Study",
        "Average All-time Studied",
        ];
        
    graphTypes.forEach(function(graphType, index) {
        var buttonDiv = $("#" + (index + 1));
        // add tab to html
        buttonDiv.append(
            "<a href=\"#\"><div class=\"graphTypeButton\">" + 
                "<span>" + graphType + "</span>" +
            "</div></a>"
        )
    });
}