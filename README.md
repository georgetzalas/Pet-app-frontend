## Project Ecosystem

This repository is the frontend of a collaborative full-stack application developed within a team environment.
The Petapp platform is structured across multiple repositories, each supporting different layers of the system:

### Related Repositories

- **Frontend:**  
  https://github.com/georgetzalas/Pet-app-frontend

- **Backend:**  
  https://github.com/georgetzalas/Pet-app/tree/Evangelia

- **DevOps & Automation:**  
  https://github.com/Evangelia2/Ansible  

- **Extended Frontend / DevOps Contributions:**  
  https://github.com/Evangelia2/Pet-app-frontend  

These repositories collectively support the application's development, deployment workflows, and infrastructure configuration.

# Petapp Platform — Frontend

This repository contains the frontend of a collaborative **full-stack Pet Management platform**, designed to support digital pet adoption services through role-based access and structured workflows.

The application provides dedicated environments for different user groups, enabling efficient management of pet-related processes such as medical tracking, shelter coordination, and administrative oversight.

---

## System Design

The application follows a multi-tier architecture where the frontend communicates with backend services via REST APIs.

The system is designed around role-based access, ensuring that each user type interacts with the platform through a dedicated interface aligned with their responsibilities.

Automated notifications are triggered by key user actions, supporting real-time communication across the platform.

---

## User Environments & Capabilities

The platform supports **four distinct user roles**, each with tailored functionality:

### 🔹 Admin
- Oversees platform operations  
- Manages system data and user access  
- Monitors overall activity  
- Ensures data consistency across the application  

---

### 🔹 Veterinarian (Vet)
- Accesses pet medical records  
- Updates health information  
- Tracks treatments and veterinary history  
- Supports continuity of care  

---

### 🔹 Shelter
- Registers and manages sheltered animals  
- Updates availability and adoption status  
- Maintains pet profiles  
- Coordinates with other platform actors  

---

### 🔹 Citizen
- Browses available pets  
- Views detailed pet profiles  
- Interacts with shelter information  
- Supports adoption-related processes  

---

## Automated Notifications

The platform supports automated email notifications to enhance communication and streamline user workflows.

- Sends confirmation emails upon successful user registration  
- Notifies citizens when adoption requests are approved or rejected  
- Improves transparency throughout the adoption process  
- Supports event-driven communication between system actors  

---

## Security Considerations

The platform incorporates role-based authorization to ensure controlled access to system features.

Data exchange between frontend and backend services is handled through secure API communication, supporting safe and reliable operations.

---

## Key Features

- Role-based interface with structured access control  
- Dynamic data rendering through backend API integration  
- Form handling with validation mechanisms  
- Asynchronous data fetching  
- Structured routing for intuitive navigation  
- Responsive design for improved usability  
- Error handling and user feedback  

---

## Technologies Used

- **Vue.js** — component-based frontend framework  
- **JavaScript**  
- **HTML5 & CSS3**  
- **REST API integration**  
- **Git & GitHub** for version control and collaboration  

---

## Collaboration

Developed as part of a **team-based software engineering project**, demonstrating practical experience in collaborative development workflows, version control, and multi-role application design.

