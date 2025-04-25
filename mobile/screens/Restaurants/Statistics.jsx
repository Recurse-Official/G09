import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import Layout from './Layout';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2A44',
  },
  notificationIcon: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: 12,
  },
  mealCount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 8,
  },
  monthIncrease: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 16,
  },
  chartContainer: {
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    padding: 16,
    marginTop: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

const Statistics = () => {
  const navigation = useNavigation();

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const chartConfig = {
    backgroundGradientFrom: '#F3F4F6',
    backgroundGradientTo: '#F3F4F6',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FFFFFF',
    },
    bezier: true,
  };

  const chartData = {
    labels: ['01', '05', '10', '15', '20'],
    datasets: [
      {
        data: [10, 20, 15, 30, 25],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, // Green
        strokeWidth: 3,
      },
      {
        data: [5, 10, 8, 15, 12],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Blue
        strokeWidth: 3,
      },
    ],
  };

  const yearlyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [100, 300, 250, 400, 350],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, // Green
        strokeWidth: 3,
      },
      {
        data: [50, 150, 100, 200, 180],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Blue
        strokeWidth: 3,
      },
    ],
  };

  return (
    <Layout navigation={navigation}>
      <ScrollView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Statistics</Text>
          <TouchableOpacity onPress={() => handleIconPress('Notification')} style={styles.notificationIcon}>
            <Icon name="bell" size={24} color="#1F2A44" />
          </TouchableOpacity>
        </View>

        {/* Card 1: Monthly Meals */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Meals Donated</Text>
          <Text style={styles.mealCount}>120 Meals</Text>
          <Text style={styles.monthIncrease}>+10% This Month</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={width - 80} // Responsive width
              height={220}
              chartConfig={chartConfig}
              style={{ borderRadius: 16 }}
              withInnerLines={false}
              withShadow={true}
            />
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: chartData.datasets[0].color(1) }]} />
              <Text style={styles.legendText}>Meals Donated</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: chartData.datasets[1].color(1) }]} />
              <Text style={styles.legendText}>Meals Accepted</Text>
            </View>
          </View>
        </View>

        {/* Card 2: Yearly Meals */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Yearly Meals Donated</Text>
          <Text style={styles.mealCount}>1,200 Meals</Text>
          <Text style={styles.monthIncrease}>+15% This Year</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={yearlyChartData}
              width={width - 80} // Responsive width
              height={220}
              chartConfig={chartConfig}
              style={{ borderRadius: 16 }}
              withInnerLines={false}
              withShadow={true}
            />
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: yearlyChartData.datasets[0].color(1) }]} />
              <Text style={styles.legendText}>Meals Donated</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: yearlyChartData.datasets[1].color(1) }]} />
              <Text style={styles.legendText}>Meals Accepted</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Statistics;