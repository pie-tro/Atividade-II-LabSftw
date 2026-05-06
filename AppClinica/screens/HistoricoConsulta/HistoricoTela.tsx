import React, { useMemo, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStyle } from './HistoricoStyle';

type StatusHistorico = 'finalizada' | 'cancelada' | 'faltou';
type PeriodoFiltro = '7' | '30' | 'todos';
type StatusFiltro = 'todas' | StatusHistorico;

type ItemHistorico = {
	id: string;
	data: string;
	horario: string;
	paciente: string;
	medico: string;
	especialidade: string;
	status: StatusHistorico;
	diagnostico: string;
	conduta: string;
};

const historicoInicial: ItemHistorico[] = [
	{
		id: 'H001',
		data: '03/05/2026',
		horario: '09:00 - 09:30',
		paciente: 'Felipe Santos',
		medico: 'Dr. Silva',
		especialidade: 'Cardiologia',
		status: 'finalizada',
		diagnostico: 'Hipertensao leve em acompanhamento.',
		conduta: 'Ajuste de medicacao e retorno em 30 dias.',
	},
	{
		id: 'H002',
		data: '01/05/2026',
		horario: '10:30 - 11:00',
		paciente: 'Arthur Lima',
		medico: 'Dra. Lima',
		especialidade: 'Clinica Geral',
		status: 'faltou',
		diagnostico: 'Consulta nao realizada.',
		conduta: 'Reagendar com recepcao.',
	},
	{
		id: 'H003',
		data: '28/04/2026',
		horario: '14:00 - 14:30',
		paciente: 'Pietro Costa',
		medico: 'Dr. Costa',
		especialidade: 'Ortopedia',
		status: 'cancelada',
		diagnostico: 'Consulta cancelada pelo paciente.',
		conduta: 'Aguardar novo agendamento.',
	},
	{
		id: 'H004',
		data: '26/04/2026',
		horario: '08:00 - 08:30',
		paciente: 'Marina Alves',
		medico: 'Dr. Silva',
		especialidade: 'Cardiologia',
		status: 'finalizada',
		diagnostico: 'Eletrocardiograma sem alteracoes significativas.',
		conduta: 'Manter rotina de exames anuais.',
	},
];

function parseDataBR(valor: string): Date {
	const [dia, mes, ano] = valor.split('/').map(Number);
	return new Date(ano, mes - 1, dia, 0, 0, 0, 0);
}

function labelStatus(status: StatusHistorico): string {
	if (status === 'finalizada') return 'Finalizada';
	if (status === 'cancelada') return 'Cancelada';
	return 'Faltou';
}

type HistoricoTelaProps = {
	darkMode?: boolean;
	onVoltar?: () => void;
};

