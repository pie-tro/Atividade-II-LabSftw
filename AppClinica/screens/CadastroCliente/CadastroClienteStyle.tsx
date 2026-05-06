import { StyleSheet } from 'react-native';

export const getStyle = (darkMode = false) => {
    const background = darkMode ? '#111827' : '#f0f4f8';
    const surface = darkMode ? '#1f2937' : '#fff';
    const border = darkMode ? '#374151' : '#d0d7de';
    const textPrimary = darkMode ? '#f3f4f6' : '#1a3c5e';
    const textSecondary = darkMode ? '#d1d5db' : '#555';

    return StyleSheet.create({
        safeArea: {
            flex: 1,
            width: '100%',
            backgroundColor: background,
        },
        scrollContent: {
            flexGrow: 1,
            width: '100%',
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
        label: {
            fontSize: 13,
            fontWeight: '600',
            color: textSecondary,
            marginBottom: 6,
            marginTop: 14,
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
        mensagemContainer: {
            marginTop: 14,
            backgroundColor: '#ecfdf3',
            borderWidth: 1,
            borderColor: '#abefc6',
            borderRadius: 10,
            padding: 12,
        },
        mensagemTexto: {
            color: '#067647',
            fontSize: 13,
            fontWeight: '600',
        },
        btnSalvar: {
            backgroundColor: '#1a3c5e',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 24,
        },
        btnSalvarText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 0.5,
        },
        btnVoltar: {
            borderWidth: 1,
            borderColor: '#1a3c5e',
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: 'center',
            marginTop: 12,
            backgroundColor: surface,
        },
        btnVoltarText: {
            color: darkMode ? '#93c5fd' : '#1a3c5e',
            fontSize: 15,
            fontWeight: '700',
        },
    });
};
