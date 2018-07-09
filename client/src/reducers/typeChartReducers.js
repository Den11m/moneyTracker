export default function typeChart(state = 'Doughnut', action) {
    switch (action.type) {
        case 'CHANGE-TYPE-CHART':
            return action.chart;

        default:
            return state;
    }
}