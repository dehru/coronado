import { LightningElement, track, wire } from 'lwc';
import getCases from "@salesforce/apex/Cases.getCases";
import chartjs from '@salesforce/resourceUrl/chartjs';
import { loadScript } from 'lightning/platformResourceLoader';

export default class Chart extends LightningElement {
    @track isChartJsInitialized;
    chart;
    cases;

    config = {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Actual Cases",
              data: [],
              borderWidth: 1,
              backgroundColor: "red",
              fill: false
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      };

    @wire(getCases)
    doGetCases(response) {
        if (response.data) {
        this.cases = response.data.map( day => day.Count__c );
        console.log(this.cases);
        this.error = undefined;
        this.updateChart();
        } else if (response.error) {
        // TODO: Implement common error handling.
        this.error = response.error;
        throw new Error("Failed to load workspaces: ", response.error);
        }
    }

    updateChart() {
        this.chart.data.datasets[0].data = this.cases;
        this.chart.data.labels = this.cases;
        this.chart.update();
    }

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            // loadStyle(this, chartjscss),
            loadScript(this, chartjs)
        ]).then(() => {
            const canvas = document.createElement('canvas');
            this.template.querySelector('div.chart').appendChild(canvas);
            const ctx = canvas.getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
            // this.chart.canvas.parentNode.style.height = '100%';
            // this.chart.canvas.parentNode.style.width = '100%';
        }).catch(error => {
            console.error(error);
        });
    }
}