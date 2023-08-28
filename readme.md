# Project Title

Web based Development tool for DSML with SAML

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Main Idea](#main-idea)
- [Academic Citation](#academic-citation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project provides a Model based development platform. 
The aim of this thesis is to enhance and develop the DSML4BDI language, 
addressing the disadvantages that stem from its dependence on the aforementioned platforms and environments, 
such as version updates of dependent software, inconsistent availability of operating system support, and the like, which extend usage and development durations. 
The purpose is to support the trending low-code development in the software field (Cabot 2020; Sahay, 2020) and provide an online version. 
This will allow developers interested in creating agent software using DSML4BDI to have a modeling and development environment accessible over the web without the need for any installations. 
Thus, while aiming to develop agent software in a model-guided manner through DSML4BDI, a developer will be able to access a modeling and development environment on the web,
without requiring any setup, while adhering to the syntax and semantic definitions of the DSML4BDI language.


## Features

Outline the key features of of the development platform:

- Interactive DSML code editor with syntax highlighting.
- Real-time access for whom wants to access own design in any web environment.
- Built-in SAML-based semantic analysis for enhanced modeling accuracy.
- Model transformation and code generation capabilities for the JADE platform.
- Seamless integration with version control systems.

## Getting Started

Anyone can login to the latest live version of the application with the link below.

- https://web-dsml.vercel.app/

For now, anyone who has google account can login with Gmail account without creating any membership of the application.

If you want to clone the repository, please follow the prerequisites and installation sections.



### Prerequisites

To run the codebase, you will need mainly ;

- Node.js v.18.x

### Installation


- cd client npm install
- cd server npm install


### Usage

On the left panel of the application, there is a "Projects" directory where multiple projects can be created. On the right side panel, there is an area containing "node" and "edge" components that allow for modeling.

Continuing on the same panel, there is a button for the json model of the relevant design and Java-based code transformation, along with a field where the name of the selected "node" can be changed.

After selecting a project under the "Projects" folder, based on the created design, code and model transformation can be performed.

To create a new experiment, a folder with the project name should be created under the "Projects" main directory (e.g., GarbageCollector). Under the created associated project, layout files containing file extensions according to the business logic should be created.

Mas: *.mas
Environment: *.env
Capability: *.cap
Plan: *.pln
Note that different nodes and edge options are available for each created component.

Before switching tabs within each component, make sure to save by using "Ctrl+s" or the "Save" button after the design process is completed.


## Shortcuts

- Backspace; to delete any node or edge selected
- Ctrl+s; Save your design you created in the layouts field 


## Academic Citation

Kardas ,G., Tezel, B.T. , Challenger, M., 2018, Domain-specific modelling language for belief–desire–intention
software agents, IET Software, vol. 12, no. 4, pp. 356-364.

Tezel, B.T., Challenger, M., Kardas, G. ,2018, “DSML4BDI: A Modeling Tool for BDI Agent
Development”, In proc. the 12th Turkish National Software Engineering Symposium 

Challenger, M., Tezel, B.T., Alaca, O.F., Tekinerdogan, B., Kardas, G., 2018, Development of
semantic web-enabled bdi multi-agent systems using sea_ml: An electronic bartering case
study. Applied Sciences, vol. 8, no. 5, pp. 1-32

## License

MIT

---
