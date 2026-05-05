import { StyleSheet } from 'react-native';
 
export const getStyle = () => {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            width: '100%',
            backgroundColor: '#f0f4f8',
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
            color: '#1a3c5e',
            letterSpacing: 0.5,
        },
        appSubtitulo: {
            fontSize: 13,
            color: '#667085',
            marginTop: 4,
        },
 
        // Card
        card: {
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 24,
            borderWidth: 1,
            borderColor: '#d0d7de',
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
            color: '#1a3c5e',
            marginBottom: 4,
        },
        cardSubtitulo: {
            fontSize: 13,
            color: '#667085',
            marginBottom: 24,
        },
 
        // Campos
        campoContainer: {
            marginBottom: 16,
        },
        campoLabel: {
            fontSize: 13,
            fontWeight: '600',
            color: '#344054',
            marginBottom: 6,
        },
        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#d0d7de',
            borderRadius: 10,
            backgroundColor: '#f8fafc',
            paddingHorizontal: 12,
            height: 48,
        },
        inputIcone: {
            fontSize: 16,
            marginRight: 8,
            color: '#667085',
        },
        input: {
            flex: 1,
            fontSize: 15,
            color: '#1f2933',
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
            color: '#1a3c5e',
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
            backgroundColor: '#e4e7ec',
        },
        dividerTexto: {
            fontSize: 12,
            color: '#98a2b3',
            fontWeight: '500',
        },
 
        // Perfis rápidos
        perfilLabel: {
            fontSize: 12,
            color: '#667085',
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
            borderColor: '#d0d7de',
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: 'center',
            backgroundColor: '#f8fafc',
        },
        perfilIcone: {
            fontSize: 22,
            marginBottom: 4,
        },
        perfilTexto: {
            fontSize: 11,
            fontWeight: '600',
            color: '#344054',
        },
 
        // Rodapé
        rodape: {
            fontSize: 11,
            color: '#98a2b3',
            textAlign: 'center',
        },
    });
};
