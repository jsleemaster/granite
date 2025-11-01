import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRoute, useNavigation } from '@granite-js/react-native';
import { colors } from '@theme/colors';

export const Route = createRoute('/', {
  validateParams: () => ({}),
  component: HomeScreen,
});

const fortunes = [
  '오늘은 좋은 일이 생길 거예요! 😊',
  '새로운 기회가 찾아올 것입니다 ✨',
  '오늘은 조금 쉬어가는 날이에요 ☕',
  '행운이 함께할 거예요! 🍀',
  '예상치 못한 기쁨이 있을 거예요 🎁',
  '오늘은 당신의 날입니다! 🌟',
  '좋은 소식이 들려올 거예요 📬',
  '평온한 하루가 될 것입니다 🌸',
];

const luckyColors = [
  { name: '빨강', color: '#FF6B6B', emoji: '❤️' },
  { name: '파랑', color: '#4ECDC4', emoji: '💙' },
  { name: '노랑', color: '#FFE66D', emoji: '💛' },
  { name: '초록', color: '#95E1D3', emoji: '💚' },
  { name: '보라', color: '#C7CEEA', emoji: '💜' },
  { name: '주황', color: '#FFA07A', emoji: '🧡' },
];

function HomeScreen() {
  const navigation = useNavigation();
  const [fortune, setFortune] = useState<string>('');
  const [luckyNumber, setLuckyNumber] = useState<number | null>(null);
  const [luckyColor, setLuckyColor] = useState<(typeof luckyColors)[0] | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  const getFortune = async () => {
    // 애니메이션 효과
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // 랜덤 운세 생성
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const randomColor = luckyColors[Math.floor(Math.random() * luckyColors.length)];

    setFortune(randomFortune);
    setLuckyNumber(randomNumber);
    setLuckyColor(randomColor);

    // 히스토리에 저장
    try {
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleString('ko-KR'),
        fortune: randomFortune,
        luckyNumber: randomNumber,
        luckyColor: randomColor,
      };

      const stored = await AsyncStorage.getItem('fortune_history');
      const history = stored ? JSON.parse(stored) : [];
      const updatedHistory = [newEntry, ...history].slice(0, 20); // 최근 20개만 저장

      await AsyncStorage.setItem('fortune_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('히스토리 저장 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔮 오늘의 운세</Text>
        <Text style={styles.subtitle}>심심할 때 운세를 확인해보세요!</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('/history')}
        >
          <Text style={styles.historyButtonText}>📜 히스토리</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        {fortune ? (
          <>
            <Text style={styles.fortuneText}>{fortune}</Text>

            <View style={styles.divider} />

            <View style={styles.luckySection}>
              <Text style={styles.luckyLabel}>행운의 숫자</Text>
              <Text style={styles.luckyNumber}>{luckyNumber}</Text>
            </View>

            <View style={styles.luckySection}>
              <Text style={styles.luckyLabel}>행운의 색상</Text>
              <View style={styles.colorContainer}>
                <View style={[styles.colorBox, { backgroundColor: luckyColor?.color }]} />
                <Text style={styles.colorName}>
                  {luckyColor?.emoji} {luckyColor?.name}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.emptyText}>버튼을 눌러 오늘의 운세를 확인하세요</Text>
        )}
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={getFortune}>
        <Text style={styles.buttonText}>✨ 운세 보기</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>매일 새로운 운세로 하루를 시작하세요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    minHeight: 250,
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fortuneText: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.text,
    lineHeight: 36,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 20,
  },
  luckySection: {
    marginBottom: 15,
  },
  luckyLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  luckyNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  colorName: {
    fontSize: 20,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: 14,
    marginTop: 20,
  },
  historyButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
  },
  historyButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
