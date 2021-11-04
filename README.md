# athletic-form

## Trello Board

- https://trello.com/b/arqAL20O/athletic-form

## Problem Statement:

- https://docs.google.com/document/d/1WDIsoW0Kt1ZyuIqRdbD_QvH8wQZq6wyaRMwcDqkzhNE/edit?usp=sharing

## Design Document:

- https://docs.google.com/document/d/1SeZQBuNud6zT2_0GWvgOuMFjFnYeGXEkpj1ZXIVmTcQ/edit

## Lofi UI Usability Test Report:

- https://docs.google.com/document/d/1ug0rmjLcdnLNTb88qjLkm-SZMFWQkF5q4vyfqeKdxnI/edit?usp=sharing

## End to End Hello World and Tools Proposal (Pt. 1)

- https://docs.google.com/document/d/1stFlhhpJvXplVXh_s5kMDxJs5tCtmMfcPi49tVL6KBc/edit?usp=sharing

## Starting the frontend

After cloning this repo:

- `cd athletic-form/athletic-form-ui`
- `npm install` (Installs the correct packages)
- `npm start` (Starts the local development server)

## Starting the backend

- Connect to the development VM (Work in progress)
- Clone this repo
- Go to: `athletic-form => API`
- Open `AthleticFormAPI.sln` in Visual Studio 2019

## Backend (VS Code)

- We have since migrated to .NET Core, thus the API can now be run on any OS.
- Steps are exactly the same as above, however instead of opening the solution in Visual Studo, open one of the two projects in VS code:
     - Be sure to have the C# extention (Microsoft) installed
     - Specify the project to load (follow instructions [here](https://code.visualstudio.com/docs/languages/csharp), in particular, the section starting with `Roslyn and OmniSharp`)

## To Run JSON Server with Project

- Run `npm install`.
- Run `npm install -g json-server`.
- Run `json-server --watch ./src/data/db.json`.
- Open a new terminal window
- Run `npm start`.
