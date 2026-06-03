
import { StyleSheet } from 'react-native';

export const getStyle = (darkMode = false) => {
    const background = darkMode ? '#111827' : '#f0f4f8';
    const surface = darkMode ? '#1f2937' : '#ffffff';
    const border = darkMode ? '#374151' : '#e5e7eb';
    const textPrimary = darkMode ? '#f3f4f6' : '#1a3c5e';
    const textSecondary = darkMode ? '#d1d5db' : '#555';
    
    const bgExcluir = darkMode ? '#7f1d1d' : '#fee2e2';
    const textExcluir = darkMode ? '#fca5a5' : '#dc2626';

    return StyleSheet.create({
        safeArea: {
            flex: 1,
            width: '100%',
            backgroundColor: background,
        },
        scrollContent: {
            flexGrow: 1,
            padding: 20,
            paddingBottom: 40,
        },
        titulo: {
            fontSize: 22,
            fontWeight: 'bold',
            color: textPrimary,
            marginBottom: 24,
            textAlign: 'center',
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: textPrimary,
            marginTop: 32,
            marginBottom: 16,
        },
        inputGroup: {
            marginBottom: 16,
        },
        label: {
            fontSize: 13,
            fontWeight: '600',
            color: textSecondary,
            marginBottom: 6,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        input: {
            backgroundColor: surface,
            borderWidth: 1,
            borderColor: border,
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: 15,
            color: darkMode ? '#e5e7eb' : '#222',
        },
        btnSalvar: {
            backgroundColor: '#1a3c5e',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 8,
        },
        btnSalvarText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 0.5,
        },
       
        card: {
            backgroundColor: surface,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        cardInfo: {
            flex: 1,
            marginRight: 12,
        },
        cardNome: {
            fontSize: 16,
            fontWeight: 'bold',
            color: textPrimary,
            marginBottom: 4,
        },
        cardTelefone: {
            fontSize: 14,
            color: textSecondary,
        },
        btnExcluir: {
            backgroundColor: bgExcluir,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
        },
        btnExcluirText: {
            color: textExcluir,
            fontSize: 13,
            fontWeight: 'bold',
        },
    });
};