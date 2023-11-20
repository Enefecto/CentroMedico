from django.urls import path
from API import views

urlpatterns = [
    path('pacientes/', views.PacienteApi),
    path('paciente/<int:id>/', views.PacienteApi),
    path('medicos/', views.MedicoApi), 
    path('medico/<int:id>/', views.MedicoApi),
    path('login/', views.login),
    path('ingresarDisponibilidad/',views.disponibilidadMedico),
    path('disponibilidadMedico/', views.disponibilidadMedico),
    path('disponibilidadMedicoById/', views.disponibilidadMedicoById),
    path('agregarCitaMedica/', views.cita_medica_view),
    path('citaMedica/<int:id>/', views.cita_medica_view),
    path('medico/citaMedica/<int:id>/', views.citas_medico),
    path('citaMedica/', views.cita_medica_view),
    path('paciente/<int:id>/citas/', views.citas_paciente),
]