import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CadastroTela } from './screens/AgendarConsulta/CadastroTela';
import { ConfirmacaoTela } from './screens/CofirmConsul/ConfirmaConsulta';
import { CadastroClienteTela } from './screens/CadastroCliente/CadastroClienteTela';
import { CadastroMedicoTela } from './screens/CadastroMedico/CadastroMedico';
import { EncerramentoConsultaTela } from './screens/EncerrarConsulta/EncerrarConsulta';
import { HistoricoTela } from './screens/HistoricoConsulta/HistoricoTela';
import { LoginTela } from './screens/Login/Login';
import { RealizaConsultaTela } from './screens/RealizaConsulta/RealizaConsulta';

export default function App() {

  const [telaAtual, setTelaAtual] = useState<'login' | 'agendarConsulta' | 'confirmConsul' | 'cadastroCliente' | 'cadastroMedico' | 'encerrarConsulta' | 'historicoConsulta' | 'realizaConsulta'>('login');
  const [darkMode, setDarkMode] = useState(false);

  function voltarTela() {
    if (telaAtual === 'agendarConsulta') setTelaAtual('login');
    if (telaAtual === 'confirmConsul') setTelaAtual('agendarConsulta');
    if (telaAtual === 'historicoConsulta') setTelaAtual('confirmConsul');
    if (telaAtual === 'cadastroCliente') setTelaAtual('agendarConsulta');
    if (telaAtual === 'cadastroMedico') setTelaAtual('agendarConsulta'); 
    if (telaAtual === 'encerrarConsulta') setTelaAtual('login');
    if (telaAtual === 'realizaConsulta') setTelaAtual('login');
  }

  return (
    <SafeAreaProvider>
      <View style={[styles.container, darkMode ? styles.containerDark : styles.containerLight]}>
        {telaAtual !== 'login' && (
          <TouchableOpacity
            style={[styles.backButton, darkMode ? styles.themeButtonDark : styles.themeButtonLight]}
            onPress={voltarTela}
          >
            <Text style={darkMode ? styles.themeButtonTextDark : styles.themeButtonTextLight}>Voltar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.themeButton, darkMode ? styles.themeButtonDark : styles.themeButtonLight]}
          onPress={() => setDarkMode((valorAtual) => !valorAtual)}
        >
          <Text style={darkMode ? styles.themeButtonTextDark : styles.themeButtonTextLight}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </TouchableOpacity>

        {telaAtual === 'login' ? (
          <LoginTela
            darkMode={darkMode}
            onLogin={() => setTelaAtual('agendarConsulta')}
            onAcessarMedico={() => setTelaAtual('realizaConsulta')}
            onAcessarRecepcao={() => setTelaAtual('encerrarConsulta')}
          />
        ) : telaAtual === 'cadastroCliente' ? (
          <CadastroClienteTela darkMode={darkMode} />
        ) : telaAtual === 'cadastroMedico' ? ( 
          <CadastroMedicoTela darkMode={darkMode} />
        ) : telaAtual === 'realizaConsulta' ? (
          <RealizaConsultaTela darkMode={darkMode} />
        ) : telaAtual === 'encerrarConsulta' ? (
          <EncerramentoConsultaTela darkMode={darkMode} />
        ) : telaAtual === 'historicoConsulta' ? (
          <HistoricoTela darkMode={darkMode} />
        ) : telaAtual === 'agendarConsulta' ? (
          <CadastroTela
            darkMode={darkMode}
            onConfirmar={() => setTelaAtual('confirmConsul')}
            onAbrirCadastroCliente={() => setTelaAtual('cadastroCliente')}
            onAbrirCadastroMedico={() => setTelaAtual('cadastroMedico')} 
          />
        ) : (
          <ConfirmacaoTela
            darkMode={darkMode}
            onIrHistorico={() => setTelaAtual('historicoConsulta')}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  themeButton: {
    position: 'absolute',
    top: 56,
    right: 16,
    zIndex: 1000,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: 16,
    zIndex: 1000,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
  },
  themeButtonLight: {
    backgroundColor: '#ffffff',
    borderColor: '#d0d7de',
  },
  themeButtonDark: {
    backgroundColor: '#1f2937',
    borderColor: '#4b5563',
  },
  themeButtonTextLight: {
    color: '#1a3c5e',
    fontSize: 12,
    fontWeight: '700',
  },
  themeButtonTextDark: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '700',
  },
});