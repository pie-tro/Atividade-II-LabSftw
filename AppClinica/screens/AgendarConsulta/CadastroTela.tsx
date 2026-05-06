import React, { useEffect, useMemo, useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity,
    ScrollView, Platform, Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { getStyle } from "./CadastroTelaStyle";

const clientes = ['', 'Felipe', 'Arthur', 'Pietro'];
const medicos = ['', 'Dr. Silva', 'Dr. Costa', 'Dra. Lima'];
const especialidades = ['', 'Cardiologia', 'Ortopedia', 'Clínica Geral'];
const opcaoCadastrarCliente = '__cadastro_cliente__';

const horarios = [
    '7:00 - 7:30', '7:30 - 8:00', '8:00 - 8:30', '8:30 - 9:00',
    '9:00 - 9:30', '9:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
];

const nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function addDias(data: Date, dias: number): Date {
    const nova = new Date(data);
    nova.setDate(nova.getDate() + dias);
    return nova;
}

function addMeses(data: Date, meses: number): Date {
    const nova = new Date(data);
    nova.setMonth(nova.getMonth() + meses);
    return nova;
}

function formatDataBR(data: Date): string {
    return data.toLocaleDateString('pt-BR');
}

type StatusHorario = 'L' | 'C' | 'M' | 'X' | 'B';

function gerarStatusHorario(chave: string): StatusHorario {
    let hash = 0;
    for (let i = 0; i < chave.length; i += 1) {
        hash = (hash * 31 + chave.charCodeAt(i)) % 100000;
    }

    const bucket = hash % 10;
    if (bucket <= 3) return 'L';
    if (bucket <= 5) return 'C';
    if (bucket === 6) return 'M';
    if (bucket <= 8) return 'X';
    return 'B';
}

type CadastroTelaProps = {
    darkMode?: boolean;
    onVoltar?: () => void;
    onConfirmar?: () => void;
    onAbrirCadastroCliente?: () => void;
};

export function CadastroTela({ darkMode = false, onVoltar, onConfirmar, onAbrirCadastroCliente }: CadastroTelaProps) {
    const styles = getStyle(darkMode);

    const [cliente, setCliente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [medico, setMedico] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
    const [semanaOffset, setSemanaOffset] = useState(0);
    const [customPickerAberto, setCustomPickerAberto] = useState<null | 'cliente' | 'medico' | 'especialidade'>(null);

    const isAndroid = Platform.OS === 'android';

    const agendaInicio = useMemo(() => {
        const hoje = new Date();
        return new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0, 0);
    }, []);

    const agendaFim = useMemo(() => {
        const fim = addMeses(agendaInicio, 2);
        fim.setDate(fim.getDate() - 1);
        return fim;
    }, [agendaInicio]);

    const agendaDisponivel = medico !== '';

    const totalSemanas = useMemo(() => {
        if (!agendaDisponivel) return 0;
        const diffDias = Math.floor((agendaFim.getTime() - agendaInicio.getTime()) / (1000 * 60 * 60 * 24));
        return Math.floor(diffDias / 7) + 1;
    }, [agendaDisponivel, agendaFim, agendaInicio]);

    useEffect(() => {
        setSemanaOffset(0);
        setHorarioSelecionado(null);
    }, [medico]);

    useEffect(() => {
        if (totalSemanas === 0) {
            setSemanaOffset(0);
            return;
        }
        if (semanaOffset > totalSemanas - 1) {
            setSemanaOffset(totalSemanas - 1);
        }
        if (semanaOffset < 0) {
            setSemanaOffset(0);
        }
    }, [semanaOffset, totalSemanas]);

    const semanaAtual = useMemo(() => {
        if (!agendaDisponivel) return [] as Date[];

        const inicioSemana = addDias(agendaInicio, semanaOffset * 7);
        const dias: Date[] = [];
        for (let i = 0; i < 7; i += 1) {
            const dia = addDias(inicioSemana, i);
            if (dia > agendaFim) break;
            dias.push(dia);
        }
        return dias;
    }, [agendaDisponivel, agendaInicio, agendaFim, semanaOffset]);

    const podeVoltarSemana = agendaDisponivel && semanaOffset > 0;
    const podeAvancarSemana = agendaDisponivel && semanaOffset < totalSemanas - 1;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                {onVoltar && (
                    <TouchableOpacity style={styles.btnNav} onPress={onVoltar}>
                        <Text style={styles.btnNavText}>Voltar</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.titulo}>Marcação de Consulta</Text>

                {/* Cliente */}
                <Text style={styles.label}>Cliente</Text>
                {!isAndroid ? (
                    <TouchableOpacity style={styles.selectButton} onPress={() => setCustomPickerAberto('cliente')}>
                        <Text style={styles.selectButtonText}>{cliente || 'Selecione o cliente'}</Text>
                        <Text style={styles.selectChevron}>▼</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={cliente}
                            onValueChange={(valor) => {
                                if (valor === opcaoCadastrarCliente) {
                                    onAbrirCadastroCliente?.();
                                    return;
                                }
                                setCliente(valor);
                            }}
                            mode="dropdown"
                            dropdownIconColor="#1a3c5e"
                            style={styles.pickerNative}
                        >
                            {clientes.map(c => <Picker.Item key={c} label={c || 'Selecione o cliente'} value={c} />)}
                            <Picker.Item label="+ Cadastrar cliente" value={opcaoCadastrarCliente} />
                        </Picker>
                    </View>
                )}

                {/* Telefone */}
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                />

                {/* Endereço */}
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rua, número, bairro"
                    value={endereco}
                    onChangeText={setEndereco}
                />

                {/* Médico */}
                <Text style={styles.label}>Médico</Text>
                {!isAndroid ? (
                    <TouchableOpacity style={styles.selectButton} onPress={() => setCustomPickerAberto('medico')}>
                        <Text style={styles.selectButtonText}>{medico || 'Selecione o médico'}</Text>
                        <Text style={styles.selectChevron}>▼</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={medico}
                            onValueChange={setMedico}
                            mode="dropdown"
                            dropdownIconColor="#1a3c5e"
                            style={styles.pickerNative}
                        >
                            {medicos.map(m => <Picker.Item key={m} label={m || 'Selecione o médico'} value={m} />)}
                        </Picker>
                    </View>
                )}

                {/* Especialidade */}
                <Text style={styles.label}>Especialidade</Text>
                {!isAndroid ? (
                    <TouchableOpacity style={styles.selectButton} onPress={() => setCustomPickerAberto('especialidade')}>
                        <Text style={styles.selectButtonText}>{especialidade || 'Selecione a especialidade'}</Text>
                        <Text style={styles.selectChevron}>▼</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={especialidade}
                            onValueChange={setEspecialidade}
                            mode="dropdown"
                            dropdownIconColor="#1a3c5e"
                            style={styles.pickerNative}
                        >
                            {especialidades.map(e => <Picker.Item key={e} label={e || 'Selecione a especialidade'} value={e} />)}
                        </Picker>
                    </View>
                )}

                <Text style={styles.label}>Agenda do médico (2 meses)</Text>
                {agendaDisponivel && semanaAtual.length > 0 && (
                    <Text style={styles.periodoInfo}>
                        Semana {semanaOffset + 1} de {totalSemanas}: {formatDataBR(semanaAtual[0])} ate {formatDataBR(semanaAtual[semanaAtual.length - 1])}
                    </Text>
                )}
                {!agendaDisponivel && (
                    <Text style={styles.periodoAviso}>Selecione um médico para visualizar a agenda de 2 meses.</Text>
                )}

                <View style={styles.legendaContainer}>
                    <Text style={styles.legendaItem}>L = Livre</Text>
                    <Text style={styles.legendaItem}>C = Confirmado</Text>
                    <Text style={styles.legendaItem}>M = Marcado</Text>
                    <Text style={styles.legendaItem}>X = Indisponível</Text>
                    <Text style={styles.legendaItem}>B = Bloqueado</Text>
                </View>

                <Text style={styles.label}>Horários da agenda</Text>
                <View style={styles.tabelaContainer}>
                    <View style={styles.tabelaHeader}>
                        <Text style={styles.colunaHorario}>Horário</Text>
                        {semanaAtual.map((d) => (
                            <Text key={d.toISOString()} style={styles.colunaDia}>{nomesDias[d.getDay()]}</Text>
                        ))}
                    </View>

                    {!agendaDisponivel && (
                        <Text style={styles.periodoAviso}>Selecione o médico para ver os horários da semana.</Text>
                    )}

                    {agendaDisponivel && horarios.map(h => (
                        <View key={h} style={styles.tabelaLinha}>
                            <Text style={styles.colunaHorario}>{h}</Text>
                            {semanaAtual.map((dia) => {
                                const chave = `${medico}|${formatDataBR(dia)}|${h}`;
                                const status = gerarStatusHorario(chave);
                                const selecionado = horarioSelecionado === chave;
                                return (
                                    <TouchableOpacity
                                        key={chave}
                                        style={styles.colunaDia}
                                        onPress={() => status === 'L' && setHorarioSelecionado(chave)}
                                        disabled={status !== 'L'}
                                    >
                                        <Text
                                            style={
                                                selecionado
                                                    ? styles.slotSelecionado
                                                    : status === 'L'
                                                        ? styles.slotLivre
                                                        : status === 'C'
                                                            ? styles.slotConfirmado
                                                            : status === 'M'
                                                                ? styles.slotMarcado
                                                                : status === 'X'
                                                                    ? styles.slotIndisponivel
                                                                    : styles.slotBloqueado
                                            }
                                        >
                                            {status}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                            {semanaAtual.length === 0 && (
                                <Text style={styles.colunaDia}>--</Text>
                            )}
                            {semanaAtual.length > 0 && semanaAtual.length < 7 && Array.from({ length: 7 - semanaAtual.length }).map((_, idx) => (
                                <Text key={`${h}-vazio-${idx}`} style={styles.colunaDia}> </Text>
                            ))}
                        </View>
                    ))}

                    <View style={styles.navegacao}>
                        <TouchableOpacity
                            style={[styles.btnNav, !podeVoltarSemana && styles.btnNavDisabled]}
                            onPress={() => podeVoltarSemana && setSemanaOffset(semanaOffset - 1)}
                            disabled={!podeVoltarSemana}
                        >
                            <Text style={styles.btnNavText}>{'‹ Anterior'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnNav, !podeAvancarSemana && styles.btnNavDisabled]}
                            onPress={() => podeAvancarSemana && setSemanaOffset(semanaOffset + 1)}
                            disabled={!podeAvancarSemana}
                        >
                            <Text style={styles.btnNavText}>{'Próxima ›'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Botão Confirmar */}
                <TouchableOpacity style={styles.btnConfirmar} onPress={onConfirmar}>
                    <Text style={styles.btnConfirmarText}>Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={!isAndroid && customPickerAberto !== null} transparent animationType="fade" onRequestClose={() => setCustomPickerAberto(null)}>
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        {(customPickerAberto === 'cliente' ? [...clientes, opcaoCadastrarCliente] : customPickerAberto === 'medico' ? medicos : especialidades)
                            .filter(item => item !== '')
                            .map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.modalOption}
                                    onPress={() => {
                                        if (customPickerAberto === 'cliente') {
                                            if (item === opcaoCadastrarCliente) {
                                                setCustomPickerAberto(null);
                                                onAbrirCadastroCliente?.();
                                                return;
                                            }
                                            setCliente(item);
                                        }
                                        if (customPickerAberto === 'medico') setMedico(item);
                                        if (customPickerAberto === 'especialidade') setEspecialidade(item);
                                        setCustomPickerAberto(null);
                                    }}
                                >
                                    <Text style={styles.modalOptionText}>{item === opcaoCadastrarCliente ? '+ Cadastrar cliente' : item}</Text>
                                </TouchableOpacity>
                            ))}
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setCustomPickerAberto(null)}>
                            <Text style={styles.modalCancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
