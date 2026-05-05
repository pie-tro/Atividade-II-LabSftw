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
            padding: 20,
            paddingBottom: 40,
        },

        // Cabeçalho
        titulo: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#1a3c5e',
            marginBottom: 4,
            textAlign: 'center',
        },
        subtitulo: {
            fontSize: 13,
            color: '#667085',
            textAlign: 'center',
            marginBottom: 20,
            textTransform: 'capitalize',
        },

        // Seções
        secaoTitulo: {
            fontSize: 13,
            fontWeight: '600',
            color: '#555',
            marginBottom: 10,
            marginTop: 4,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },

        // Cards de consulta
        card: {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#d0d7de',
        },
        cardSelecionado: {
            borderColor: '#1a3c5e',
            backgroundColor: '#f0f4f8',
        },
        cardEncerrado: {
            borderColor: '#6ce9a6',
            backgroundColor: '#f6fef9',
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        cardHorario: {
            fontSize: 13,
            fontWeight: '700',
            color: '#1a3c5e',
        },
        cardPaciente: {
            fontSize: 17,
            fontWeight: 'bold',
            color: '#1f2933',
            marginBottom: 8,
        },
        cardInfoRow: {
            flexDirection: 'row',
            marginBottom: 3,
        },
        cardInfoLabel: {
            fontSize: 13,
            color: '#667085',
            width: 100,
        },
        cardInfoValor: {
            fontSize: 13,
            color: '#333',
            fontWeight: '500',
            flex: 1,
        },

        // Aviso retorno
        retornoAviso: {
            backgroundColor: '#fffaeb',
            borderRadius: 8,
            padding: 8,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#f8d24e',
        },
        retornoAvisoTexto: {
            fontSize: 12,
            color: '#7a4f00',
            fontWeight: '500',
        },

        // Badges
        badgePendente: {
            backgroundColor: '#fffaeb',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: '#f8d24e',
        },
        badgeRetorno: {
            backgroundColor: '#f0f4ff',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: '#a5b4fc',
        },
        badgeRetornoTexto: {
            fontSize: 11,
            fontWeight: '600',
            color: '#3730a3',
        },
        badgeEncerrado: {
            backgroundColor: '#ecfdf3',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: '#6ce9a6',
        },
        badgeTexto: {
            fontSize: 11,
            fontWeight: '600',
            color: '#1a3c5e',
        },

        // Pagamento
        pagamentoGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 16,
        },
        pagamentoBtn: {
            flex: 1,
            minWidth: '40%',
            borderWidth: 1,
            borderColor: '#d0d7de',
            borderRadius: 10,
            paddingVertical: 14,
            alignItems: 'center',
            backgroundColor: '#fff',
        },
        pagamentoBtnAtivo: {
            borderColor: '#1a3c5e',
            backgroundColor: '#f0f4f8',
        },
        pagamentoIcone: {
            fontSize: 22,
            marginBottom: 4,
        },
        pagamentoLabel: {
            fontSize: 13,
            fontWeight: '600',
            color: '#667085',
        },
        pagamentoLabelAtivo: {
            color: '#1a3c5e',
        },

        // Procedimentos
        procedimentosGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 16,
        },
        procBtn: {
            borderWidth: 1,
            borderColor: '#d0d7de',
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 8,
            backgroundColor: '#fff',
        },
        procBtnAtivo: {
            borderColor: '#1a3c5e',
            backgroundColor: '#1a3c5e',
        },
        procTexto: {
            fontSize: 13,
            color: '#444',
            fontWeight: '500',
        },
        procTextoAtivo: {
            color: '#fff',
            fontWeight: '700',
        },

        // TextArea observações
        textAreaCard: {
            backgroundColor: '#fff',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#d0d7de',
            marginBottom: 16,
            padding: 14,
            minHeight: 90,
        },
        textArea: {
            fontSize: 14,
            color: '#1f2933',
            lineHeight: 22,
            minHeight: 60,
        },

        // Botão encerrar
        btnEncerrar: {
            backgroundColor: '#1a3c5e',
            borderRadius: 10,
            paddingVertical: 14,
            alignItems: 'center',
            marginBottom: 24,
            shadowColor: '#1a3c5e',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 4,
        },
        btnDesabilitado: {
            backgroundColor: '#b0bec5',
            shadowOpacity: 0,
            elevation: 0,
        },
        btnEncerrarTexto: {
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
        },

        // Vazio
        vazioContainer: {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#d0d7de',
            marginBottom: 12,
        },
        vazioTexto: {
            fontSize: 14,
            color: '#667085',
            textAlign: 'center',
        },

        // Modal
        modalBackdrop: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            justifyContent: 'center',
            padding: 20,
        },
        modalCard: {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
        },
        modalTitulo: {
            fontSize: 17,
            fontWeight: 'bold',
            color: '#1a3c5e',
            marginBottom: 14,
            textAlign: 'center',
        },
        modalInfo: {
            backgroundColor: '#f0f4f8',
            borderRadius: 8,
            padding: 12,
            marginBottom: 14,
            gap: 4,
        },
        modalPaciente: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1f2933',
            marginBottom: 4,
        },
        modalDetalhe: {
            fontSize: 13,
            color: '#667085',
        },
        modalPergunta: {
            fontSize: 14,
            color: '#444',
            textAlign: 'center',
            marginBottom: 20,
        },
        modalAcoes: {
            flexDirection: 'row',
            gap: 10,
        },
        modalCancel: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: '#e8edf2',
            alignItems: 'center',
        },
        modalCancelText: {
            fontSize: 15,
            fontWeight: '600',
            color: '#1a3c5e',
        },
        modalConfirm: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: '#1a3c5e',
            alignItems: 'center',
        },
        modalConfirmText: {
            fontSize: 15,
            fontWeight: '700',
            color: '#fff',
        },
        modalSucessoIcone: {
            fontSize: 40,
            textAlign: 'center',
            marginBottom: 10,
        },
        modalSucessoTexto: {
            fontSize: 14,
            color: '#1f2933',
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 20,
        },
    });
};