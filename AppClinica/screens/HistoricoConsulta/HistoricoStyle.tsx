import { StyleSheet } from 'react-native';

export const getStyle = (darkMode = false) => {
	const background = darkMode ? '#111827' : '#f5f8fc';
	const surface = darkMode ? '#1f2937' : '#ffffff';
	const border = darkMode ? '#374151' : '#d7e3ee';
	const textPrimary = darkMode ? '#f3f4f6' : '#12324a';
	const textSoft = darkMode ? '#9ca3af' : '#667085';

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
			paddingBottom: 30,
		},
		titulo: {
			fontSize: 26,
			fontWeight: '700',
			color: textPrimary,
			marginBottom: 6,
		},
		subtitulo: {
			fontSize: 13,
			color: textSoft,
			marginBottom: 16,
		},
		resumoRow: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			gap: 10,
			marginBottom: 16,
		},
		resumoCard: {
			flexGrow: 1,
			minWidth: '47%',
			backgroundColor: surface,
			borderRadius: 12,
			borderWidth: 1,
			borderColor: border,
			paddingVertical: 12,
			alignItems: 'center',
		},
		resumoCardFinalizada: {
			borderColor: '#1fa46e',
			backgroundColor: '#eafaf3',
		},
		resumoCardCancelada: {
			borderColor: '#f08b2d',
			backgroundColor: '#fff5ec',
		},
		resumoCardFaltou: {
			borderColor: '#cc3f3f',
			backgroundColor: '#fff1f1',
		},
		resumoNumero: {
			fontSize: 20,
			fontWeight: '700',
			color: '#1a3c5e',
		},
        resumoTotal: {
			fontSize: 20,
			fontWeight: '700',
			color: textPrimary,
        },
		resumoLabel: {
			fontSize: 12,
			color: textSoft,
			marginTop: 2,
		},
		inputBusca: {
			height: 48,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: darkMode ? '#374151' : '#d0d7de',
			backgroundColor: surface,
			paddingHorizontal: 14,
			fontSize: 14,
			color: darkMode ? '#e5e7eb' : '#1f2933',
			marginBottom: 12,
		},
		filtroTitulo: {
			fontSize: 12,
			fontWeight: '700',
			color: darkMode ? '#d1d5db' : '#344054',
			marginBottom: 8,
			marginTop: 4,
			textTransform: 'uppercase',
			letterSpacing: 0.4,
		},
		filtrosRow: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			gap: 8,
			marginBottom: 10,
		},
		filtroBtn: {
			borderWidth: 1,
			borderColor: darkMode ? '#374151' : '#cfd8e3',
			borderRadius: 999,
			backgroundColor: surface,
			paddingHorizontal: 12,
			paddingVertical: 8,
		},
		filtroBtnAtivo: {
			backgroundColor: '#12324a',
			borderColor: '#12324a',
		},
		filtroBtnTexto: {
			fontSize: 12,
			fontWeight: '600',
			color: darkMode ? '#d1d5db' : '#344054',
		},
		filtroBtnTextoAtivo: {
			color: '#ffffff',
		},
		resultadoInfo: {
			marginVertical: 6,
			fontSize: 12,
			color: textSoft,
		},
		vazioContainer: {
			borderWidth: 1,
			borderColor: darkMode ? '#374151' : '#dbe5ef',
			borderStyle: 'dashed',
			borderRadius: 12,
			backgroundColor: darkMode ? '#111827' : '#f8fbff',
			paddingVertical: 20,
			paddingHorizontal: 14,
			marginTop: 8,
		},
		vazioTexto: {
			textAlign: 'center',
			color: textSoft,
			fontSize: 13,
		},
		card: {
			backgroundColor: surface,
			borderRadius: 12,
			borderWidth: 1,
			borderColor: border,
			padding: 14,
			marginTop: 10,
		},
		cardHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 6,
		},
		cardId: {
			fontSize: 12,
			fontWeight: '700',
			color: textSoft,
		},
		badge: {
			borderRadius: 999,
			paddingHorizontal: 10,
			paddingVertical: 4,
		},
		badgeFinalizada: {
			backgroundColor: '#d8f6e7',
		},
		badgeCancelada: {
			backgroundColor: '#ffe8d0',
		},
		badgeFaltou: {
			backgroundColor: '#ffd9d9',
		},
		badgeTexto: {
			fontSize: 11,
			fontWeight: '700',
			color: darkMode ? '#111827' : '#1f2933',
		},
		cardPaciente: {
			fontSize: 17,
			fontWeight: '700',
			color: textPrimary,
			marginBottom: 4,
		},
		cardInfo: {
			fontSize: 13,
			color: darkMode ? '#d1d5db' : '#4b5563',
			marginBottom: 2,
		},
		modalBackdrop: {
			flex: 1,
			backgroundColor: 'rgba(15, 23, 42, 0.45)',
			justifyContent: 'center',
			padding: 20,
		},
		modalCard: {
			backgroundColor: surface,
			borderRadius: 14,
			padding: 16,
			borderWidth: 1,
			borderColor: border,
		},
		modalTitulo: {
			fontSize: 20,
			fontWeight: '700',
			color: textPrimary,
			marginBottom: 10,
		},
		modalPaciente: {
			fontSize: 17,
			fontWeight: '700',
			color: darkMode ? '#f3f4f6' : '#1f2933',
			marginBottom: 8,
		},
		modalLinha: {
			fontSize: 13,
			color: darkMode ? '#d1d5db' : '#4b5563',
			marginBottom: 3,
		},
		modalSecao: {
			fontSize: 12,
			fontWeight: '700',
			color: darkMode ? '#d1d5db' : '#344054',
			marginTop: 10,
			marginBottom: 4,
			textTransform: 'uppercase',
			letterSpacing: 0.4,
		},
		modalTexto: {
			fontSize: 13,
			color: darkMode ? '#e5e7eb' : '#1f2933',
			lineHeight: 20,
		},
		modalBotao: {
			marginTop: 16,
			backgroundColor: '#12324a',
			borderRadius: 10,
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: 12,
		},
		modalBotaoTexto: {
			color: '#ffffff',
			fontWeight: '700',
			fontSize: 15,
		},
	});
};