export function HistoricoTela({ darkMode = false, onVoltar }: HistoricoTelaProps) {
	const styles = getStyle(darkMode);

	const [busca, setBusca] = useState('');
	const [filtroStatus, setFiltroStatus] = useState<StatusFiltro>('todas');
	const [filtroPeriodo, setFiltroPeriodo] = useState<PeriodoFiltro>('30');
	const [consultaSelecionada, setConsultaSelecionada] = useState<ItemHistorico | null>(null);

	const historicoFiltrado = useMemo(() => {
		const termo = busca.trim().toLowerCase();
		const hoje = new Date();

		return historicoInicial.filter((item) => {
			if (filtroStatus !== 'todas' && item.status !== filtroStatus) {
				return false;
			}

			if (filtroPeriodo !== 'todos') {
				const dataItem = parseDataBR(item.data);
				const limite = new Date(hoje);
				limite.setDate(hoje.getDate() - Number(filtroPeriodo));
				if (dataItem < limite) {
					return false;
				}
			}

			if (!termo) return true;

			return (
				item.paciente.toLowerCase().includes(termo) ||
				item.medico.toLowerCase().includes(termo) ||
				item.especialidade.toLowerCase().includes(termo) ||
				item.id.toLowerCase().includes(termo)
			);
		});
	}, [busca, filtroPeriodo, filtroStatus]);

	const total = historicoInicial.length;
	const totalFinalizadas = historicoInicial.filter(item => item.status === 'finalizada').length;
	const totalCanceladas = historicoInicial.filter(item => item.status === 'cancelada').length;
	const totalFaltou = historicoInicial.filter(item => item.status === 'faltou').length;

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				{onVoltar && (
					<TouchableOpacity style={styles.filtroBtn} onPress={onVoltar}>
						<Text style={styles.filtroBtnTexto}>Voltar</Text>
					</TouchableOpacity>
				)}

				<Text style={styles.titulo}>Historico de Consultas</Text>
				<Text style={styles.subtitulo}>Acompanhe consultas finalizadas, canceladas e faltas</Text>

				<View style={styles.resumoRow}>
					<View style={styles.resumoCard}>
						<Text style={[styles.resumoNumero, styles.resumoTotal]}>{total}</Text>
						<Text style={styles.resumoLabel}>Total</Text>
					</View>
					<View style={[styles.resumoCard, styles.resumoCardFinalizada]}>
						<Text style={styles.resumoNumero}>{totalFinalizadas}</Text>
						<Text style={styles.resumoLabel}>Finalizadas</Text>
					</View>
					<View style={[styles.resumoCard, styles.resumoCardCancelada]}>
						<Text style={styles.resumoNumero}>{totalCanceladas}</Text>
						<Text style={styles.resumoLabel}>Canceladas</Text>
					</View>
					<View style={[styles.resumoCard, styles.resumoCardFaltou]}>
						<Text style={styles.resumoNumero}>{totalFaltou}</Text>
						<Text style={styles.resumoLabel}>Faltou</Text>
					</View>
				</View>

				<TextInput
					style={styles.inputBusca}
					placeholder="Buscar por paciente, medico, especialidade ou ID"
					placeholderTextColor="#98a2b3"
					value={busca}
					onChangeText={setBusca}
				/>

				<Text style={styles.filtroTitulo}>Status</Text>
				<View style={styles.filtrosRow}>
					{(['todas', 'finalizada', 'cancelada', 'faltou'] as const).map((status) => (
						<TouchableOpacity
							key={status}
							style={[
								styles.filtroBtn,
								filtroStatus === status && styles.filtroBtnAtivo,
							]}
							onPress={() => setFiltroStatus(status)}
						>
							<Text
								style={[
									styles.filtroBtnTexto,
									filtroStatus === status && styles.filtroBtnTextoAtivo,
								]}
							>
								{status === 'todas' ? 'Todas' : labelStatus(status)}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.filtroTitulo}>Periodo</Text>
				<View style={styles.filtrosRow}>
					{([
						{ valor: '7', label: 'Ultimos 7 dias' },
						{ valor: '30', label: 'Ultimos 30 dias' },
						{ valor: 'todos', label: 'Todo periodo' },
					] as const).map((periodo) => (
						<TouchableOpacity
							key={periodo.valor}
							style={[
								styles.filtroBtn,
								filtroPeriodo === periodo.valor && styles.filtroBtnAtivo,
							]}
							onPress={() => setFiltroPeriodo(periodo.valor)}
						>
							<Text
								style={[
									styles.filtroBtnTexto,
									filtroPeriodo === periodo.valor && styles.filtroBtnTextoAtivo,
								]}
							>
								{periodo.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.resultadoInfo}>{historicoFiltrado.length} registro(s) encontrado(s)</Text>

				{historicoFiltrado.length === 0 && (
					<View style={styles.vazioContainer}>
						<Text style={styles.vazioTexto}>Nenhuma consulta encontrada para os filtros selecionados.</Text>
					</View>
				)}

				{historicoFiltrado.map((item) => (
					<TouchableOpacity
						key={item.id}
						style={styles.card}
						onPress={() => setConsultaSelecionada(item)}
					>
						<View style={styles.cardHeader}>
							<Text style={styles.cardId}>{item.id}</Text>
							<View
								style={[
									styles.badge,
									item.status === 'finalizada' && styles.badgeFinalizada,
									item.status === 'cancelada' && styles.badgeCancelada,
									item.status === 'faltou' && styles.badgeFaltou,
								]}
							>
								<Text style={styles.badgeTexto}>{labelStatus(item.status)}</Text>
							</View>
						</View>

						<Text style={styles.cardPaciente}>{item.paciente}</Text>
						<Text style={styles.cardInfo}>{item.data} · {item.horario}</Text>
						<Text style={styles.cardInfo}>Medico: {item.medico}</Text>
						<Text style={styles.cardInfo}>Especialidade: {item.especialidade}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			<Modal
				visible={consultaSelecionada !== null}
				transparent
				animationType="fade"
				onRequestClose={() => setConsultaSelecionada(null)}
			>
				<View style={styles.modalBackdrop}>
					<View style={styles.modalCard}>
						<Text style={styles.modalTitulo}>Detalhes da Consulta</Text>

						{consultaSelecionada && (
							<>
								<Text style={styles.modalPaciente}>{consultaSelecionada.paciente}</Text>
								<Text style={styles.modalLinha}>ID: {consultaSelecionada.id}</Text>
								<Text style={styles.modalLinha}>Data: {consultaSelecionada.data}</Text>
								<Text style={styles.modalLinha}>Horario: {consultaSelecionada.horario}</Text>
								<Text style={styles.modalLinha}>Medico: {consultaSelecionada.medico}</Text>
								<Text style={styles.modalLinha}>Especialidade: {consultaSelecionada.especialidade}</Text>
								<Text style={styles.modalLinha}>Status: {labelStatus(consultaSelecionada.status)}</Text>

								<Text style={styles.modalSecao}>Diagnostico</Text>
								<Text style={styles.modalTexto}>{consultaSelecionada.diagnostico}</Text>

								<Text style={styles.modalSecao}>Conduta</Text>
								<Text style={styles.modalTexto}>{consultaSelecionada.conduta}</Text>
							</>
						)}

						<TouchableOpacity
							style={styles.modalBotao}
							onPress={() => setConsultaSelecionada(null)}
						>
							<Text style={styles.modalBotaoTexto}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}
