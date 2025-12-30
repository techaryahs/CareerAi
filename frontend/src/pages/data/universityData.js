import React from 'react';
import { 
    Code,       // For Computer Engg
    Wrench,     // For Mechanical Engg
    Building,   // For Civil Engg
    Zap,        // For Electrical Engg
    CircuitBoard, // For Electronics Engg
    FlaskConical, // For Chemical Engg
} from 'lucide-react';

export const universityData = {
    'Mumbai University': {
        branches: {
            'Computer Engineering': {
                icon: <Code className="w-8 h-8 text-blue-500" />,
                years: {
                    '1st Year': {
                        semesters: {
                            'Semester I': { subjects: [ 
                                { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 },
                                { code: 'BSC102', name: 'Applied Physics', credits: 2, price: 1200 },
                                { code: 'BSC103', name: 'Applied Chemistry', credits: 2, price: 1200 },
                                { code: 'ESC101', name: 'Engineering Mechanics', credits: 2, price: 1000 },
                                { code: 'ESC102', name: 'Basic Electrical & Electronics Engineering', credits: 3, price: 1800 },
                                { code: 'AEC101', name: 'Professional and Communication Ethics', credits: 2, price: 1000 },
                                { code: 'VSEC101', name: 'Engineering Workshop-I', credits: 1, price: 800 },
                                { code: 'VSEC102', name: 'C Programming', credits: 2, price: 1500 },
                                { code: 'CC101', name: 'Induction cum Universal Human Values', credits: 2, price: 1000 }
                            ] },
                            'Semester II': { subjects: [ 
                                { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 },
                                { code: 'PCC2011', name: 'Data Structure', credits: 2, price: 2000 },
                                { code: 'ESC201', name: 'Engineering Graphics', credits: 3, price: 1500 },
                                { code: 'CC201', name: 'Social Science & Community Services', credits: 2, price: 1000 },
                                { code: 'IKS201', name: 'Indian knowledge System', credits: 2, price: 800 },
                                { code: 'VSEC201', name: 'Engineering Workshop-II', credits: 1, price: 800 },
                                { code: 'VSEC202', name: 'Python Programming', credits: 2, price: 1800 }
                            ] }
                        }
                    },
                    "2nd Year": {
                        "semesters": {
                            "Semester III": {
                                "subjects": [
                                    { "code": "CSC301", "name": "Applied Mathematics III", "credits": 5, "price": 2200 },
                                    { "code": "CSC302", "name": "Object Oriented Programming Methodology", "credits": 5, "price": 2500 },
                                    { "code": "CSC303", "name": "Data Structures", "credits": 5, "price": 2500 },
                                    { "code": "CSC304", "name": "Digital Logic Design and Analysis", "credits": 4, "price": 2000 },
                                    { "code": "CSC305", "name": "Discrete Structures", "credits": 4, "price": 2000 },
                                    { "code": "CSC306", "name": "Electronic Circuits and Communication Fundamentals", "credits": 5, "price": 2200 }
                                ]
                            },
                            "Semester IV": {
                                "subjects": [
                                    { "code": "CSC401", "name": "Applied Mathematics IV", "credits": 5, "price": 2200 },
                                    { "code": "CSC402", "name": "Analysis of Algorithms", "credits": 5, "price": 2500 },
                                    { "code": "CSC403", "name": "Computer Organization and Architecture", "credits": 5, "price": 2500 },
                                    { "code": "CSC404", "name": "Data Base Management systems", "credits": 5, "price": 2500 },
                                    { "code": "CSC405", "name": "Theoretical Computer Science", "credits": 4, "price": 2000 },
                                    { "code": "CSC406", "name": "Computer Graphics", "credits": 4, "price": 2000 }
                                ]
                            }
                        }
                    },
                    "3rd Year": {
                        "semesters": {
                        "Semester V": {
                            "subjects": [
                            { "code": "CSC501", "name": "Theoretical Computer Science", "credits": 3, "price": 2800 },
                            { "code": "CSC502", "name": "Software Engineering", "credits": 3, "price": 2800 },
                            { "code": "CSC503", "name": "Computer Network", "credits": 3, "price": 2800 },
                            { "code": "CSC504", "name": "Data Warehousing & Mining", "credits": 3, "price": 2800 },
                            { "code": "CSDL0501x", "name": "Department Level Optional Course- 1", "credits": 3, "price": 2800 },
                            { "code": "CSL501", "name": "Software Engineering Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL502", "name": "Computer Network Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL503", "name": "Data Warehousing & Mining Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL504", "name": "Business Comm. & Ethics II", "credits": 2, "price": 1800 },
                            { "code": "CSM501", "name": "Mini Project: 2 A", "credits": 2, "price": 2000 }
                            ]
                        },
                        "Semester VI": {
                            "subjects": [
                            { "code": "CSC601", "name": "System Programming & Compiler Construction", "credits": 3, "price": 2800 },
                            { "code": "CSC602", "name": "Cryptography & System Security", "credits": 3, "price": 2800 },
                            { "code": "CSC603", "name": "Mobile Computing", "credits": 3, "price": 2800 },
                            { "code": "CSC604", "name": "Artificial Intelligence", "credits": 3, "price": 2800 },
                            { "code": "CSDLO601x", "name": "Department Level Optional Course -2", "credits": 3, "price": 2800 },
                            { "code": "CSL601", "name": "System Programming & Compiler Construction Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL602", "name": "Cryptography & System Security Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL603", "name": "Mobile Computing Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL604", "name": "Artificial Intelligence Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL605", "name": "Skill base Lab Course: Cloud Computing", "credits": 2, "price": 1800 },
                            { "code": "CSM601", "name": "Mini Project Lab: 2B", "credits": 2, "price": 2000 }
                            ]
                        }
                        }
                    },
                    "4th Year": {
                        "semesters": {
                        "Semester VII": {
                            "subjects": [
                            { "code": "CSC701", "name": "Digital Signal & Image Processing", "credits": 4, "price": 3200 },
                            { "code": "CSC702", "name": "Mobile Communication & Computing", "credits": 4, "price": 3200 },
                            { "code": "CSC703", "name": "Artificial Intelligence & Soft Computing", "credits": 4, "price": 3200 },
                            { "code": "CSDLO7031", "name": "Advanced System Security & Digital Forensics", "credits": 4, "price": 3200 },
                            { "code": "CSL701", "name": "Digital Signal & Image Processing Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL702", "name": "Mobile Application Development Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL703", "name": "Artificial Intelligence & Soft Computing Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL704", "name": "Computational Lab-I", "credits": 1, "price": 1500 },
                            { "code": "CSP705", "name": "Major Project-I", "credits": 3, "price": 2500 }
                            ]
                        },
                        "Semester VIII": {
                            "subjects": [
                            { "code": "CSC801", "name": "Human Machine Interaction", "credits": 4, "price": 3200 },
                            { "code": "CSC802", "name": "Distributed Computing", "credits": 4, "price": 3200 },
                            { "code": "CSDLO8041", "name": "High Performance Computing", "credits": 4, "price": 3200 },
                            { "code": "CSL801", "name": "Human Machine Interaction Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL802", "name": "Distributed Computing Lab", "credits": 1, "price": 1500 },
                            { "code": "CSL803", "name": "Cloud Computing Lab", "credits": 2, "price": 1800 },
                            { "code": "CSL804", "name": "Computational Lab-II", "credits": 1, "price": 1500 },
                            { "code": "CSP805", "name": "Major Project-II", "credits": 6, "price": 4000 }
                            ]
                        }
                        }
                    }
                }
            },
            'Mechanical Engineering': { 
                icon: <Wrench className="w-8 h-8 text-orange-500" />, 
                years: { 
                    '1st Year': { 
                        semesters: { 
                            'Semester I': { subjects: [ 
                                { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 },
                                { code: 'BSC102', name: 'Applied Physics', credits: 2, price: 1200 },
                                { code: 'BSC103', name: 'Applied Chemistry', credits: 2, price: 1200 },
                                { code: 'ESC101', name: 'Engineering Mechanics', credits: 2, price: 1000 },
                                { code: 'ESC102', name: 'Basic Electrical & Electronics Engineering', credits: 3, price: 1800 },
                                { code: 'AEC101', name: 'Professional and Communication Ethics', credits: 2, price: 1000 },
                                { code: 'VSEC101', name: 'Engineering Workshop-I', credits: 1, price: 800 },
                                { code: 'VSEC102', name: 'C Programming', credits: 2, price: 1500 },
                                { code: 'CC101', name: 'Induction cum Universal Human Values', credits: 2, price: 1000 }
                            ] }, 
                            'Semester II': { subjects: [ 
                                { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 },
                                { code: 'PCC2018', name: 'Elements of Mechanical Engineering', credits: 2, price: 2000 },
                                { code: 'ESC201', name: 'Engineering Graphics', credits: 3, price: 1500 },
                                { code: 'CC201', name: 'Social Science & Community Services', credits: 2, price: 1000 },
                                { code: 'IKS201', name: 'Indian knowledge System', credits: 2, price: 800 },
                                { code: 'VSEC201', name: 'Engineering Workshop-II', credits: 1, price: 800 },
                                { code: 'VSEC202', name: 'Python Programming', credits: 2, price: 1800 }
                            ] } 
                        } 
                    },
                    "2nd Year": {
                        "semesters": {
                        "Semester III": {
                            "subjects": [
                            { "code": "MEC301", "name": "Applied Mathematics III", "credits": 4, "price": 2000 },
                            { "code": "MEC302", "name": "Thermodynamics", "credits": 4, "price": 2000 },
                            { "code": "MEC303", "name": "Strength of Materials", "credits": 5, "price": 2200 },
                            { "code": "MEC304", "name": "Production Process- I", "credits": 4, "price": 2000 },
                            { "code": "MEL305", "name": "Computer Aided M/c Drawing", "credits": 3, "price": 1800 },
                            { "code": "MEL306", "name": "Data Base & Information Retrieval System", "credits": 2, "price": 1500 },
                            { "code": "MEL307", "name": "Machine Shop Practice-I", "credits": 2, "price": 1500 }
                            ]
                        },
                        "Semester IV": {
                            "subjects": [
                            { "code": "MEC401", "name": "Applied Mathematics IV", "credits": 4, "price": 2000 },
                            { "code": "MEC402", "name": "Fluid Mechanics", "credits": 5, "price": 2200 },
                            { "code": "MEC403", "name": "Theory of Machines- I", "credits": 5, "price": 2200 },
                            { "code": "MEC404", "name": "Production Process- II", "credits": 4, "price": 2000 },
                            { "code": "MEC405", "name": "Material Technology", "credits": 4, "price": 2000 },
                            { "code": "MEC406", "name": "Industrial Electronics", "credits": 4, "price": 2000 },
                            { "code": "MEL407", "name": "Machine Shop Practice- II", "credits": 2, "price": 1500 }
                        ]}
                        }
                    },
                    "3rd Year": {
                        "semesters": {
                        "Semester V": {
                            "subjects": [
                            { "code": "MEC501", "name": "Mechanical Measurements and Controls", "credits": 3, "price": 2800 },
                            { "code": "MEC502", "name": "Thermal Engineering", "credits": 3, "price": 2800 },
                            { "code": "MEC503", "name": "Dynamics of Machinery", "credits": 3, "price": 2800 },
                            { "code": "MEC504", "name": "Finite Element Analysis", "credits": 3, "price": 2800 },
                            { "code": "MEDL0501X", "name": "Department Level Optional Course - 1", "credits": 3, "price": 2800 },
                            { "code": "MEL501", "name": "Thermal Engineering", "credits": 1, "price": 1500 },
                            { "code": "MEL502", "name": "Dynamics of Machinery", "credits": 1, "price": 1500 },
                            { "code": "MEL503", "name": "Finite Element Analysis", "credits": 1, "price": 1500 },
                            { "code": "MESBL501", "name": "Professional communication and ethics-II", "credits": 2, "price": 1800 },
                            { "code": "MEPBL501", "name": "Mini Project 2A", "credits": 2, "price": 2000 }
                            ]
                        },
                        "Semester VI": {
                            "subjects": [
                            { "code": "MEC601", "name": "Machine Design", "credits": 4, "price": 3200 },
                            { "code": "MEC602", "name": "Turbo Machinery", "credits": 3, "price": 2800 },
                            { "code": "MEC603", "name": "Heating, Ventilation, Air conditioning and Refrigeration", "credits": 3, "price": 2800 },
                            { "code": "MEC604", "name": "Automation and Artificial Intelligence", "credits": 3, "price": 2800 },
                            { "code": "MEDL0602X", "name": "Department Level Optional Course - 2", "credits": 3, "price": 2800 },
                            { "code": "MEL601", "name": "Machine Design", "credits": 1, "price": 1500 },
                            { "code": "MEL602", "name": "Turbo Machinery", "credits": 1, "price": 1500 },
                            { "code": "MEL603", "name": "Heating, Ventilation, Air conditioning and Refrigeration", "credits": 1, "price": 1500 },
                            { "code": "MESBL601", "name": "Measurements and Automation", "credits": 2, "price": 1800 },
                            { "code": "MEPBL601", "name": "Mini Project-2 B", "credits": 2, "price": 2000 }
                            ]
                        }
                        }
                    },
                    "4th Year": {
                        "semesters": {
                        "Semester VII": {
                            "subjects": [
                            { "code": "MEC701", "name": "Machine Design II", "credits": 5, "price": 3500 },
                            { "code": "MEC702", "name": "CAD/CAM/CAE", "credits": 4, "price": 3200 },
                            { "code": "MEC703", "name": "Production Planning and Control", "credits": 3, "price": 2800 },
                            { "code": "MEDO701X", "name": "Department Optional Course III", "credits": 4, "price": 3200 },
                            { "code": "MEO701X", "name": "Institute Optional Course I", "credits": 3, "price": 2800 },
                            { "code": "MEL701", "name": "CAD/CAM/CAE Lab", "credits": 1, "price": 1500 },
                            { "code": "MEP701", "name": "Project I", "credits": 3, "price": 2500 }
                            ]
                        },
                        "Semester VIII": {
                            "subjects": [
                            { "code": "MEC801", "name": "Design of Mechanical Systems", "credits": 5, "price": 3500 },
                            { "code": "MEC802", "name": "Industrial Engineering and Management", "credits": 4, "price": 3200 },
                            { "code": "MEDO802X", "name": "Department Optional Course IV", "credits": 4, "price": 3200 },
                            { "code": "MEO802X", "name": "Institute Optional Course II", "credits": 3, "price": 2800 },
                            { "code": "MEL801", "name": "Design of Mechanical Systems Lab", "credits": 1, "price": 1500 },
                            { "code": "MEP801", "name": "Project II", "credits": 6, "price": 4000 }
                            ]
                        }
                        }
                    }
                } 
            },
            'Civil Engineering': { 
                icon: <Building className="w-8 h-8 text-yellow-500" />, 
                years: { 
                    '1st Year': { 
                        semesters: { 
                            'Semester I': { subjects: [ 
                                { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 },
                                { code: 'BSC102', name: 'Applied Physics', credits: 2, price: 1200 },
                                { code: 'BSC103', name: 'Applied Chemistry', credits: 2, price: 1200 },
                                { code: 'ESC101', name: 'Engineering Mechanics', credits: 2, price: 1000 },
                                { code: 'ESC102', name: 'Basic Electrical & Electronics Engineering', credits: 3, price: 1800 },
                                { code: 'AEC101', name: 'Professional and Communication Ethics', credits: 2, price: 1000 },
                                { code: 'VSEC101', name: 'Engineering Workshop-I', credits: 1, price: 800 },
                                { code: 'VSEC102', name: 'C Programming', credits: 2, price: 1500 },
                                { code: 'CC101', name: 'Induction cum Universal Human Values', credits: 2, price: 1000 }
                            ] }, 
                            'Semester II': { subjects: [ 
                                { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 },
                                { code: 'PCC2012', name: 'Elements of Civil Engineering', credits: 2, price: 2000 },
                                { code: 'ESC201', name: 'Engineering Graphics', credits: 3, price: 1500 },
                                { code: 'CC201', name: 'Social Science & Community Services', credits: 2, price: 1000 },
                                { code: 'IKS201', name: 'Indian knowledge System', credits: 2, price: 800 },
                                { code: 'VSEC201', name: 'Engineering Workshop-II', credits: 1, price: 800 },
                                { code: 'VSEC202', name: 'Python Programming', credits: 2, price: 1800 }
                            ] } 
                        } 
                    },
                    '2nd Year': {
                        semesters: {
                            'Semester III': { 
                                subjects: [
                                    { code: 'CE-C301', name: 'Applied Mathematics-III', credits: 4, price: 1600 },
                                    { code: 'CE-C302', name: 'Surveying – I', credits: 4, price: 2200 },
                                    { code: 'CE-C303', name: 'Strength of Materials', credits: 5, price: 2500 },
                                    { code: 'CE-C304', name: 'Building Materials and Construction', credits: 4, price: 2000 },
                                    { code: 'CE-C305', name: 'Engineering Geology', credits: 4, price: 2000 },
                                    { code: 'CE-C306', name: 'Fluid Mechanics – I', credits: 4, price: 2200 },
                                    { code: 'CE-C307', name: 'Database and Information Retrieval System', credits: 2, price: 1800 }
                                ]
                            },
                            'Semester IV': { 
                                subjects: [
                                    { code: 'CE-C401', name: 'Applied Mathematics – IV', credits: 4, price: 1600 },
                                    { code: 'CE-C402', name: 'Surveying – II', credits: 4.5, price: 2300 },
                                    { code: 'CE-C403', name: 'Structural Analysis – I', credits: 6, price: 2800 },
                                    { code: 'CE-C404', name: 'Building Design and Drawing – I', credits: 3.5, price: 2100 },
                                    { code: 'CE-C405', name: 'Concrete Technology', credits: 4, price: 2200 },
                                    { code: 'CE-C406', name: 'Fluid Mechanics – II', credits: 4, price: 2200 }
                                ]
                            }
                        }
                    },
                    "3rd Year": {
                        "semesters": {
                        "Semester V": {
                            "subjects": [
                            { "code": "CEC501", "name": "Theory of Reinforced Concrete Structures", "credits": 3, "price": 2800 },
                            { "code": "CEC502", "name": "Applied Hydraulics", "credits": 3, "price": 2800 },
                            { "code": "CEC503", "name": "Geotechnical Engineering-I", "credits": 3, "price": 2800 },
                            { "code": "CEC504", "name": "Transportation Engineering", "credits": 4, "price": 3200 },
                            { "code": "CEDL0501X", "name": "Department Level Optional Course-1", "credits": 3, "price": 2800 },
                            { "code": "CEL501", "name": "Theory of Reinforced Concrete Structures", "credits": 1, "price": 1500 },
                            { "code": "CEL502", "name": "Applied Hydraulics", "credits": 1, "price": 1500 },
                            { "code": "CEL503", "name": "Geotechnical Engineering-I", "credits": 1, "price": 1500 },
                            { "code": "CEL504", "name": "Transportation Engineering", "credits": 1, "price": 1500 },
                            { "code": "CEL505", "name": "Professional Communication and Ethics", "credits": 2, "price": 1800 },
                            { "code": "CEM501", "name": "Mini Project-2A", "credits": 2, "price": 2000 }
                            ]
                        },
                        "Semester VI": {
                            "subjects": [
                            { "code": "CEC601", "name": "Design & Drawing of Steel Structures", "credits": 3, "price": 2800 },
                            { "code": "CEC602", "name": "Water Resources Engineering", "credits": 3, "price": 2800 },
                            { "code": "CEC603", "name": "Geotechnical Engineering-II", "credits": 3, "price": 2800 },
                            { "code": "CEC604", "name": "Environmental Engineering", "credits": 4, "price": 3200 },
                            { "code": "CEDL0601X", "name": "Department Level Optional Course -2", "credits": 3, "price": 2800 },
                            { "code": "CEL601", "name": "Design & Drawing of Steel Structures", "credits": 1, "price": 1500 },
                            { "code": "CEL602", "name": "Water Resources Engineering", "credits": 1, "price": 1500 },
                            { "code": "CEL603", "name": "Geotechnical Engineering-II", "credits": 1, "price": 1500 },
                            { "code": "CEL604", "name": "Environmental Engineering", "credits": 1, "price": 1500 },
                            { "code": "CEL605", "name": "Skill Based Lab Course - III", "credits": 1.5, "price": 1700 },
                            { "code": "CEM601", "name": "Mini Project-2B", "credits": 1.5, "price": 1700 }
                            ]
                        }
                        }
                    },
                    "4th Year": {
                        "semesters": {
                        "Semester VII": {
                            "subjects": [
                            { "code": "CEC701", "name": "Quantity Survey Estimation and Valuation", "credits": 4, "price": 3200 },
                            { "code": "CEC702", "name": "Theory of Reinforced Concrete Structures", "credits": 4, "price": 3200 },
                            { "code": "CEDO701", "name": "Department Optional Course - III", "credits": 4, "price": 3200 },
                            { "code": "CEO701", "name": "Institute Optional Course-I", "credits": 3, "price": 2800 },
                            { "code": "CEL701", "name": "Quantity Survey Estimation and Valuation", "credits": 1, "price": 1500 },
                            { "code": "CEL702", "name": "Theory of Reinforced Concrete Structures", "credits": 1, "price": 1500 },
                            { "code": "CEL703", "name": "Department Optional Course Lab - III", "credits": 1, "price": 1500 },
                            { "code": "CEL704", "name": "Project-I", "credits": 3, "price": 2500 }
                            ]
                        },
                        "Semester VIII": {
                            "subjects": [
                            { "code": "CE C801", "name": "Design and Drawing of Reinforced Concrete Structures", "credits": 4, "price": 3200 },
                            { "code": "CE C802", "name": "Construction Management", "credits": 4, "price": 3200 },
                            { "code": "CE DO801", "name": "Department Optional Course - IV", "credits": 4, "price": 3200 },
                            { "code": "CE O802", "name": "Institute Optional Course-II", "credits": 3, "price": 2800 },
                            { "code": "CE L801", "name": "Design and Drawing of Reinforced Concrete Structures", "credits": 1, "price": 1500 },
                            { "code": "CE L802", "name": "Construction Management", "credits": 1, "price": 1500 },
                            { "code": "CE P801", "name": "Project-II", "credits": 6, "price": 4000 }
                            ]
                        }
                        }
                    }
                } 
            },
             'Electrical Engineering': { 
                icon: <Zap className="w-8 h-8 text-red-500" />, 
                years: { 
                    '1st Year': { 
                        semesters: { 
                            'Semester I': { subjects: [ 
                                { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 },
                                { code: 'BSC102', name: 'Applied Physics', credits: 2, price: 1200 },
                                { code: 'BSC103', name: 'Applied Chemistry', credits: 2, price: 1200 },
                                { code: 'ESC101', name: 'Engineering Mechanics', credits: 2, price: 1000 },
                                { code: 'ESC102', name: 'Basic Electrical & Electronics Engineering', credits: 3, price: 1800 },
                                { code: 'AEC101', name: 'Professional and Communication Ethics', credits: 2, price: 1000 },
                                { code: 'VSEC101', name: 'Engineering Workshop-I', credits: 1, price: 800 },
                                { code: 'VSEC102', name: 'C Programming', credits: 2, price: 1500 },
                                { code: 'CC101', name: 'Induction cum Universal Human Values', credits: 2, price: 1000 }
                            ] }, 
                            'Semester II': { subjects: [ 
                                { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 },
                                { code: 'PCC2017', name: 'Elements of Electrical Systems', credits: 2, price: 2000 },
                                { code: 'ESC201', name: 'Engineering Graphics', credits: 3, price: 1500 },
                                { code: 'CC201', name: 'Social Science & Community Services', credits: 2, price: 1000 },
                                { code: 'IKS201', name: 'Indian knowledge System', credits: 2, price: 800 },
                                { code: 'VSEC201', name: 'Engineering Workshop-II', credits: 1, price: 800 },
                                { code: 'VSEC202', name: 'Python Programming', credits: 2, price: 1800 }
                            ] } 
                        } 
                    },
                    "2nd Year": {
                        "semesters": {
                        "Semester III": {
                            "subjects": [
                            { "code": "EEC301", "name": "Applied Mathematics -III", "credits": 5, "price": 2200 },
                            { "code": "EEC302", "name": "Electronic Devices and Circuits", "credits": 5, "price": 2200 },
                            { "code": "EEC303", "name": "Conventional and Non-conventional Power Generation", "credits": 5, "price": 2200 },
                            { "code": "EEC304", "name": "Electrical Networks", "credits": 5, "price": 2200 },
                            { "code": "EEC305", "name": "Electrical and Electronic Measurements", "credits": 5, "price": 2200 },
                            { "code": "EEC306", "name": "Object Oriented Programming and Methodology", "credits": 2, "price": 1500 }
                            ]
                        },
                        "Semester IV": {
                            "subjects": [
                            { "code": "EEC401", "name": "Applied Mathematics - IV", "credits": 5, "price": 2200 },
                            { "code": "EEC402", "name": "Elements of Power System", "credits": 4, "price": 2000 },
                            { "code": "EEC403", "name": "Electrical Machines -I", "credits": 5, "price": 2200 },
                            { "code": "EEC404", "name": "Signal Processing", "credits": 5, "price": 2200 },
                            { "code": "EEC405", "name": "Analog and Digital Integrated Circuits", "credits": 5, "price": 2200 },
                            { "code": "EEC406", "name": "Numerical Methods and Optimization Techniques", "credits": 4, "price": 2000 }
                            ]
                        }
                        }
                    },
                    "3rd Year": {
                        "semesters": {
                        "Semester V": {
                            "subjects": [
                            { "code": "EEC501", "name": "Electrical AC Machines II", "credits": 3, "price": 2800 },
                            { "code": "EEC502", "name": "Electrical Power System II", "credits": 3, "price": 2800 },
                            { "code": "EEC503", "name": "Control System", "credits": 3, "price": 2800 },
                            { "code": "EEC504", "name": "Electromagnetic Field and Wave", "credits": 3, "price": 2800 },
                            { "code": "EED0501X", "name": "Department Optional Course - 1", "credits": 3, "price": 2800 },
                            { "code": "EEL501", "name": "Electrical AC Machines Lab II", "credits": 1, "price": 1500 },
                            { "code": "EEL502", "name": "Simulation Lab II", "credits": 1, "price": 1500 },
                            { "code": "EEL503", "name": "Control System Lab", "credits": 1, "price": 1500 },
                            { "code": "EEL504", "name": "Professional Communication and Ethics-II", "credits": 2, "price": 1800 },
                            { "code": "EEM501", "name": "Mini Project -2A", "credits": 2, "price": 2000 }
                            ]
                        },
                        "Semester VI": {
                            "subjects": [
                            { "code": "EEC601", "name": "Power System Protection & Switchgear", "credits": 3, "price": 2800 },
                            { "code": "EEC602", "name": "Microcontroller Applications", "credits": 3, "price": 2800 },
                            { "code": "EEC603", "name": "Control System Design", "credits": 3, "price": 2800 },
                            { "code": "EEC604", "name": "Signals and Systems", "credits": 3, "price": 2800 },
                            { "code": "EEDO601X", "name": "Department Optional Course - 2", "credits": 3, "price": 2800 },
                            { "code": "EEL601", "name": "Power System Protection & Switchgear Lab", "credits": 1, "price": 1500 },
                            { "code": "EEL602", "name": "Microcontroller Applications Lab", "credits": 1, "price": 1500 },
                            { "code": "EEL603", "name": "Control System Design Lab", "credits": 1, "price": 1500 },
                            { "code": "EEL604", "name": "SBL-III: Industrial Automation Lab", "credits": 2, "price": 1800 },
                            { "code": "EEM601", "name": "Mini Project-2 B", "credits": 2, "price": 2000 }
                            ]
                        }
                        }
                    }
                } 
            },
            'Electronics Engineering': { 
                icon: <CircuitBoard className="w-8 h-8 text-green-500" />, 
                years: { 
                    '1st Year': { 
                        semesters: { 
                            'Semester I': { subjects: [ 
                                { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 },
                                { code: 'BSC102', name: 'Applied Physics', credits: 2, price: 1200 },
                                { code: 'BSC103', name: 'Applied Chemistry', credits: 2, price: 1200 },
                                { code: 'ESC101', name: 'Engineering Mechanics', credits: 2, price: 1000 },
                                { code: 'ESC102', name: 'Basic Electrical & Electronics Engineering', credits: 3, price: 1800 },
                                { code: 'AEC101', name: 'Professional and Communication Ethics', credits: 2, price: 1000 },
                                { code: 'VSEC101', name: 'Engineering Workshop-I', credits: 1, price: 800 },
                                { code: 'VSEC102', name: 'C Programming', credits: 2, price: 1500 },
                                { code: 'CC101', name: 'Induction cum Universal Human Values', credits: 2, price: 1000 }
                            ] }, 
                            'Semester II': { subjects: [ 
                                { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 },
                                { code: 'PCC2014', name: 'Digital Electronics', credits: 2, price: 2000 },
                                { code: 'ESC201', name: 'Engineering Graphics', credits: 3, price: 1500 },
                                { code: 'CC201', name: 'Social Science & Community Services', credits: 2, price: 1000 },
                                { code: 'IKS201', name: 'Indian knowledge System', credits: 2, price: 800 },
                                { code: 'VSEC201', name: 'Engineering Workshop-II', credits: 1, price: 800 },
                                { code: 'VSEC202', name: 'Python Programming', credits: 2, price: 1800 }
                            ] } 
                        } 
                    },
                    "2nd Year": {
                        "semesters": {
                        "Semester III": {
                            "subjects": [
                            { "code": "EXS301", "name": "Applied Mathematics III", "credits": 5, "price": 2200 },
                            { "code": "EXC302", "name": "Electronic Devices", "credits": 4, "price": 2000 },
                            { "code": "EXC303", "name": "Digital Circuits and Design", "credits": 4, "price": 2000 },
                            { "code": "EXC304", "name": "Circuit Theory", "credits": 4, "price": 2000 },
                            { "code": "EXC305", "name": "Electronic Instruments and Measurements", "credits": 4, "price": 2000 },
                            { "code": "EXL301", "name": "Electronic Devices Laboratory", "credits": 1, "price": 1000 },
                            { "code": "EXL302", "name": "Digital Circuits and Design Laboratory", "credits": 1, "price": 1000 },
                            { "code": "EXL303", "name": "Circuit Theory and Measurements Laboratory", "credits": 1, "price": 1000 },
                            { "code": "EXL304", "name": "Object Oriented Programming Methodology Laboratory", "credits": 2, "price": 1500 }
                            ]
                        },
                        "Semester IV": {
                            "subjects": [
                            { "code": "EXS401", "name": "Applied Mathematics IV", "credits": 5, "price": 2200 },
                            { "code": "EXC402", "name": "Discrete Electronic Circuits", "credits": 4, "price": 2000 },
                            { "code": "EXC403", "name": "Microprocessor and Peripherals", "credits": 4, "price": 2000 },
                            { "code": "EXC404", "name": "Principles of Control Systems", "credits": 4, "price": 2000 },
                            { "code": "EXC405", "name": "Fundamentals of Communication Engineering", "credits": 4, "price": 2000 },
                            { "code": "EXC406", "name": "Electrical Machines", "credits": 3, "price": 1800 },
                            { "code": "EXL401", "name": "Discrete Electronics Laboratory", "credits": 1, "price": 1000 },
                            { "code": "EXL402", "name": "Microprocessor and Peripherals Laboratory", "credits": 1, "price": 1000 },
                            { "code": "EXL403", "name": "Control System and Electrical Machines Laboratory", "credits": 1, "price": 1000 },
                            { "code": "EXL404", "name": "Communication Engineering Laboratory", "credits": 1, "price": 1000 }
                            ]
                        }
                        }
                    },
                    "3rd Year": {
                        "semesters": {
                        "Semester V": {
                            "subjects": [
                            { "code": "ELC501", "name": "Principles of Control System", "credits": 3, "price": 2800 },
                            { "code": "ELC502", "name": "Digital Signal Processing", "credits": 3, "price": 2800 },
                            { "code": "ELC503", "name": "Linear Integrated Circuits", "credits": 3, "price": 2800 },
                            { "code": "ELC504", "name": "Digital Communication", "credits": 3, "price": 2800 },
                            { "code": "ELDO501", "name": "Department Optional Course - I", "credits": 3, "price": 2800 },
                            { "code": "ELL501", "name": "Principles of Control System Lab", "credits": 1, "price": 1500 },
                            { "code": "ELL502", "name": "Linear Integrated Circuits Lab", "credits": 1, "price": 1500 },
                            { "code": "ELL503", "name": "Digital Communication Lab", "credits": 1, "price": 1500 },
                            { "code": "ELL504", "name": "Professional Communication & Ethics-II", "credits": 2, "price": 1800 },
                            { "code": "ELM501", "name": "Mini Project-2 A", "credits": 2, "price": 2000 }
                            ]
                        },
                        "Semester VI": {
                            "subjects": [
                            { "code": "ECC601", "name": "Electromagnetics and Antenna", "credits": 3, "price": 2800 },
                            { "code": "ECC602", "name": "Computer Communication Networks", "credits": 3, "price": 2800 },
                            { "code": "ECC603", "name": "Image Processing and Machine Vision", "credits": 3, "price": 2800 },
                            { "code": "ECC604", "name": "Artificial Neural Network and Fuzzy Logic", "credits": 3, "price": 2800 },
                            { "code": "ECCDLO601X", "name": "Department Level Optional Course-2", "credits": 3, "price": 2800 },
                            { "code": "ECL601", "name": "Electromagnetics and Antenna Lab", "credits": 1, "price": 1500 },
                            { "code": "ECL602", "name": "Computer Communication Networks Lab", "credits": 1, "price": 1500 },
                            { "code": "ECL603", "name": "Image Processing and Machine Vision Lab", "credits": 1, "price": 1500 },
                            { "code": "ECL604", "name": "Skill Lab: Linux and Networking and Server Configuration", "credits": 2, "price": 1800 },
                            { "code": "ECM601", "name": "Mini Project 2B- FPGA based Project", "credits": 2, "price": 2000 }
                            ]
                        }
                        }
                    },
                    "4th Year": {
                        "semesters": {
                        "Semester VII": {
                            "subjects": [
                            { "code": "ELC701", "name": "Microwave Engineering", "credits": 3, "price": 2800 },
                            { "code": "ELC702", "name": "Mobile Communication", "credits": 3, "price": 2800 },
                            { "code": "ELC703", "name": "Optical Communication", "credits": 3, "price": 2800 },
                            { "code": "ELDLO 701X", "name": "Department Level Optional Course III", "credits": 3, "price": 2800 },
                            { "code": "ILO701X", "name": "Institute Level Optional Course I", "credits": 3, "price": 2800 },
                            { "code": "ELL701", "name": "Microwave Engineering Lab", "credits": 1, "price": 1500 },
                            { "code": "ELL702", "name": "Mobile Communication Lab", "credits": 1, "price": 1500 },
                            { "code": "ELL703", "name": "Optical Communication Lab", "credits": 1, "price": 1500 },
                            { "code": "ELP701", "name": "Major Project I", "credits": 3, "price": 2500 }
                            ]
                        },
                        "Semester VIII": {
                            "subjects": [
                            { "code": "ELC801", "name": "Wireless Networks", "credits": 3, "price": 2800 },
                            { "code": "ELC802", "name": "Satellite Communication", "credits": 3, "price": 2800 },
                            { "code": "ELC803", "name": "Internet of Things", "credits": 3, "price": 2800 },
                            { "code": "ELDLO 801X", "name": "Department Level Optional Course IV", "credits": 3, "price": 2800 },
                            { "code": "ILO801X", "name": "Institute Level Optional Course II", "credits": 3, "price": 2800 },
                            { "code": "ELL801", "name": "Wireless Networks Lab", "credits": 1, "price": 1500 },
                            { "code": "ELL802", "name": "Satellite Communication Lab", "credits": 1, "price": 1500 },
                            { "code": "ELL803", "name": "Internet of Things Lab", "credits": 1, "price": 1500 },
                            { "code": "ELP801", "name": "Major Project II", "credits": 6, "price": 4000 }
                            ]
                        }
                        }
                    }
                } 
            },
            'Chemical Engineering': { 
                icon: <FlaskConical className="w-8 h-8 text-purple-500" />, 
                years: { 
                    '1st Year': { 
                        semesters: { 
                            'Semester I': { subjects: [ 
                                { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 },
                                { code: 'BSC102', name: 'Applied Physics', credits: 2, price: 1200 },
                                { code: 'BSC103', name: 'Applied Chemistry', credits: 2, price: 1200 },
                                { code: 'ESC101', name: 'Engineering Mechanics', credits: 2, price: 1000 },
                                { code: 'ESC102', name: 'Basic Electrical & Electronics Engineering', credits: 3, price: 1800 },
                                { code: 'AEC101', name: 'Professional and Communication Ethics', credits: 2, price: 1000 },
                                { code: 'VSEC101', name: 'Engineering Workshop-I', credits: 1, price: 800 },
                                { code: 'VSEC102', name: 'C Programming', credits: 2, price: 1500 },
                                { code: 'CC101', name: 'Induction cum Universal Human Values', credits: 2, price: 1000 }
                            ] }, 
                            'Semester II': { subjects: [ 
                                { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 },
                                { code: 'PCC2015', name: 'Introduction to Chemical Engineering', credits: 2, price: 2000 },
                                { code: 'ESC201', name: 'Engineering Graphics', credits: 3, price: 1500 },
                                { code: 'CC201', name: 'Social Science & Community Services', credits: 2, price: 1000 },
                                { code: 'IKS201', name: 'Indian knowledge System', credits: 2, price: 800 },
                                { code: 'VSEC201', name: 'Engineering Workshop-II', credits: 1, price: 800 },
                                { code: 'VSEC202', name: 'Python Programming', credits: 2, price: 1800 }
                            ] } 
                        } 
                    },
                    "2nd Year": {
                        "semesters": {
                        "Semester III": {
                            "subjects": [
                            { "code": "CHC301", "name": "Applied Mathematics-III", "credits": 4, "price": 2000 },
                            { "code": "CHC302", "name": "Engineering Chemistry-I", "credits": 4, "price": 2000 },
                            { "code": "CHC303", "name": "Fluid Flow (FF)", "credits": 4, "price": 2000 },
                            { "code": "CHC304", "name": "Computer Programming & Numerical Methods", "credits": 4, "price": 2000 },
                            { "code": "CHC305", "name": "Process Calculations", "credits": 4, "price": 2000 },
                            { "code": "CHC306", "name": "Chemical Engineering Economics", "credits": 4, "price": 2000 },
                            { "code": "CHL307", "name": "Chem. Engg. Lab (FF)", "credits": 1.5, "price": 1200 },
                            { "code": "CHL308", "name": "Engineering Chemistry Lab I", "credits": 1.5, "price": 1200 },
                            { "code": "CHL309", "name": "Computer Programming & Numerical Methods Lab", "credits": 1, "price": 1000 }
                            ]
                        },
                        "Semester IV": {
                            "subjects": [
                            { "code": "CHC401", "name": "Applied Mathematics-IV", "credits": 4, "price": 2000 },
                            { "code": "CHC402", "name": "Engineering Chemistry-II", "credits": 4, "price": 2000 },
                            { "code": "CHC403", "name": "Chemical Engg. Thermodynamics - I", "credits": 4, "price": 2000 },
                            { "code": "CHC404", "name": "Material Science & Engineering", "credits": 4, "price": 2000 },
                            { "code": "CHC405", "name": "Mechanical Equipment Design (MED)", "credits": 4, "price": 2000 },
                            { "code": "CHC406", "name": "Solid Fluid Mechanical Operations (SFMO)", "credits": 4, "price": 2000 },
                            { "code": "CHL407", "name": "Engineering Chemistry Lab II", "credits": 1.5, "price": 1200 },
                            { "code": "CHL408", "name": "Chemical Engg Lab (SFMO)", "credits": 1.5, "price": 1200 },
                            { "code": "CHL409", "name": "MED Lab", "credits": 1, "price": 1000 }
                            ]
                        }
                        }
                    },
                    "4th Year": {
                        "semesters": {
                        "Semester VII": {
                            "subjects": [
                            { "code": "CHC701", "name": "Process Engineering", "credits": 3, "price": 2800 },
                            { "code": "CHC702", "name": "Process Equipment Design", "credits": 4, "price": 3200 },
                            { "code": "CHC703", "name": "Process Dynamics and Control", "credits": 4, "price": 3200 },
                            { "code": "CHDLO703X", "name": "Department Level Optional Course - III", "credits": 4, "price": 3200 },
                            { "code": "CHILO704X", "name": "Institute Level Optional Course-I", "credits": 3, "price": 2800 },
                            { "code": "CHL701", "name": "Process Engineering Lab", "credits": 1, "price": 1500 },
                            { "code": "CHL702", "name": "Process Dynamics and Control Lab", "credits": 1, "price": 1500 },
                            { "code": "CHP701", "name": "Project A", "credits": 3, "price": 2500 },
                            { "code": "CHS701", "name": "Seminar", "credits": 1, "price": 1500 }
                            ]
                        },
                        "Semester VIII": {
                            "subjects": [
                            { "code": "CHC801", "name": "Modeling, Simulation and Optimization", "credits": 4, "price": 3200 },
                            { "code": "CHC802", "name": "Project Engineering and Entrepreneurship", "credits": 3, "price": 2800 },
                            { "code": "CHDLO804X", "name": "Department Level Optional Course-IV", "credits": 4, "price": 3200 },
                            { "code": "CHILO805X", "name": "Institute Level Optional Course-II", "credits": 3, "price": 2800 },
                            { "code": "CHL801", "name": "Modeling, Simulation and Optimization Lab", "credits": 1, "price": 1500 },
                            { "code": "CHP801", "name": "Project B", "credits": 5, "price": 3500 }
                            ]
                        }
                        }
                    }
                } 
            },
        }
    },
    'Pune University': {
        branches: {
            'Computer Engineering': {
                icon: <Code className="w-8 h-8 text-blue-500" />,
                years: {
                    '1st Year': {
                        semesters: {
                            'Semester I': { subjects: [ { code: 'PU-BSC101', name: 'Linear Algebra & Calculus', credits: 4, price: 1600 }, { code: 'PU-ESC101', name: 'Basics of Programming', credits: 3, price: 1400 }, { code: 'PU-BSC103', name: 'Physics for Computing', credits: 2, price: 1300 }, { code: 'PU-ESC102', name: 'Fundamentals of Electrical Engg', credits: 3, price: 1700 } ] },
                            'Semester II': { subjects: [ { code: 'PU-BSC201', name: 'Vector Calculus', credits: 4, price: 1600 }, { code: 'PU-PCC2011', name: 'Data Structures', credits: 3, price: 2100 }, { code: 'PU-ESC201', name: 'Digital Logic Design', credits: 3, price: 1600 } ] }
                        }
                    }
                }
            },
             'Electrical Engineering': { icon: <Zap className="w-8 h-8 text-red-500" />, years: { '1st Year': { semesters: { 'Semester I': { subjects: [ { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 }, { code: 'BSC102', name: 'Applied Physics', credits: 2, price: 1200 } ] }, 'Semester II': { subjects: [ { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 }, { code: 'PCC2017', name: 'Elements of Electrical Systems', credits: 2, price: 2000 } ] } } } } },
            'Electronics Engineering': { icon: <CircuitBoard className="w-8 h-8 text-green-500" />, years: { '1st Year': { semesters: { 'Semester I': { subjects: [ { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 } ] }, 'Semester II': { subjects: [ { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 }, { code: 'PCC2014', name: 'Digital Electronics', credits: 2, price: 2000 } ] } } } } },
        }
    },
    'Delhi University': {
        branches: {
            'Computer Engineering': {
                icon: <Code className="w-8 h-8 text-blue-500" />,
                years: {
                    '1st Year': {
                        semesters: {
                            'Semester I': { subjects: [ { code: 'DU-BSC101', name: 'Calculus', credits: 4, price: 1550 }, { code: 'DU-BSC102', name: 'Mechanics & Physics', credits: 3, price: 1300 }, { code: 'DU-ESC101', name: 'Intro to C++ Programming', credits: 3, price: 1850 }, { code: 'DU-AEC101', name: 'Ethics in Tech', credits: 2, price: 1000 } ] },
                            'Semester II': { subjects: [ { code: 'DU-BSC201', name: 'Differential Equations', credits: 4, price: 1550 }, { code: 'DU-PCC2011', name: 'Advanced Data Structures', credits: 3, price: 2200 }, { code: 'DU-ESC201', name: 'Advanced Graphics', credits: 3, price: 1550 } ] }
                        }
                    }
                }
            },
            'Mechanical Engineering': { icon: <Wrench className="w-8 h-8 text-orange-500" />, years: { '1st Year': { semesters: { 'Semester I': { subjects: [ { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 } ] }, 'Semester II': { subjects: [ { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 }, { code: 'PCC2018', name: 'Elements of Mechanical Engineering', credits: 2, price: 2000 } ] } } } } },
            'Chemical Engineering': { icon: <FlaskConical className="w-8 h-8 text-purple-500" />, years: { '1st Year': { semesters: { 'Semester I': { subjects: [ { code: 'BSC101', name: 'Applied Mathematics-I', credits: 3, price: 1500 } ] }, 'Semester II': { subjects: [ { code: 'BSC201', name: 'Applied Mathematics-II', credits: 3, price: 1500 }, { code: 'PCC2015', name: 'Intro to Chemical Engineering', credits: 2, price: 2000 } ] } } } } },
        }
    }
};