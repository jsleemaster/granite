import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRoute, useNavigation } from '@granite-js/react-native';

export const Route = createRoute('/history', {
  validateParams: () => ({}),
  component: HistoryScreen,
});

interface FortuneHistory {
  id: string;
  date: string;
  fortune: string;
  luckyNumber: number;
  luckyColor: {
    name: string;
    color: string;
    emoji: string;
  };
}

function HistoryScreen() {
  const navigation = useNavigation();
  const [history, setHistory] = useState<FortuneHistory[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('fortune_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('히스토리 로드 실패:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('fortune_history');
      setHistory([]);
    } catch (error) {
      console.error('히스토리 삭제 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.title}>운세 히스토리</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>전체 삭제</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>아직 운세 기록이 없습니다</Text>
            <Text style={styles.emptySubtext}>메인 화면에서 운세를 확인해보세요!</Text>
          </View>
        ) : (
          history.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.fortune}>{item.fortune}</Text>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>행운의 숫자</Text>
                  <Text style={styles.luckyNumber}>{item.luckyNumber}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>행운의 색상</Text>
                  <View style={styles.colorInfo}>
                    <View style={[styles.colorBox, { backgroundColor: item.luckyColor.color }]} />
                    <Text style={styles.colorName}>
                      {item.luckyColor.emoji} {item.luckyColor.name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6C5CE7',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#868E96',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ADB5BD',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  date: {
    fontSize: 12,
    color: '#868E96',
    marginBottom: 12,
  },
  fortune: {
    fontSize: 18,
    color: '#2D3436',
    marginBottom: 16,
    lineHeight: 26,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#868E96',
    marginBottom: 6,
  },
  luckyNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C5CE7',
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  colorName: {
    fontSize: 14,
    color: '#2D3436',
  },
});
