import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../Components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../Data/dummy';
import { useStateContext } from '../Contexts/ContextProvider';
import product9 from '../Data/product9.jpg';

const AddItem = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
   <></>
  );
};

export default AddItem;