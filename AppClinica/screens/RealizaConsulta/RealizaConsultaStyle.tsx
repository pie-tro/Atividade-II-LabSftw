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
            marginBottom: 24,
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
 
        // Cards de paciente
        pacienteCard: {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 14,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#d0d7de',
        },
        pacienteCardSelecionado: {
            borderColor: '#1a3c5e',
            backgroundColor: '#f0f4f8',
        },
        pacienteCardRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        checkCircle: {
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#d0d7de',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
        },
        checkCircleAtivo: {
            backgroundColor: '#1a3c5e',
            borderColor: '#1a3c5e',
        },
        checkMark: {
            color: '#fff',
            fontSize: 13,
            fontWeight: 'bold',
        },
        pacienteInfo: {
            flex: 1,
        },
        pacienteNome: {
            fontSize: 15,
            fontWeight: '600',
            color: '#1f2933',
        },
        pacienteNomeSelecionado: {
            color: '#1a3c5e',
        },
        pacienteHorario: {
            fontSize: 12,
            color: '#667085',
            marginTop: 2,
        },
        badgeSelecionado: {
            backgroundColor: '#1a3c5e',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 3,
        },
        badgeSelecionadoTexto: {
            fontSize: 11,
            fontWeight: '600',
            color: '#fff',
        },
 
        // Botão iniciar
        btnIniciar: {
            backgroundColor: '#1a3c5e',
            borderRadius: 10,
            paddingVertical: 14,
            alignItems: 'center',
            marginTop: 6,
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
        btnIniciarTexto: {
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
        },
 
        // Dados do paciente
        dadosCard: {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#d0d7de',
        },
        dadosRow: {
            flexDirection: 'row',
            gap: 20,
            marginBottom: 12,
        },
        dadoItem: {
            flex: 1,
        },
        dadosSeparador: {
            height: 1,
            backgroundColor: '#e4e7ec',
            marginBottom: 12,
        },
        dadoLabel: {
            fontSize: 12,
            color: '#667085',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.4,
            marginBottom: 3,
        },
        dadoValor: {
            fontSize: 14,
            color: '#1f2933',
            fontWeight: '500',
        },
 
        // Histórico
        historicoCard: {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#d0d7de',
            minHeight: 100,
        },
        historicoTexto: {
            fontSize: 14,
            color: '#444',
            lineHeight: 22,
        },
 
        // TextArea (Laudo / Receita)
        textAreaCard: {
            backgroundColor: '#fff',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#d0d7de',
            marginBottom: 16,
            padding: 14,
            minHeight: 110,
        },
        textArea: {
            fontSize: 14,
            color: '#1f2933',
            lineHeight: 22,
            minHeight: 80,
        },
 
        // Botão confirmar/finalizar
        btnConfirmar: {
            backgroundColor: '#1a7c4e',
            borderRadius: 10,
            paddingVertical: 14,
            alignItems: 'center',
            marginTop: 4,
            shadowColor: '#1a7c4e',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 4,
        },
        btnConfirmarTexto: {
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
        },
 
        // Banner finalizada
        finalizadaBanner: {
            backgroundColor: '#ecfdf3',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#6ce9a6',
            paddingVertical: 14,
            alignItems: 'center',
            marginTop: 4,
        },
        finalizadaTexto: {
            fontSize: 14,
            fontWeight: '700',
            color: '#1a7c4e',
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
