<template>
  <div ref="parent" class="parent">
    <div class="filter-container">
      <md-field>
        <label for="countries">Countries</label>
        <md-select v-model="SelectedCountry" class="countries-menu">
          <md-option v-for="country in Countries" :key="country.code" :value="country.code">{{country.display}}</md-option>
        </md-select>
      </md-field>
      <div class="date-range-field" v-if="SelectedCountry">
        <date-range-picker ref="datepicker"
                           v-model="SelectedDateRange"
                           :showDropdowns="true"
                           :autoApply="true"
                           :linkedCalendars="false"
                           :ranges="false"
                           @update="OnDateSelected"
                           class="range-picker">
          <template v-slot:input="picker" style="min-width: 350px;">
            <span v-if="SelectedDateRange.startDate && SelectedDateRange.endDate">
              {{ SelectedDateRange.startDate | formatDate }} - {{ SelectedDateRange.endDate | formatDate }}
            </span>
            <span v-else>
              Select Date
            </span>
          </template>
        </date-range-picker>
        <md-button class="md-icon-button md-dense clear-button" @click="ClearDate">
          <md-icon>clear</md-icon>
        </md-button>
      </div>
    </div>
    <div class="charts-area">
      <inflation-line-chart class="chart-item" ref="inflationlinechart"></inflation-line-chart>
      <inflation-bar-chart class="chart-item" ref="inflationbarchart"></inflation-bar-chart>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';
  import InflationLineChart from './InflationLineChart.vue';
  import InflationBarChart from './InflationBarChart.vue';
  import DateRangePicker from 'vue2-daterange-picker'
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

  export default {
    name: 'Home',
    components: {
      InflationLineChart,
      InflationBarChart,
      DateRangePicker
    },
    data() {
      return {
        Countries: [],
        SelectedCountry: '',
        SelectedDateRange: {
          startDate: '',
          endDate: ''
        }
      }
    },
    watch: {
      SelectedCountry: function (val) {
        this.GetDataForCountry(val);
      }
    },
    methods: {
      Translate: function (text) {
        return this.$t(text);
      },
      ApplicationStarted: function () {
        this.Countries = [
          {
            display: "Belarus",
            code: "belarus"
          },
          {
            display: "Turkey",
            code: "turkey"
          },
          {
            display: "USA",
            code: "united-states"
          },
          {
            display: "Canada",
            code: "canada"
          },
          {
            display: "Brazil",
            code: "brazil"
          },
          {
            display: "France",
            code: "france"
          },
          {
            display: "Germany",
            code: "germany"
          }
        ]
      },
      GetDataForCountry(val) {
        ServiceCall(this, "GET", "https://www.statbureau.org/get-data-json?jsoncallback=?&country=" + val, null, this.GetAPISuccess, this.GetAPIError)
      },
      GetAPISuccess: function (sender, data) {
        this.$refs.inflationlinechart.SetRates(data);
        this.$refs.inflationbarchart.SetRates(data);
      },
      GetAPIError: function (error) {
        console.log(error);
      },
      OnToggleCalendar: function () {
        this.$refs.datepicker.togglePicker();
      },
      OnDateSelected: function (daterange) {
        this.$refs.inflationlinechart.FilterWithRange(daterange);
        this.$refs.inflationbarchart.FilterWithRange(daterange);
      },
      ClearDate: function () {
        this.SelectedDateRange = {
          startDate: '',
          endDate: ''
        };
        this.$refs.inflationlinechart.FilterWithRange(null);
        this.$refs.inflationbarchart.FilterWithRange(null);
      }
    },
    mounted: function () {
      this.$router.app.ApplicationStarted = this.ApplicationStarted;
    },
    computed: {

    },
    filters: {
      formatDate: function (value) {
        if (!value) return ''
        value = value.toString()
        return moment(value).format('LL')
      },
      formatPostDate: function (value) {
        if (!value) return ''
        value = value.toString()
        return moment(value).format('dddd, MMMM Do YYYY, h:mm:ss a')
      }
    }
  }
</script>

<style scoped>
</style>
