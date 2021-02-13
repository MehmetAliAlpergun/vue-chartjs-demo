<script>
  import { Line } from 'vue-chartjs';
  import moment from 'moment';

  export default {
    extends: Line,
    props: {
    },
    data: {
      Rates: []
    },
    mounted() {
    },
    methods: {
      SetRates(data) {
        var rates = data.map(x => {
          let rObj = {};
          rObj.rate = x.InflationRateRounded;
          rObj.month = x.MonthFormatted;
          return rObj;
        });
        this.Rates = rates;
        this.RenderChart(this.Rates);
      },
      FilterWithRange(range) {
        if (range) {
          var filteredArr = this.Rates.filter(x => moment(x.month) >= moment(range.startDate) && moment(x.month) <= moment(range.endDate));
          this.RenderChart(filteredArr);
        }
        else {
          this.RenderChart(this.Rates);
        }
      },
      RenderChart(rates) {
        this.renderChart(
          {
            labels: rates.map(x => x.month),
            datasets: [
              {
                label:'Inflation Rate',
                borderColor: "rgba(1, 116, 188, 0.50)",
                pointBackgroundColor: "rgba(171, 71, 188, 1)",
                data: rates.map(x => x.rate)
              }
            ],

          }, {
          responsive: true,
          maintainAspectRatio: false
        });
      }
    }
  }
</script>
<style scoped>
</style>
