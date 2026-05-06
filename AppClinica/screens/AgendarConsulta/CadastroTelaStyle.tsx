import { StyleSheet } from "react-native";

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
        pickerWrapper: {
            backgroundColor: surface,
            borderWidth: 1,
            borderColor: border,
            borderRadius: 10,
            overflow: 'hidden',
            minHeight: 52,
            justifyContent: 'center',
        },
        pickerNative: {
            height: 52,
            width: '100%',
        },
        selectButton: {
            minHeight: 52,
            borderWidth: 1,
            borderColor: border,
            borderRadius: 10,
            backgroundColor: surface,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 14,
        },
        selectButtonText: {
            fontSize: 15,
            color: darkMode ? '#e5e7eb' : '#222',
        },
        selectChevron: {
            fontSize: 12,
            color: darkMode ? '#93c5fd' : '#1a3c5e',
        },
        linhaData: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        inputMeia: {
            flex: 1,
        },
        separador: {
            fontSize: 14,
            color: '#888',
            paddingHorizontal: 4,
        },
        periodoInfo: {
            marginTop: 8,
            fontSize: 13,
            color: textPrimary,
            fontWeight: '600',
        },
        periodoErro: {
            marginTop: 8,
            fontSize: 13,
            color: '#b42318',
        },
        periodoAviso: {
            paddingHorizontal: 10,
            paddingVertical: 12,
            fontSize: 13,
            color: darkMode ? '#9ca3af' : '#667085',
        },
        legendaContainer: {
            marginTop: 10,
            marginBottom: 8,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        legendaItem: {
            fontSize: 12,
            color: darkMode ? '#d1d5db' : '#344054',
            backgroundColor: darkMode ? '#111827' : '#f8fafc',
            borderWidth: 1,
            borderColor: border,
            borderRadius: 999,
            paddingHorizontal: 10,
            paddingVertical: 4,
        },
        tabelaContainer: {
            backgroundColor: surface,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: border,
            overflow: 'hidden',
            marginTop: 6,
        },
        tabelaHeader: {
            flexDirection: 'row',
            backgroundColor: '#1a3c5e',
            paddingVertical: 10,
            paddingHorizontal: 8,
        },
        tabelaLinha: {
            flexDirection: 'row',
            paddingVertical: 14,
            paddingHorizontal: 8,
            borderBottomWidth: 1,
            borderColor: darkMode ? '#374151' : '#eef0f3',
        },
        linhaSelecionada: {
            backgroundColor: darkMode ? '#1e3a5f' : '#ddeeff',
        },
        colunaHorario: {
            width: 95,
            fontSize: 13,
            color: darkMode ? '#d1d5db' : '#333',
        },
        colunaDia: {
            flex: 1,
            textAlign: 'center',
            fontSize: 13,
            color: '#aaa',
            alignItems: 'center',
        },
        slotLivre: {
            color: '#067647',
            fontWeight: '700',
            textAlign: 'center',
            fontSize: 12,
        },
        slotConfirmado: {
            color: '#1d4ed8',
            fontWeight: '700',
            textAlign: 'center',
            fontSize: 12,
        },
        slotMarcado: {
            color: '#b54708',
            fontWeight: '700',
            textAlign: 'center',
            fontSize: 12,
        },
        slotIndisponivel: {
            color: '#98a2b3',
            fontWeight: '700',
            textAlign: 'center',
            fontSize: 12,
        },
        slotBloqueado: {
            color: '#b42318',
            fontWeight: '700',
            textAlign: 'center',
            fontSize: 12,
        },
        slotSelecionado: {
            color: '#1d4ed8',
            fontWeight: '800',
            textAlign: 'center',
            fontSize: 12,
        },
        navegacao: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 12,
            borderTopWidth: 1,
            borderColor: darkMode ? '#374151' : '#eef0f3',
        },
        btnNav: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: darkMode ? '#374151' : '#e8edf2',
        },
        btnNavDisabled: {
            opacity: 0.45,
        },
        btnNavText: {
            fontSize: 14,
            color: darkMode ? '#e5e7eb' : '#1a3c5e',
            fontWeight: '600',
        },
        btnConfirmar: {
            backgroundColor: '#1a3c5e',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 24,
        },
        btnConfirmarText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 0.5,
        },
        modalBackdrop: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            justifyContent: 'center',
            padding: 20,
        },
        modalCard: {
            backgroundColor: surface,
            borderRadius: 12,
            overflow: 'hidden',
        },
        modalOption: {
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderColor: darkMode ? '#374151' : '#eef0f3',
        },
        modalOptionText: {
            fontSize: 15,
            color: darkMode ? '#e5e7eb' : '#1f2933',
        },
        modalCancel: {
            paddingVertical: 14,
            alignItems: 'center',
            backgroundColor: darkMode ? '#111827' : '#f6f8fa',
        },
        modalCancelText: {
            fontSize: 15,
            fontWeight: '600',
            color: darkMode ? '#93c5fd' : '#1a3c5e',
        },
        // legado
        mainWrapper: { flex: 1 },
        contentLayer: { flex: 1 },
        card: {},
        picker: {},
        pickerGroup: {},
        pickerSmall: {},
        inputLarge: {},
        inputData: {},
        linha: {},
        linhaCentro: {},
        tabelaScroll: {},
    })
}