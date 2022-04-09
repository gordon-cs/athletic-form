# athletic-form

## Trello Board

- https://trello.com/b/arqAL20O/athletic-form

## Documentation
- [Documentation Website](https://gordon-cs.github.io/Athletic-Absence-Documentation/)
- [Repository](https://github.com/gordon-cs/Athletic-Absence-Documentation)


## Problem Statement:

- https://docs.google.com/document/d/1WDIsoW0Kt1ZyuIqRdbD_QvH8wQZq6wyaRMwcDqkzhNE/edit?usp=sharing

## Design Document:

- https://docs.google.com/document/d/1My6BqSu2o57S0nU-mNS_pjMHAFhsBtQhQHh938Vvrmw/edit?usp=sharing

## Lofi UI Usability Test Report:

- https://docs.google.com/document/d/1ug0rmjLcdnLNTb88qjLkm-SZMFWQkF5q4vyfqeKdxnI/edit?usp=sharing

## End to End Hello World and Tools Proposal (Pt. 1)

- https://docs.google.com/document/d/1stFlhhpJvXplVXh_s5kMDxJs5tCtmMfcPi49tVL6KBc/edit?usp=sharing

## MVP
- https://docs.google.com/document/d/1oufvRYJsGX0nVzdhnvAYvq-iQNrkgXniI2O8BjjsqHw/edit?usp=sharing


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

## Starting the email scheduler
- Start the backend, then go to
- localhost:5001/api/Email/{whatever emails you want}

## Backend (VS Code) (Note, I've only tested this on Linux, so I'm not sure if these steps work on Windows yet)
- First, make sure you have docker-compose installed on your system (follow instructions [here](https://docs.docker.com/compose/install/) (make sure to select the correct operating system)
- ```cd clone-path/API/api-core/AthleticFormCore/AthleticSQLServer/ServerConfiguration```
- replace SA_PASSWORD with a password of your choosing (Make sure to use special characters and at least one number)
- Make sure docker is running.  If on docker desktop, make sure you are logged in with your docker account
- ```sudo docker-compose up```
- in Azure Data Studio, add a new connection
- Server: localhost, username: SA, Password: Password as specified in the docker-compose.yml file
- Once you are connected, open and run the three queries that are included, first the DatabaseCreation.sql, then the CreateTable.SQL and then the InsertData.SQL query
- Be sure to leave the server running to connect with the backend in the next step


- We have since migrated to .NET Core, thus the API can now be run on any OS.
- Steps are exactly the same as above, however instead of opening the solution in Visual Studo, open one of the two projects in VS code:
     - Be sure to have the C# extention (Microsoft) installed
     - Specify the project to load (follow instructions [here](https://code.visualstudio.com/docs/languages/csharp), in particular, the section starting with `Roslyn and OmniSharp`)
     - Make sure you have the secrets.json in your ```~/.microsoft/usersecrets/<user_secrets_id>/secrets.json``` folder on Unix-like operating systems, and for Windows, ```%APPDATA%\Microsoft\UserSecrets\<user_secrets_id>\secrets.json```  (for the <user_secrets_id>, check the <UserSecretsId> field in AthleticFormCore.csproj file)
     - In secrets.json, add  
     ```
     {
	     "ConnectionString": "Server=localhost; Database=AthleticDatabase;User Id=sa; Password=your_password 
     } 
     ```
     - ```cd repoPath/API/api-core/AthleticFormCore``` 
     -  `dotnet run` 

## Running Tests
-  Make sure the backend is running before running your unit tests.
- Open up a new terminal window and `cd repoPath/API/api-core/Tests`
- Make sure python is installed if not install it [here](https://www.python.org/downloads/)
- To install pytest, run `pip install pytest` or `python -m pip install pytest` or `py -m pip install pytest`.
- Change the from_email and username in EmailClient.cs are set to your Gordon email and the password to your Gordon password.
- To run the tests, run `pytest` or `python -m pytest` or `py -m pytest`
- If you get an SSLError when running the tests, comment out line 7 in pytest_components.py where it says `return requests.get(fullUrl)` and remove the comment in line 9 where it says `return requests.get(fullUrl, verify=False)` and run the tests again
