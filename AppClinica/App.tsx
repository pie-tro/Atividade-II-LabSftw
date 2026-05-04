import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CadastroTela } from './screens/AgendarConsulta/CadastroTela';
import { ConfirmacaoTela } from './screens/CofirmConsul/ConfirmaConsulta';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
       <ConfirmacaoTela></ConfirmacaoTela>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
