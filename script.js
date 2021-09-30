var randomColorPlugin = {

    // We affect the `beforeUpdate` event
    beforeUpdate: function (chart) {
        var backgroundColor = [];
        var borderColor = [];

        // For every data we have ...
        for (var i = 0; i < chart.config.data.datasets[0].data.length; i++) {

            // We generate a random color
            var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",";

            // We push this new color to both background and border color arrays
            backgroundColor.push(color + "0.2)");
            borderColor.push(color + "1)");
        }

        // We update the chart bars color properties
        chart.config.data.datasets[0].backgroundColor = backgroundColor;
        chart.config.data.datasets[0].borderColor = borderColor;
    }
};

// We now register the plugin to the chart's plugin service to activate it
Chart.pluginService.register(randomColorPlugin);

fetch('https://us-central1-amber-app-supercool.cloudfunctions.net/exportStats')
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        var k = Object.keys(data).map(function (k) { return k });
        var v = Object.keys(data).map(function (k) { return data[k] });
        const keys = k.reverse();
        const values = v.reverse();
        console.log('keys', keys);
        console.log('values', values);

        var ctx = document.getElementById('myChart');
        var stars = values;//[135850, 52122, 148825, 16939, 9763];
        var frameworks = keys;//['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'];

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: frameworks,
                datasets: [{
                    label: 'DAU',
                    data: stars
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })

    })

