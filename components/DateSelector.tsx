import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DayItem = {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isSelected?: boolean;
};

type MonthData = {
  year: number;
  month: number; // 0-11
  days: DayItem[];
};

type DateSelectorProps = {
  onDateChange: (date: Date) => void;
  selectedDate?: Date;
};

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DateSelector = ({ onDateChange, selectedDate = new Date() }: DateSelectorProps) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [monthData, setMonthData] = useState<MonthData>(() => 
    generateMonthData(currentYear, currentMonth, selectedDate)
  );

  function generateMonthData(year: number, month: number, selected?: Date): MonthData {
    const result: MonthData = {
      year,
      month,
      days: [],
    };

    // Get first day of month and last day of month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get the day of week for the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    // Convert to Monday-based (0 = Monday, ..., 6 = Sunday)
    let firstDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (firstDayOfWeek < 0) firstDayOfWeek = 6; // Sunday becomes 6
    
    // Add days from previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonthLastDay = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(prevMonthYear, prevMonth, day);
      result.days.push({
        day,
        date,
        isCurrentMonth: false,
        isSelected: selected && isSameDay(date, selected)
      });
    }
    
    // Add days of current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      result.days.push({
        day,
        date,
        isCurrentMonth: true,
        isSelected: selected && isSameDay(date, selected)
      });
    }
    
    // Calculate days needed from next month to complete the grid
    const totalDaysNeeded = 42; // 6 rows of 7 days
    const nextDaysNeeded = totalDaysNeeded - result.days.length;
    
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    
    for (let day = 1; day <= nextDaysNeeded; day++) {
      const date = new Date(nextMonthYear, nextMonth, day);
      result.days.push({
        day,
        date,
        isCurrentMonth: false,
        isSelected: selected && isSameDay(date, selected)
      });
    }
    
    return result;
  }

  function isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    let newMonth = currentMonth;
    let newYear = currentYear;
    
    if (direction === 'prev') {
      newMonth--;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
    } else {
      newMonth++;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setMonthData(generateMonthData(newYear, newMonth, currentDate));
  };

  const selectDate = (item: DayItem) => {
    setCurrentDate(item.date);
    onDateChange(item.date);
    
    // If date is not in current month, update the month view
    if (!item.isCurrentMonth) {
      const newMonth = item.date.getMonth();
      const newYear = item.date.getFullYear();
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
      setMonthData(generateMonthData(newYear, newMonth, item.date));
    } else {
      // Just update the selection
      setMonthData(prev => ({
        ...prev,
        days: prev.days.map(day => ({
          ...day,
          isSelected: isSameDay(day.date, item.date)
        }))
      }));
    }
    
    setCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCalendar} style={styles.dateDisplay}>
        <Ionicons name="calendar-outline" size={24} color="#3563E9" style={styles.calendarIcon} />
        <Text style={styles.dateText}>
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={calendarVisible}
        onRequestClose={() => setCalendarVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setCalendarVisible(false)}
        >
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={() => navigateMonth('prev')}
              >
                <Ionicons name="chevron-back" size={24} color="#3563E9" />
              </TouchableOpacity>

              <Text style={styles.monthYearText}>
                {MONTHS[currentMonth]} {currentYear}
              </Text>

              <TouchableOpacity
                style={styles.navigationButton}
                onPress={() => navigateMonth('next')}
              >
                <Ionicons name="chevron-forward" size={24} color="#3563E9" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekdaysHeader}>
              {DAYS_OF_WEEK.map(day => (
                <Text key={day} style={styles.weekdayText}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {monthData.days.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    item.isSelected && styles.selectedDay,
                  ]}
                  onPress={() => selectDate(item)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !item.isCurrentMonth && styles.otherMonthDayText,
                      item.isSelected && styles.selectedDayText,
                    ]}
                  >
                    {item.day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(53, 99, 233, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    color: '#3563E9',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '85%',
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigationButton: {
    padding: 4,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  weekdaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekdayText: {
    color: '#666',
    fontSize: 14,
    width: 36,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayCell: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  otherMonthDayText: {
    color: '#aaa',
  },
  selectedDay: {
    backgroundColor: '#3563E9',
    borderRadius: 18,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DateSelector; 