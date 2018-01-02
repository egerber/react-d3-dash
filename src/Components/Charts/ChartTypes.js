import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

//every new Chart type must be added here in the format ("Name of Chart", Chart Object)
var chartTypes=new Map();

chartTypes.set("Pie Chart",PieChart);
chartTypes.set("Bar Chart", BarChart);
chartTypes.set("Line Chart",LineChart);

export default chartTypes;