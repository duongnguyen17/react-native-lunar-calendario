import React, { useCallback, useState } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { Calendar, ThemeType } from 'react-native-calendario';
import moment from 'moment';
import { MarkedDays } from 'react-native-month';

const THEME: ThemeType = {
  monthTitleTextStyle: {
    color: '#6d95da',
    fontWeight: '300',
    fontSize: 16,
  },
  weekColumnsContainerStyle: {},
  weekColumnStyle: {
    paddingVertical: 10,
  },
  weekColumnTextStyle: {
    color: '#b6c1cd',
    fontSize: 13,
  },
  nonTouchableDayContainerStyle: {},
  nonTouchableDayTextStyle: {
    fontSize: 15,
  },
  startDateContainerStyle: {},
  endDateContainerStyle: {},
  dayContainerStyle: {},
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  dayOutOfRangeContainerStyle: {},
  dayOutOfRangeTextStyle: {},
  todayContainerStyle: {},
  todayTextStyle: {
    color: '#6d95da',
  },
  activeDayContainerStyle: {
    backgroundColor: '#6d95da',
  },
  activeDayTextStyle: {
    color: 'white',
  },
  nonTouchableLastMonthDayTextStyle: {},
};

const truthyValue = true;

const DISABLED_DAYS = {
  '2019-11-20': truthyValue,
  '2019-11-10': truthyValue,
};

const START_DATE_1 = '2020-01-10';
const END_DATE_1 = '2020-04-15';
const MIN_DATE_1 = '2020-01-02';
const MAX_DATE_1 = '2020-04-20';

const FORMAT = 'YYYY-MM-DD';

const INITIAL_STATE = {
  disableRange: false,
  range: [
    moment(START_DATE_1, FORMAT).toDate(),
    moment(END_DATE_1, FORMAT).toDate(),
  ],
  minDate: moment(MIN_DATE_1, FORMAT).toDate(),
  maxDate: moment(MAX_DATE_1, FORMAT).toDate(),
};

const markedDays: MarkedDays = {
  '2020-03-12': {
    dots: [
      {
        color: 'red',
        selectedColor: 'green',
      },
      {
        color: 'blue',
        selectedColor: 'yellow',
      },
    ],
  },
  '2020-01-08': {
    theme: {
      dayContainerStyle: {
        backgroundColor: 'lightgray',
      },
    },
  },
};

const App = () => {
  const [range, setRange] = useState<Array<Date>>(INITIAL_STATE.range);

  const handleChangeDate = useCallback(
    (date) => {
      setRange(range.length === 0 ? [date] : [...range, date]);
    },
    [range]
  );

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Calendar
          onPress={handleChangeDate}
          range={range}
          startingMonth={'2019-11-01'}
          markedDays={markedDays}
          monthHeight={370}
          numberOfMonths={100}
          initialListSize={4}
          firstDayMonday
          theme={THEME}
          disabledDays={DISABLED_DAYS}
          showsVerticalScrollIndicator={false}
          calculateMonthHeightDynamically
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
