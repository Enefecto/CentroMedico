from django.urls import path
from API import views

urlpatterns = [
    path('pacientes/', views.PacienteApi),
    path('paciente/<int:id>/', views.PacienteApi),
    path('medicos/', views.MedicoApi), 
    path('medico/<int:id>/', views.MedicoApi),
    path('login/', views.login),
    path('ingresarDisponibilidad/',views.disponibilidadMedico),
    path('disponibilidadMedicoById/', views.disponibilidadMedicoById)

]