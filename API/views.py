from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from API.models import Paciente, Medico, Secretaria, Cajero, DisponibilidadDiaria
from API.serializers import PacienteSerializer, MedicoSerializer, SecretariaSerializer, CajeroSerializer, DisponibilidadDiariaSerializer

from datetime import datetime

@csrf_exempt
def PacienteApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            pacientes = Paciente.objects.all()
            pacientes_serializer = PacienteSerializer(pacientes, many=True)
            return JsonResponse(pacientes_serializer.data, safe=False)
        else:
            paciente = Paciente.objects.get(id=id)
            paciente_serializer = PacienteSerializer(paciente)
            return JsonResponse(paciente_serializer.data, safe=False)

    elif request.method == 'POST':
        paciente_data = JSONParser().parse(request)
        paciente_serializer = PacienteSerializer(data=paciente_data)
        if paciente_serializer.is_valid():
            paciente_serializer.save()
            return JsonResponse('Added Successfully', safe=False)
        return JsonResponse('Failed to add', safe=False)

    elif request.method == 'PUT':
        paciente_data = JSONParser().parse(request)
        paciente = Paciente.objects.get(id=paciente_data['id'])
        paciente_serializer = PacienteSerializer(paciente, data=paciente_data)
        if paciente_serializer.is_valid():
            paciente_serializer.save()
            return JsonResponse('Update Successfully', safe=False)
        return JsonResponse('Failed to update', safe=False)

    elif request.method == 'DELETE':
        paciente = Paciente.objects.get(id=id)
        paciente.delete()
        return JsonResponse('Deleted Successfully', safe=False)

@csrf_exempt
def MedicoApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            medicos = Medico.objects.all()
            medicos_serializer = MedicoSerializer(medicos, many=True)
            return JsonResponse(medicos_serializer.data, safe=False)
        else:
            medico = Medico.objects.get(id=id)
            medico_serializer = MedicoSerializer(medico)
            return JsonResponse(medico_serializer.data, safe=False)

    elif request.method == 'POST':
        medico_data = JSONParser().parse(request)
        medico_serializer = MedicoSerializer(data=medico_data)
        if medico_serializer.is_valid():
            medico_serializer.save()
            return JsonResponse('Added Successfully', safe=False)
        return JsonResponse('Failed to add', safe=False)

    elif request.method == 'PUT':
        medico_data = JSONParser().parse(request)
        medico = Medico.objects.get(id=medico_data['id'])
        medico_serializer = MedicoSerializer(medico, data=medico_data)
        if medico_serializer.is_valid():
            medico_serializer.save()
            return JsonResponse('Update Successfully', safe=False)
        return JsonResponse('Failed to update', safe=False)

    elif request.method == 'DELETE':
        medico = Medico.objects.get(id=id)
        medico.delete()
        return JsonResponse('Deleted Successfully', safe=False)
    
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        rut = data.get('rut')
        contraseña = data.get('contraseña')

        # Intentar encontrar al usuario en las tablas
        paciente = Paciente.objects.filter(rut=rut, contraseña=contraseña).first()
        medico = Medico.objects.filter(rut=rut, contraseña=contraseña).first()
        secretaria = Secretaria.objects.filter(rut=rut, contraseña=contraseña).first()
        cajero = Cajero.objects.filter(rut=rut, contraseña=contraseña).first()

        if paciente:
            return JsonResponse({'userType': 'Paciente', 'userData': PacienteSerializer(paciente).data})
        elif medico:
            return JsonResponse({'userType': 'Medico', 'userData': MedicoSerializer(medico).data})
        elif secretaria:
            return JsonResponse({'userType': 'Secretaria', 'userData': SecretariaSerializer(secretaria).data})
        elif cajero:
            return JsonResponse({'userType': 'Cajero', 'userData': CajeroSerializer(cajero).data})
        else:
            return JsonResponse({'error': 'Credenciales inválidas'}, status=400)

@csrf_exempt
def disponibilidadMedico(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        
        # Extraer el día de la fecha
        fecha = datetime.strptime(data['dia'], '%Y-%m-%d')
        dia_semana = fecha.strftime('%A')

        # Obtener el medico
        medico = Medico.objects.get(id=data['idMedico'])

        # Verificar el día de la semana y horarios según el requerimiento
        if dia_semana == 'Saturday':
            hora_inicio = datetime.strptime(data['hora_inicio'], '%H:%M')
            hora_fin = datetime.strptime(data['hora_fin'], '%H:%M')
            horario_inicio = datetime.strptime('09:00', '%H:%M')
            horario_fin = datetime.strptime('14:00', '%H:%M')

            if horario_inicio <= hora_inicio <= horario_fin and horario_inicio <= hora_fin <= horario_fin:
                disponibilidad = DisponibilidadDiaria(medico=medico, dia=data['dia'], hora_inicio=data['hora_inicio'], hora_fin=data['hora_fin'])
                disponibilidad.save()
                return JsonResponse('Disponibilidad agregada exitosamente', safe=False)
            else:
                return JsonResponse('Horario inválido para sábado', status=400)
        else:
            hora_inicio = datetime.strptime(data['hora_inicio'], '%H:%M')
            hora_fin = datetime.strptime(data['hora_fin'], '%H:%M')
            horario_inicio = datetime.strptime('09:00', '%H:%M')
            horario_fin = datetime.strptime('20:00', '%H:%M')

            if horario_inicio <= hora_inicio <= horario_fin and horario_inicio <= hora_fin <= horario_fin:
                disponibilidad = DisponibilidadDiaria(medico=medico, dia=data['dia'], hora_inicio=data['hora_inicio'], hora_fin=data['hora_fin'])
                disponibilidad.save()
                return JsonResponse('Disponibilidad agregada exitosamente', safe=False)
            else:
                return JsonResponse('Horario inválido para el resto de los días', status=400)

    return JsonResponse('Método no permitido', status=405)

@csrf_exempt
def disponibilidadMedicoById(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        id_medico = data.get('idMedico')
        disponibilidades = DisponibilidadDiaria.objects.filter(medico=id_medico)
        disponibilidades_serializer = DisponibilidadDiariaSerializer(disponibilidades, many=True)
        return JsonResponse(disponibilidades_serializer.data, safe=False)

    return JsonResponse('Método no permitido', status=405)