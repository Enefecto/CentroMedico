from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from API.models import Paciente
from API.serializers import PacienteSerializer
from API.models import Medico
from API.serializers import MedicoSerializer

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