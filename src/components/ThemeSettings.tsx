import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from '~/src/context/ThemeContext';

export default function ThemeSettings() {
  const { isDarkMode, themeMode, setThemeMode } = useTheme();
  
  const themeOptions = [
    { key: 'light', label: 'Light', icon: 'light-mode' },
    { key: 'dark', label: 'Dark', icon: 'dark-mode' },
    { key: 'system', label: 'System', icon: 'settings' },
  ] as const;

  return (
    <View className={`p-4 rounded-2xl m-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
      <Text className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Theme Settings
      </Text>
      
      {themeOptions.map((option) => (
        <Pressable
          key={option.key}
          onPress={() => setThemeMode(option.key)}
          className={`flex-row items-center p-3 rounded-xl mb-2 ${
            themeMode === option.key
              ? isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              : isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
          }`}
        >
          <MaterialIcons
            name={option.icon as any}
            size={24}
            color={themeMode === option.key ? 'white' : isDarkMode ? '#94a3b8' : '#6b7280'}
          />
          <Text
            className={`ml-3 font-medium ${
              themeMode === option.key
                ? 'text-white'
                : isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}
          >
            {option.label}
          </Text>
          {themeMode === option.key && (
            <MaterialIcons
              name="check"
              size={20}
              color="white"
              style={{ marginLeft: 'auto' }}
            />
          )}
        </Pressable>
      ))}
    </View>
  );
}