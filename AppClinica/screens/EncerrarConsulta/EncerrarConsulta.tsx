import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { getStyle } from './EncerrarConsultaStyle';

type FormaPagamento = 'dinheiro' | 'cartao_credito' | 'cartao_debito' | 'pix' | '';

type Consulta = {
    id: string;
    paciente: string;
    medico: string;
    especialidade: string;
    horario: string;
    retorno: boolean;
};

const consultasRealizadas: Consulta[] = [
    {
        id: '1',
        paciente: 'Juliana Ferreira',
        medico: 'Dr. Ana',
        especialidade: 'Clínica Geral',
        horario: '10:30 - 11:00',
        retorno: false,
    },
    {
        id: '2',
        paciente: 'Carlos Eduardo Silva',
        medico: 'Dr. Ana',
        especialidade: 'Clínica Geral',
        horario: '10:50 - 12:00',
        retorno: true,
    },
];

const procedimentosOpcoes = [
    'Eletrocardiograma',
    'Curativo',
    'Nebulização',
    'Coleta de sangue',
    'Aferição de pressão',
    'Aplicação de injeção',
];

type EncerramentoConsultaTelaProps = {
    darkMode?: boolean;
    onVoltar?: () => void;
};

export function EncerramentoConsultaTela({ darkMode = false, onVoltar }: EncerramentoConsultaTelaProps) {
    const styles = getStyle(darkMode);

    const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta | null>(null);
    const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('');
    const [procedimentos, setProcedimentos] = useState<string[]>([]);
    const [observacoes, setObservacoes] = useState('');
    const [modalConfirmar, setModalConfirmar] = useState(false);
    const [modalSucesso, setModalSucesso] = useState(false);
    const [encerradas, setEncerradas] = useState<string[]>([]);

    function toggleProcedimento(proc: string) {
        setProcedimentos(prev =>
            prev.includes(proc) ? prev.filter(p => p !== proc) : [...prev, proc]
        );
    }

    function selecionar(consulta: Consulta) {
        if (encerradas.includes(consulta.id)) return;
        setConsultaSelecionada(consulta);
        setFormaPagamento('');
        setProcedimentos([]);
        setObservacoes('');
    }

    function confirmarEncerramento() {
        if (!consultaSelecionada) return;
        setEncerradas(prev => [...prev, consultaSelecionada.id]);
        setModalConfirmar(false);
        setModalSucesso(true);
    }

    function resetar() {
        setModalSucesso(false);
        setConsultaSelecionada(null);
        setFormaPagamento('');
        setProcedimentos([]);
        setObservacoes('');
    }

    const formasPagamento: { valor: FormaPagamento; label: string; icone: string }[] = [
        { valor: 'dinheiro', label: 'Dinheiro', icone: '💵' },
        { valor: 'cartao_credito', label: 'Crédito', icone: '💳' },
        { valor: 'cartao_debito', label: 'Débito', icone: '💳' },
        { valor: 'pix', label: 'Pix', icone: '⚡' },
    ];

    const pendentes = consultasRealizadas.filter(c => !encerradas.includes(c.id));
    const jaEncerradas = consultasRealizadas.filter(c => encerradas.includes(c.id));

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {onVoltar && (
                    <TouchableOpacity style={styles.modalCancel} onPress={onVoltar}>
                        <Text style={styles.modalCancelText}>Voltar</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.titulo}>Encerramento de Consulta</Text>
                <Text style={styles.subtitulo}>
                    {new Date().toLocaleDateString('pt-BR', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </Text>

                {/* Lista de consultas realizadas */}
                <Text style={styles.secaoTitulo}>Consultas Realizadas</Text>

                {pendentes.length === 0 && (
                    <View style={styles.vazioContainer}>
                        <Text style={styles.vazioTexto}>Todas as consultas foram encerradas.</Text>
                    </View>
                )}

                {pendentes.map(consulta => {
                    const selecionada = consultaSelecionada?.id === consulta.id;
                    return (
                        <TouchableOpacity
                            key={consulta.id}
                            style={[styles.card, selecionada && styles.cardSelecionado]}
                            onPress={() => selecionar(consulta)}
                            activeOpacity={0.75}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardHorario}>{consulta.horario}</Text>
                                {consulta.retorno && (
                                    <View style={styles.badgeRetorno}>
                                        <Text style={styles.badgeRetornoTexto}>Retorno</Text>
                                    </View>
                                )}
                                {!consulta.retorno && (
                                    <View style={styles.badgePendente}>
                                        <Text style={styles.badgeTexto}>Pendente</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.cardPaciente}>{consulta.paciente}</Text>
                            <View style={styles.cardInfoRow}>
                                <Text style={styles.cardInfoLabel}>Médico:</Text>
                                <Text style={styles.cardInfoValor}>{consulta.medico}</Text>
                            </View>
                            <View style={styles.cardInfoRow}>
                                <Text style={styles.cardInfoLabel}>Especialidade:</Text>
                                <Text style={styles.cardInfoValor}>{consulta.especialidade}</Text>
                            </View>
                            {consulta.retorno && (
                                <View style={styles.retornoAviso}>
                                    <Text style={styles.retornoAvisoTexto}>
                                        ℹ️ Consulta de retorno — não cobrar pagamento
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}

                {/* Formulário de encerramento */}
                {consultaSelecionada && (
                    <>
                        {/* Pagamento */}
                        {!consultaSelecionada.retorno && (
                            <>
                                <Text style={styles.secaoTitulo}>Forma de Pagamento</Text>
                                <View style={styles.pagamentoGrid}>
                                    {formasPagamento.map(fp => (
                                        <TouchableOpacity
                                            key={fp.valor}
                                            style={[
                                                styles.pagamentoBtn,
                                                formaPagamento === fp.valor && styles.pagamentoBtnAtivo,
                                            ]}
                                            onPress={() => setFormaPagamento(fp.valor)}
                                        >
                                            <Text style={styles.pagamentoIcone}>{fp.icone}</Text>
                                            <Text style={[
                                                styles.pagamentoLabel,
                                                formaPagamento === fp.valor && styles.pagamentoLabelAtivo,
                                            ]}>
                                                {fp.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        )}

                        {/* Procedimentos */}
                        <Text style={styles.secaoTitulo}>Procedimentos Realizados</Text>
                        <View style={styles.procedimentosGrid}>
                            {procedimentosOpcoes.map(proc => {
                                const ativo = procedimentos.includes(proc);
                                return (
                                    <TouchableOpacity
                                        key={proc}
                                        style={[styles.procBtn, ativo && styles.procBtnAtivo]}
                                        onPress={() => toggleProcedimento(proc)}
                                    >
                                        <Text style={[styles.procTexto, ativo && styles.procTextoAtivo]}>
                                            {ativo ? '✓ ' : ''}{proc}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Observações */}
                        <Text style={styles.secaoTitulo}>Observações</Text>
                        <View style={styles.textAreaCard}>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Informações adicionais sobre o encerramento..."
                                placeholderTextColor="#a0aec0"
                                value={observacoes}
                                onChangeText={setObservacoes}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>

                        {/* Botão encerrar */}
                        <TouchableOpacity
                            style={[
                                styles.btnEncerrar,
                                (!consultaSelecionada.retorno && !formaPagamento) && styles.btnDesabilitado,
                            ]}
                            onPress={() => setModalConfirmar(true)}
                            disabled={!consultaSelecionada.retorno && !formaPagamento}
                        >
                            <Text style={styles.btnEncerrarTexto}>Encerrar Atendimento</Text>
                        </TouchableOpacity>
                    </>
                )}

                {/* Encerradas */}
                {jaEncerradas.length > 0 && (
                    <>
                        <Text style={styles.secaoTitulo}>Encerradas</Text>
                        {jaEncerradas.map(consulta => (
                            <View key={consulta.id} style={[styles.card, styles.cardEncerrado]}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardHorario}>{consulta.horario}</Text>
                                    <View style={styles.badgeEncerrado}>
                                        <Text style={styles.badgeTexto}>Encerrada</Text>
                                    </View>
                                </View>
                                <Text style={[styles.cardPaciente, { color: '#667085' }]}>
                                    {consulta.paciente}
                                </Text>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>

            {/* Modal confirmar encerramento */}
            <Modal
                visible={modalConfirmar}
                transparent
                animationType="fade"
                onRequestClose={() => setModalConfirmar(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitulo}>Encerrar Atendimento</Text>
                        {consultaSelecionada && (
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalPaciente}>{consultaSelecionada.paciente}</Text>
                                <Text style={styles.modalDetalhe}>{consultaSelecionada.horario}</Text>
                                {!consultaSelecionada.retorno && formaPagamento && (
                                    <Text style={styles.modalDetalhe}>
                                        Pagamento: {formasPagamento.find(f => f.valor === formaPagamento)?.label}
                                    </Text>
                                )}
                                {consultaSelecionada.retorno && (
                                    <Text style={styles.modalDetalhe}>Retorno — sem cobrança</Text>
                                )}
                                {procedimentos.length > 0 && (
                                    <Text style={styles.modalDetalhe}>
                                        Procedimentos: {procedimentos.join(', ')}
                                    </Text>
                                )}
                            </View>
                        )}
                        <Text style={styles.modalPergunta}>
                            Confirma o encerramento deste atendimento?
                        </Text>
                        <View style={styles.modalAcoes}>
                            <TouchableOpacity
                                style={styles.modalCancel}
                                onPress={() => setModalConfirmar(false)}
                            >
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalConfirm}
                                onPress={confirmarEncerramento}
                            >
                                <Text style={styles.modalConfirmText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal sucesso */}
            <Modal
                visible={modalSucesso}
                transparent
                animationType="fade"
                onRequestClose={resetar}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalSucessoIcone}>✅</Text>
                        <Text style={styles.modalTitulo}>Atendimento Encerrado</Text>
                        <Text style={styles.modalSucessoTexto}>
                            O atendimento de {consultaSelecionada?.paciente} foi encerrado e registrado com sucesso.
                        </Text>
                        <TouchableOpacity style={styles.modalConfirm} onPress={resetar}>
                            <Text style={styles.modalConfirmText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}