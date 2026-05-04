import { StyleSheet } from "react-native";

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
        dataHoje: {
            fontSize: 13,
            color: '#667085',
            textAlign: 'center',
            marginBottom: 20,
            textTransform: 'capitalize',
        },

        // Resumo
        resumoRow: {
            flexDirection: 'row',
            gap: 10,
            marginBottom: 24,
        },
        resumoCard: {
            flex: 1,
            borderRadius: 10,
            paddingVertical: 14,
            alignItems: 'center',
            borderWidth: 1,
        },
        resumoCardPendente: {
            backgroundColor: '#fffaeb',
            borderColor: '#f8d24e',
        },
        resumoCardConfirmada: {
            backgroundColor: '#ecfdf3',
            borderColor: '#6ce9a6',
        },
        resumoCardAusente: {
            backgroundColor: '#fff1f0',
            borderColor: '#ffa39e',
        },
        resumoNumero: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1a3c5e',
        },
        resumoLabel: {
            fontSize: 11,
            color: '#667085',
            marginTop: 2,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.4,
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
        cardConfirmada: {
            borderColor: '#6ce9a6',
            backgroundColor: '#f6fef9',
        },
        cardAusente: {
            borderColor: '#ffa39e',
            backgroundColor: '#fff7f6',
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
        cardCliente: {
            fontSize: 17,
            fontWeight: 'bold',
            color: '#1f2933',
            marginBottom: 8,
        },
        cardClienteResolvido: {
            color: '#667085',
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
        cardAcoes: {
            flexDirection: 'row',
            gap: 10,
            marginTop: 14,
        },

        // Badges de status
        badgePendente: {
            backgroundColor: '#fffaeb',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: '#f8d24e',
        },
        badgeConfirmada: {
            backgroundColor: '#ecfdf3',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: '#6ce9a6',
        },
        badgeAusente: {
            backgroundColor: '#fff1f0',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: '#ffa39e',
        },
        badgeTexto: {
            fontSize: 11,
            fontWeight: '600',
            color: '#1a3c5e',
        },

        // Botões de ação nos cards
        btnAcao: {
            flex: 1,
            borderRadius: 8,
            paddingVertical: 10,
            alignItems: 'center',
        },
        btnConfirmar: {
            backgroundColor: '#1a3c5e',
        },
        btnAusente: {
            backgroundColor: '#b42318',
        },
        btnAcaoTexto: {
            color: '#fff',
            fontSize: 13,
            fontWeight: '700',
        },

        // Estado vazio
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
            overflow: 'hidden',
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
        },
        modalCliente: {
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
        modalConfirmAusente: {
            backgroundColor: '#b42318',
        },
        modalConfirmText: {
            fontSize: 15,
            fontWeight: '700',
            color: '#fff',
        },
        modalSucessoTexto: {
            fontSize: 15,
            color: '#1f2933',
            textAlign: 'center',
            marginBottom: 20,
        },
    });
};