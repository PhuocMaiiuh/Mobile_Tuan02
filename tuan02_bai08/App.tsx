import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, View } from 'react-native';

interface AppButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled,
  loading,
  icon,
}) => {
  const containerStyles = [
    styles.btnBase,
    variantStyles[variant],
    sizeStyles[size],
    disabled && styles.disabled,
  ];

  const textColor = variant === 'outline' ? '#007AFF' : '#FFFFFF';

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon}
          <Text style={[styles.textBase, { color: textColor }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <AppButton 
        title="Thêm vào giỏ hàng" 
        variant="primary" 
        size="large" 
        onPress={() => console.log('Đã thêm vào giỏ hàng!')} 
      />

      <AppButton 
        title="Xem chi tiết" 
        variant="outline" 
        size="medium" 
        onPress={() => console.log('Chuyển đến trang chi tiết!')} 
      />

      <AppButton 
        title="Xóa sách" 
        variant="danger" 
        size="small" 
        onPress={() => console.log('Đã xóa sách khỏi kệ!')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 15,
  },
  btnBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textBase: {
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
  },
});

const variantStyles: Record<string, ViewStyle> = {
  primary: { backgroundColor: '#007AFF' },
  secondary: { backgroundColor: '#6C757D' },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#007AFF' },
  danger: { backgroundColor: '#DC3545' },
};

const sizeStyles: Record<string, ViewStyle> = {
  small: { paddingVertical: 6, paddingHorizontal: 12 },
  medium: { paddingVertical: 10, paddingHorizontal: 16 },
  large: { paddingVertical: 14, paddingHorizontal: 24 },
};
