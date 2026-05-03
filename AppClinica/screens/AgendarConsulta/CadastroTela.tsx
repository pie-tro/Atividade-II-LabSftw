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

const horarios = [
    '7:00 - 7:30', '7:30 - 8:00', '8:00 - 8:30', '8:30 - 9:00',
    '9:00 - 9:30', '9:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
];

const nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function parseDataBR(valor: string): Date | null {
    const match = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return null;

    const dia = Number(match[1]);
    const mes = Number(match[2]) - 1;
    const ano = Number(match[3]);
    const data = new Date(ano, mes, dia);

    if (
        data.getFullYear() !== ano ||
        data.getMonth() !== mes ||
        data.getDate() !== dia
    ) {
        return null;
    }

    return new Date(ano, mes, dia, 0, 0, 0, 0);
}

function addDias(data: Date, dias: number): Date {
    const nova = new Date(data);
    nova.setDate(nova.getDate() + dias);
    return nova;
}

function formatDataBR(data: Date): string {
    return data.toLocaleDateString('pt-BR');
}

function gerarDisponibilidade(chave: string): boolean {
    let hash = 0;
    for (let i = 0; i < chave.length; i += 1) {
        hash = (hash * 31 + chave.charCodeAt(i)) % 100000;
    }
    return hash % 3 !== 0;
}

export function CadastroTela() {
    const styles = getStyle();

    const [cliente, setCliente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [medico, setMedico] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [periodoInicio, setPeriodoInicio] = useState('');
    const [periodoFim, setPeriodoFim] = useState('');
    const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
    const [semanaOffset, setSemanaOffset] = useState(0);
    const [customPickerAberto, setCustomPickerAberto] = useState<null | 'cliente' | 'medico' | 'especialidade'>(null);

    const isAndroid = Platform.OS === 'android';

    const dataInicio = useMemo(() => parseDataBR(periodoInicio), [periodoInicio]);
    const dataFim = useMemo(() => parseDataBR(periodoFim), [periodoFim]);

    const periodoValido = !!dataInicio && !!dataFim && dataInicio <= dataFim;

    const totalSemanas = useMemo(() => {
        if (!periodoValido || !dataInicio || !dataFim) return 0;
        const diffDias = Math.floor((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24));
        return Math.floor(diffDias / 7) + 1;
    }, [periodoValido, dataInicio, dataFim]);

    useEffect(() => {
        setSemanaOffset(0);
        setHorarioSelecionado(null);
    }, [periodoInicio, periodoFim]);

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
        if (!periodoValido || !dataInicio || !dataFim) return [] as Date[];

        const inicioSemana = addDias(dataInicio, semanaOffset * 7);
        const dias: Date[] = [];
        for (let i = 0; i < 7; i += 1) {
            const dia = addDias(inicioSemana, i);
            if (dia > dataFim) break;
            dias.push(dia);
        }
        return dias;
    }, [periodoValido, dataInicio, dataFim, semanaOffset]);

    const podeVoltarSemana = periodoValido && semanaOffset > 0;
    const podeAvancarSemana = periodoValido && semanaOffset < totalSemanas - 1;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
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
                            onValueChange={setCliente}
                            mode="dropdown"
                            dropdownIconColor="#1a3c5e"
                            style={styles.pickerNative}
                        >
                            {clientes.map(c => <Picker.Item key={c} label={c || 'Selecione o cliente'} value={c} />)}
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

                {/* Período */}
                <Text style={styles.label}>Período</Text>
                <View style={styles.linhaData}>
                    <TextInput
                        style={[styles.input, styles.inputMeia]}
                        placeholder="dd/mm/aaaa"
                        value={periodoInicio}
                        onChangeText={setPeriodoInicio}
                    />
                    <Text style={styles.separador}>até</Text>
                    <TextInput
                        style={[styles.input, styles.inputMeia]}
                        placeholder="dd/mm/aaaa"
                        value={periodoFim}
                        onChangeText={setPeriodoFim}
                    />
                </View>
                {periodoValido && semanaAtual.length > 0 && (
                    <Text style={styles.periodoInfo}>
                        Semana {semanaOffset + 1} de {totalSemanas}: {formatDataBR(semanaAtual[0])} ate {formatDataBR(semanaAtual[semanaAtual.length - 1])}
                    </Text>
                )}
                {(!periodoValido && (periodoInicio.length > 0 || periodoFim.length > 0)) && (
                    <Text style={styles.periodoErro}>Digite um periodo valido no formato dd/mm/aaaa.</Text>
                )}

                {/* Tabela de Horários */}
                <Text style={styles.label}>Horários disponíveis</Text>
                <View style={styles.tabelaContainer}>
                    <View style={styles.tabelaHeader}>
                        <Text style={styles.colunaHorario}>Horário</Text>
                        {semanaAtual.map((d) => (
                            <Text key={d.toISOString()} style={styles.colunaDia}>{nomesDias[d.getDay()]}</Text>
                        ))}
                    </View>

                    {!periodoValido && (
                        <Text style={styles.periodoAviso}>Selecione o periodo para ver os horarios da semana.</Text>
                    )}

                    {periodoValido && horarios.map(h => (
                        <View key={h} style={styles.tabelaLinha}>
                            <Text style={styles.colunaHorario}>{h}</Text>
                            {semanaAtual.map((dia) => {
                                const chave = `${formatDataBR(dia)}|${h}`;
                                const disponivel = gerarDisponibilidade(chave);
                                const selecionado = horarioSelecionado === chave;
                                return (
                                    <TouchableOpacity
                                        key={chave}
                                        style={styles.colunaDia}
                                        onPress={() => disponivel && setHorarioSelecionado(chave)}
                                        disabled={!disponivel}
                                    >
                                        <Text style={selecionado ? styles.slotSelecionado : (disponivel ? styles.slotDisponivel : styles.slotIndisponivel)}>
                                            {disponivel ? 'OK' : '--'}
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
                <TouchableOpacity style={styles.btnConfirmar}>
                    <Text style={styles.btnConfirmarText}>Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={!isAndroid && customPickerAberto !== null} transparent animationType="fade" onRequestClose={() => setCustomPickerAberto(null)}>
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        {(customPickerAberto === 'cliente' ? clientes : customPickerAberto === 'medico' ? medicos : especialidades)
                            .filter(item => item !== '')
                            .map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.modalOption}
                                    onPress={() => {
                                        if (customPickerAberto === 'cliente') setCliente(item);
                                        if (customPickerAberto === 'medico') setMedico(item);
                                        if (customPickerAberto === 'especialidade') setEspecialidade(item);
                                        setCustomPickerAberto(null);
                                    }}
                                >
                                    <Text style={styles.modalOptionText}>{item}</Text>
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
