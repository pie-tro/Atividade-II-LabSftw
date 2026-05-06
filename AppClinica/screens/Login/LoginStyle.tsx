import { StyleSheet } from 'react-native';
 
export const getStyle = (darkMode = false) => {
    const background = darkMode ? '#111827' : '#f0f4f8';
    const card = darkMode ? '#1f2937' : '#fff';
    const border = darkMode ? '#374151' : '#d0d7de';
    const textPrimary = darkMode ? '#f3f4f6' : '#1a3c5e';
    const textSecondary = darkMode ? '#9ca3af' : '#667085';
    const inputBg = darkMode ? '#111827' : '#f8fafc';
    const inputText = darkMode ? '#e5e7eb' : '#1f2933';

    return StyleSheet.create({
        safeArea: {
            flex: 1,
            width: '100%',
            backgroundColor: background,
        },
        scrollContent: {
            flexGrow: 1,
            width: '100%',
            padding: 24,
            paddingBottom: 40,
            justifyContent: 'center',
        },
 
        // Cabeçalho
        cabecalho: {
            alignItems: 'center',
            marginBottom: 32,
            marginTop: 20,
        },
        logoContainer: {
            width: 76,
            height: 76,
            borderRadius: 20,
            backgroundColor: '#1a3c5e',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 14,
            shadowColor: '#1a3c5e',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
        },
        logoIcone: {
            fontSize: 36,
        },
        appNome: {
            fontSize: 26,
            fontWeight: 'bold',
            color: textPrimary,
            letterSpacing: 0.5,
        },
        appSubtitulo: {
            fontSize: 13,
            color: textSecondary,
            marginTop: 4,
        },
 
        // Card
        card: {
            backgroundColor: card,
            borderRadius: 16,
            padding: 24,
            borderWidth: 1,
            borderColor: border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
            marginBottom: 24,
        },
        cardTitulo: {
            fontSize: 19,
            fontWeight: 'bold',
            color: textPrimary,
            marginBottom: 4,
        },
        cardSubtitulo: {
            fontSize: 13,
            color: textSecondary,
            marginBottom: 24,
        },
 
        // Campos
        campoContainer: {
            marginBottom: 16,
        },
        campoLabel: {
            fontSize: 13,
            fontWeight: '600',
            color: darkMode ? '#d1d5db' : '#344054',
            marginBottom: 6,
        },
        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: border,
            borderRadius: 10,
            backgroundColor: inputBg,
            paddingHorizontal: 12,
            height: 48,
        },
        inputIcone: {
            fontSize: 16,
            marginRight: 8,
            color: textSecondary,
        },
        input: {
            flex: 1,
            fontSize: 15,
            color: inputText,
        },
        senhaToggle: {
            padding: 4,
        },
        senhaToggleTexto: {
            fontSize: 16,
        },
 
        // Esqueci senha
        esqueciContainer: {
            alignItems: 'flex-end',
            marginBottom: 22,
            marginTop: -4,
        },
        esqueciTexto: {
            fontSize: 13,
            color: darkMode ? '#93c5fd' : '#1a3c5e',
            fontWeight: '600',
        },
 
        // Botão principal
        btnEntrar: {
            backgroundColor: '#1a3c5e',
            borderRadius: 10,
            paddingVertical: 14,
            alignItems: 'center',
            shadowColor: '#1a3c5e',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 4,
        },
        btnEntrarTexto: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '700',
            letterSpacing: 0.3,
        },
 
        // Divider
        dividerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            gap: 10,
        },
        dividerLinha: {
            flex: 1,
            height: 1,
            backgroundColor: darkMode ? '#374151' : '#e4e7ec',
        },
        dividerTexto: {
            fontSize: 12,
            color: textSecondary,
            fontWeight: '500',
        },
 
        // Perfis rápidos
        perfilLabel: {
            fontSize: 12,
            color: textSecondary,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            textAlign: 'center',
            marginBottom: 12,
        },
        perfilRow: {
            flexDirection: 'row',
            gap: 10,
        },
        perfilBtn: {
            flex: 1,
            borderWidth: 1,
            borderColor: border,
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: 'center',
            backgroundColor: inputBg,
        },
        perfilIcone: {
            fontSize: 22,
            marginBottom: 4,
        },
        perfilTexto: {
            fontSize: 11,
            fontWeight: '600',
            color: darkMode ? '#d1d5db' : '#344054',
        },
 
        // Rodapé
        rodape: {
            fontSize: 11,
            color: textSecondary,
            textAlign: 'center',
        },
    });
};
